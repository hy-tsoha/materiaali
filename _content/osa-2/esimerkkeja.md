## Esimerkkejä

Teemme seuraavaksi kolme pientä tietokantaa käyttävää sovellusta, jotka esittelevät tietokannan käyttämistä web-sovelluksessa.

### Vieraskirja

Vieraskirja näyttää käyttäjien lähettämiä viestejä ja antaa mahdollisuuden lähettää uusi viesti. Seuraava komento luo tietokantaan taulun viestejä varten:

```bash
pllk=# CREATE TABLE messages (id SERIAL PRIMARY KEY, content TEXT, time TIMESTAMP);
```

Sovelluksen etusivu näyttää viestit. Tässä on sivupohja `index.html`, joka olettaa, että viestit tulevat listassa `messages`:

```html
<h1>Viestit</h1>
<a href="/new">Uusi viesti</a>
<hr>
{% raw %}{% for message in messages %}
{{ message[0] }}
<br>
<i>Lähetysaika: {{ message[1] }}</i>
<hr>
{% endfor %}{% endraw %}
```

Sivupohjassa `new.html` on lomake, jonka kautta voi lähettää viestin:

```html
<form action="/send" method="post">
<p>
Viesti:<br>
<textarea name="content">
</textarea>
</p>
<input type="submit" value="Lähetä">
</form>
```

Sovelluksen varsinainen koodi on tässä:

```python
from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

from dotenv import load_dotenv
import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
db = SQLAlchemy(app)

@app.route("/")
def index():
    query = "SELECT content, time FROM messages ORDER BY id DESC"
    result = db.session.execute(query)
    messages = result.fetchall()
    return render_template("index.html",messages=messages)

@app.route("/new")
def new():
    return render_template("new.html")

@app.route("/send",methods=["post"])
def send():
    db.session.execute("INSERT INTO messages (content, time)"
                       "VALUES (:content, NOW())",
                       {"content":request.form["content"]})
    db.session.commit()
    return redirect("/")
```

Etusivu suorittaa kyselyn, joka hakee viestien tiedot järjestyksessä uusimmasta vanhimpaan. Metodin `fetchall` antama lista välitetään sivupohjalle.

Käyttäjän lähettämän lomakkeen käsittelee sivu `send`, joka lisää uuden viestin tietokantaan. Viestin sisältö annetaan parametrina, joka näkyy kyselyssä muodossa `:content`. Lähetysajan puolestaan antaa SQL-funktio `NOW()`.

Lisäyksen jälkeen tulee kutsua metodia `commit`, jotta transaktio viedään loppuun. Tämän jälkeen käyttäjä ohjataan metodilla `redirect` takaisin etusivulle.

Sovelluksen käyttäminen voi näyttää seuraavalta:

TODO: Kuva tähän
