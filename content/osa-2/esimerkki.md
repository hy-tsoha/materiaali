## Esimerkki: Kyselyt

Teemme seuraavaksi hieman laajemman esimerkkisovelluksen, joka esittelee tietokannan käyttämiseen liittyviä tekniikoita. Sovelluksessa käyttäjät voivat luoda kyselyitä sekä vastata muiden luomiin kyselyihin. Sovelluksen käyttäminen näyttää tältä:

<img class="screenshot" src="../assets/osa-2/kysely1.png">

<img class="screenshot" src="../assets/osa-2/kysely2.png">

<img class="screenshot" src="../assets/osa-2/kysely3.png">

Sovelluksen koko lähdekoodi on GitHubissa osoitteessa [https://github.com/hy-tsoha/tsoha-polls](https://github.com/hy-tsoha/tsoha-polls), ja käymme tässä tarkemmin läpi sovelluksen toimintaa.

Sovellusta varten luomme tietokantaan kolme taulua:

```sql
CREATE TABLE polls (
    id SERIAL PRIMARY KEY,
    topic TEXT,
    created_at TIMESTAMP
);

CREATE TABLE choices (
    id SERIAL PRIMARY KEY,
    poll_id INTEGER REFERENCES polls,
    choice TEXT
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    choice_id INTEGER REFERENCES choices,
    sent_at TIMESTAMP
);
```

Taulu `polls` sisältää jokaisen kyselyn aiheen ja luontiajan, ja tauluun `choices` tallennetaan kunkin kyselyn vastausvaihtoehdot. Taulussa `answers` on puolestaan kyselyihin annetut vastaukset ja niiden lähetysajat.

Sovelluksen etusivu näyttää kyselyt käänteisessä aikajärjestyksessä:

<p class="code-title">app.py</p>
```python
@app.route("/")
def index():
    sql = "SELECT id, topic, created_at FROM polls ORDER BY id DESC"
    result = db.session.execute(sql)
    polls = result.fetchall()
    return render_template("index.html", polls=polls)
```

<p class="code-title">index.html</p>
```jinja
{% raw %}<a href="/new">Uusi kysely</a>
<hr>
{% for poll in polls %}
Aihe: {{ poll.topic }} <br>
Luotu: {{ poll.created_at.strftime("%Y-%m-%d %H:%M:%S") }} <br>
<a href="/poll/{{ poll.id }}">Mene kyselyyn</a> |
<a href="/result/{{ poll.id }}">Näytä tulokset</a> <br>
<hr>
{% endfor %}{% endraw %}
```

Tässä tietokannasta haetaan jokaisen kyselyn id-numero, aihe ja luontiaika. Sivupohjassa id-numeron perusteella luodaan kaksi linkkiä: sivu `poll/[id]` antaa käyttäjän vastata kyselyyn ja sivu `result/[id]` puolestaan näyttää kyselyn tulokset.

Sivu `new` näyttää lomakkeen, jonka kautta voi lähettää uuden kyselyn.
Käyttäjä antaa lomakkeeseen kyselyn aiheen sekä enintään neljä
vastausvaihtoehtoa:

<p class="code-title">app.py</p>
```python
@app.route("/new")
def new():
    return render_template("new.html")
```

<p class="code-title">new.html</p>
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

<p class="code-title">app.py</p>
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

Tämä funktio lisää ensin kyselyä vastaavan rivin tauluun `polls`. Kyselyn aihe tulee käyttäjältä ja SQL-funktio `NOW()` antaa nykyisen ajanhetken. Komennon `INSERT` lopussa on `RETURNING id`, minkä ansiosta komento palauttaa lisätyn rivin id-numeron.

Tämän jälkeen käydään läpi käyttäjän antamat vastausvaihtoehdot. Koska lomakkeessa on useita `choice`-kenttiä, niiden sisältö haetaan listana metodilla `getlist`. Jokaisesta epätyhjästä vaihtoehdosta luodaan rivi tauluun `choices`, ja lopuksi käyttäjä ohjataan etusivulle.

Sivu `poll/[id]` näyttää kyselyn sen id-numeron perusteella. Sivulla on lomake, jonka kautta käyttäjä voi vastata kyselyyn:

<p class="code-title">app.py</p>
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

<p class="code-title">poll.html</p>
```jinja
{% raw %}{{ topic }}
<hr>
<form action="/answer" method="POST">
{% for choice in choices %}
<input type="radio" name="answer" value="{{ choice.id }}"> {{ choice.choice }} <br>
{% endfor %}
<p>
<input type="submit" value="Lähetä">
<input type="hidden" name="id" value="{{ id }}">
</form>
<hr>
<a href="/">Takaisin</a>{% endraw %}
```

Lomake antaa käyttäjän valita yhden vaihtoehdoista, ja lisäksi lomakkeessa on käyttäjälle näkymätön _piilokenttä_, jossa on kyselyn id-numero. Tämän kentän avulla lomakkeen käsittelijä tietää, mihin kyselyyn käyttäjän antama vastaus liittyy.

Funktio `answer` käsittelee käyttäjän antaman vastauksen:

<p class="code-title">app.py</p>
```python
@app.route("/answer", methods=["POST"])
def answer():
    poll_id = request.form["id"]
    if "answer" in request.form:
        choice_id = request.form["answer"]
        sql = "INSERT INTO answers (choice_id, sent_at) VALUES (:choice_id, NOW())"
        db.session.execute(sql, {"choice_id":choice_id})
        db.session.commit()
    return redirect("/result/" + str(poll_id))
```

Funktio hakee kyselyn id-numeron piilokentästä ja tarkastaa sitten, onko käyttäjä valinnut jonkin vastauksen. Jos käyttäjä on valinnut vastauksen, tämä vastaus lisätään `answers`-tauluun. Lopuksi käyttäjä ohjataan kyselyn tuloksiin.

Sivu `result/[id]` näyttää kyselyn tulokset:

<p class="code-title">app.py</p>
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

<p class="code-title">result.html</p>
```jinja
{% raw %}{{ topic }}
<hr>
<ul>
{% for choice in choices %}
<li> {{ choice.choice }}: {{ choice.count }} kpl
{% endfor %}
</ul>
<hr>
<a href="/">Takaisin</a>{% endraw %}
```

Tämän sivun perustana on tauluista `choices` ja `answers` tietoa hakeva kysely, joka hakee jokaisesta kyselyn vastausvaihtoehdosta vastausten määrän. Kyselyssä on käytössä `LEFT JOIN`, jotta mukaan tulevat myös vaihtoehdot, joissa ei ole yhtään vastausta. Koska kysely on pitkä, se on jaettu kahdelle riville merkin `\` avulla.
