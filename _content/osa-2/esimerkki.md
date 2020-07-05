## Esimerkkisovellus

Teemme seuraavaksi hieman laajemman esimerkkisovelluksen, joka esittelee tietokannan käyttämiseen liittyviä tekniikoita. Sovelluksessa käyttäjät voivat luoda kyselyitä sekä vastata muiden luomiin kyselyihin. Sovelluksen käyttäminen näyttää tältä:

TODO: Lisää kuvat

Sovellusta varten luomme tietokantaan kolme taulua:

```sql
CREATE TABLE polls (id SERIAL PRIMARY KEY, topic TEXT, created_at TIMESTAMP);
CREATE TABLE choices (id SERIAL PRIMARY KEY, poll_id INTEGER REFERENCES polls, choice TEXT);
CREATE TABLE answers (id SERIAL PRIMARY KEY, choice_id INTEGER REFERENCES choices, sent_at TIMESTAMP);
```

Taulu `polls` sisältää jokaisen kyselyn aiheen ja luontiajan,
ja tauluun `choices` tallennetaan kyselyjen vastausvaihtoehdot.
Taulussa `answers` on puolestaan kyselyihin annetut vastaukset.

Sovelluksen koodin alussa on tuttuun tapaan `import`-rivejä,
sovelluksen konfigurointia ja tietokantayhteyden luominen:

```python
from flask import Flask
from flask import redirect, render_template, request, session
from flask_sqlalchemy import SQLAlchemy
from os import getenv

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
db = SQLAlchemy(app)
```

Sovelluksen etusivu hakee tietokannasta kyselyt käänteisessä aikajärjestyksessä
ja näyttää ne sivupohjan `index.html` avulla:

```python
@app.route("/")
def index():
    sql = "SELECT id, topic, created_at FROM polls ORDER BY id DESC"
    result = db.session.execute(sql)
    polls = result.fetchall()
    return render_template("index.html", polls=polls)
```

```html
{% raw %}<a href="/new">Uusi kysely</a>
<hr>
{% for poll in polls %}
Aihe: {{ poll[1] }} <br>
Luotu: {{ poll[2].strftime("%Y-%m-%d %H:%M:%S") }} <br>
<a href="/poll/{{ poll[0] }}">Mene kyselyyn</a> |
<a href="/result/{{ poll[0] }}">Näytä tulokset</a> <br>
<hr>
{% endfor %}{% endraw %}
```

Jokaisen kyselyn kohdalla näytetään linkit, joiden kautta voi osallistua kyselyyn
(`poll/id`) sekä katsoa kyselyn tulokset (`result/id`),
missä `id` on kyselyn id-numero tietokannassa.

Sivu `new` näyttää lomakkeen, jonka kautta voi lähettää uuden kyselyn.
Käyttäjä antaa lomakkeeseen kyselyn aiheen sekä enintään neljä
vastausvaihtoehtoa:

```python
@app.route("/new")
def new():
    return render_template("new.html")
```

```html
<form action="/create" method="POST">
<p>Aihe:<br>
<input type="text" name="topic"></p>
<p>Vaihtoehto 1:<br>
<input type="text" name="choice"></p>
<p>Vaihtoehto 2:<br>
<input type="text" name="choice"></p>
<p>Vaihtoehto 3:<br>
<input type="text" name="choice"></p>
<p>Vaihtoehto 4:<br>
<input type="text" name="choice"></p>
<input type="submit" value="Luo kysely">
</form>
```

Kun käyttäjä lähettää lomakkeen, sen käsittelee funktio `create`:

```python
@app.route("/create", methods=["POST"])
def create():
    topic = request.form["topic"]
    sql = "INSERT INTO polls (topic, created_at) VALUES (:topic, NOW()) RETURNING id"
    result = db.session.execute(sql, {"topic":topic})
    poll_id = result.fetchone()[0]
    choices = request.form.getlist("choice")
    for choice in choices:
        if choice != "":
            sql = "INSERT INTO choices (poll_id, choice) VALUES (:poll_id, :choice)"
            db.session.execute(sql, {"poll_id":poll_id, "choice":choice})
    db.session.commit()
    return redirect("/")
```

Tämä funktio lisää ensin kyselyä vastaavan rivin tauluun `polls`. Komennon `INSERT` lopussa on `RETURNING id`, minkä ansiosta komento palauttaa lisätyn rivin id-numeron. Tämän jälkeen funktio käy läpi käyttäjän antamat vastausvaihtoehdot ja luo jokaisesta epätyhjästä vaihtoehdosta rivin tauluun `choices`. Lopuksi käyttäjä ohjataan sovelluksen etusivulle.

Sivu `poll/id` näyttää kyselyn, jonka id-numero on `id`. Sivulla on lomake, jonka kautta käyttäjä voi vastata kyselyyn:

```python
@app.route("/poll/<int:id>")
def poll(id):
    sql = "SELECT topic FROM polls WHERE id=:id"
    result = db.session.execute(sql, {"id":id})
    topic = result.fetchone()[0]
    sql = "SELECT id, choice FROM choices WHERE poll_id=:id"
    result = db.session.execute(sql, {"id":id})
    choices = result.fetchall()
    return render_template("poll.html", id=id, topic=topic, choices=choices)
```

```html
{% raw %}{{ topic }}
<hr>
<form action="/answer" method="POST">
{% for choice in choices %}
<input type="radio" name="answer" value="{{ choice[0] }}"> {{ choice[1] }} <br>
{% endfor %}
<p>
<input type="submit" value="Lähetä">
<input type="hidden" name="id" value="{{ id }}">
</form>
<hr>
<a href="/">Takaisin</a>{% endraw %}
```

Tässä lomakkeessa on käytössä piilokenttä (`<input type="hidden">`), johon on tallennettu kyselyn id-numero. Tämän kenttä kertoo, mihin kyselyyn lomakkeen kautta lähetetty vastaus liittyy. Seuraava funktio käsittelee vastauksen:

```python
@app.route("/answer", methods=["POST"])
def answer():
    poll_id = request.form["id"]
    if "answer" in request.form:
        choice_id = request.form["answer"]
        sql = "INSERT INTO answers (choice_id, sent_at) VALUES (:choice_id, NOW())"
        db.session.execute(sql, {"choice_id":choice_id})
        db.session.commit()
    return redirect("/result/"+str(poll_id))
```

Funktio hakee kyselyn id-numeron piilokentästä ja tarkastaa sitten, onko käyttäjä valinnut jonkin vastauksen. Jos käyttäjä on valinnut vastauksen, tämä vastaus lisätään `answers`-tauluun. Lopuksi käyttäjä ohjataan kyselyn tuloksiin.

Sivu `result/id` näyttää kyselyn tulokset:

```python
@app.route("/result/<int:id>")
def result(id):
    sql = "SELECT topic FROM polls WHERE id=:id"
    result = db.session.execute(sql, {"id":id})
    topic = result.fetchone()[0]
    sql = "SELECT c.choice, COUNT(a.id) FROM choices c LEFT JOIN answers a " \
          "ON c.id=a.choice_id WHERE c.poll_id=:poll_id GROUP BY c.id"
    result = db.session.execute(sql, {"poll_id":id})
    choices = result.fetchall()
    return render_template("result.html", topic=topic, choices=choices)
```

```html
{% raw %}{{ topic }}
<hr>
<ul>
{% for choice in choices %}
<li> {{ choice[0] }}: {{ choice[1] }} kpl
{% endfor %}
</ul>
<hr>
<a href="/">Takaisin</a>{% endraw %}
```

Tämän sivun perustana on tauluista `choices` ja `answers` tietoa hakeva kysely, joka hakee jokaisesta kyselyn vastausvaihtoehdosta vastausten määrän. Kyselyssä on käytössä `LEFT JOIN`, jotta mukaan tulevat myös vaihtoehdot, joissa ei ole yhtään vastausta.