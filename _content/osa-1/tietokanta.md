## Tietokannan käyttäminen

### PostgreSQL:n asennus

Laitoksen koneilla voit asentaa ilman lisäoikeuksia PostgreSQL:n tunnuksesi käyttöön tällä asennusskriptillä. Skripti saattaa toimia myös joillain muilla Linux-jakeluilla.

Muut käyttöjärjestelmät: Etsi PostgreSQL:n asennusohje käyttöjärjestelmällesi ja asenna se. Asennus saattaa vaatia ylläpito-oikeudet.


### PostgreSQL-tulkki

Komento `psql` avaa PostgreSQL-tulkin, jonka avulla voi suorittaa SQL-komentoja komentorivillä. Esimerkiksi voimme luoda seuraavasti taulun `users`, lisätä sinne kolme riviä ja hakea sitten kaikki rivit taulusta:

```bash
$ psql
pllk=# CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE
pllk=# INSERT INTO users (name) VALUES ('Maija');
INSERT 0 1
pllk=# INSERT INTO users (name) VALUES ('Liisa');
INSERT 0 1
pllk=# INSERT INTO users (name) VALUES ('Kaaleppi');
INSERT 0 1
pllk=# SELECT * FROM users;
 id |   name   
----+----------
  1 | Maija
  2 | Liisa
  3 | Kaaleppi
(3 rows)
```

PostgreSQL:ssä tyyppi `SERIAL` tarkoittaa taulun avaimena käytettävää kokonaislukua, joka kasvaa automaattisesti, kun tauluun lisätään uusia rivejä.

Hyödyllisiä PostgreSQL-tulkin komentoja ovat `\dt`, joka näyttää listan tauluista, sekä `\d [taulu]`, joka näyttää taulun sarakkeet ja muuta tietoa siitä.

```bash
pllk=# \dt
       List of relations
 Schema | Name  | Type  | Owner 
--------+-------+-------+-------
 public | users | table | pllk
(1 row)

pllk=# \d users;
                            Table "public.users"
 Column |  Type   | Collation | Nullable |              Default              
--------+---------+-----------+----------+-----------------------------------
 id     | integer |           | not null | nextval('users_id_seq'::regclass)
 name   | text    |           |          | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
```

Kokeilun päätteeksi tuhoamme taulun `users` ja poistumme sitten PostgreSQL-tulkista `\q`-komennolla.

```bash
pllk=# DROP TABLE users;
DROP TABLE
pllk=# \q
```

### Tietokantayhteys sovelluksesta

Jotta voimme käyttää PostgreSQL-tietokantaa Flask-sovelluksessa, asennamme pari kirjastoa lisää. Käytämme SQLAlchemy-kirjaston versiota, joka on tarkoitettu Flaskin kanssa käytettäväksi.

```bash
(venv) $ pip install flask-sqlalchemy
(venv) $ pip install psycopg2
```

Seuraavassa on yksinkertainen sovellus, joka testaa tietokantayhteyttä:

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///pllk"
db = SQLAlchemy(app)

@app.route("/")
def index():
    result = db.session.execute("SELECT VERSION()")
    return result.fetchone()[0]
```

Sovelluksen etusivu suorittaa SQL-kyselyn `SELECT VERSION()`, joka hakee tietokannan version. Komennon tulos voi näyttää tältä:

TODO: Kuva tähän

Jos saat tämän testisovelluksen toimimaan, niin tilanne on hyvä, koska nyt sinulla on toimiva ympäristö sovelluksen kehittämiseen kurssilla.

TODO: Lisää metodeista `fetchone` ja `fetchall`, transaktiot?

### Esimerkki: Vieraskirja

Tehdään seuraavaksi todellinen pieni tietokantaa käyttävä sovellus. Ideana on tehdä vieraskirja, jossa käyttäjät voivat lähettää sivulle anonyymeja viestejä. Seuraava komento luo tietokantaan taulun viestejä varten:

```bash
pllk=# CREATE TABLE messages (id SERIAL PRIMARY KEY, content TEXT, time TIMESTAMP);
```

Sovelluksen etusivu `index.html` näyttää viestit. Tässä on sivun pohja, joka olettaa, että viestit tulevat listassa `messages`:

```html
<h1>Messages</h1>
<a href="/new">New message</a>
<hr>
{% raw %}{% for entry in messages %}
{{ entry[0] }}
<hr>
{% endfor %}{% endraw %}
```

Toinen sivu `new.html` näyttää lomakkeen, jonka kautta voi lähettää viestin:

```html
<form action="/send" method="post">
<p>
Message:<br>
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

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///pllk"
db = SQLAlchemy(app)

@app.route("/")
def index():
    result = db.session.execute("SELECT content FROM messages")
    messages = result.fetchall()
    return render_template("index.html",messages=messages)

@app.route("/new")
def new():
    return render_template("new.html")

@app.route("/send",methods=["post"])
def send():
    db.session.execute("INSERT INTO messages (content,time)"
                       "VALUES (:content,NOW())",
                       {"content":request.form["content"]})
    db.session.commit()
    return redirect("/")
```

Etusivu suorittaa kyselyn `SELECT content FROM messages` ja metodi `fetchall` hakee kaikki kyselyn tuottamat rivit, jotka ohjataan sivupohjalle. Sivupohjassa `entry[0]` viittaa rivin ensimmäiseen sarakkeeseen, joka on `content` (tässä tapauksessa haetaan vain yksi sarake).

Kun käyttäjä lähettää lomakkeen, tämän käsittelee sivu `send`, joka lisää käyttäjän lähettämän viestin tietokantaan. Huomaa, että lisäyksen jälkeen tulee kutsua metodia `commit`, jotta transaktio viedään loppuun. Tämän jälkeen käyttäjä ohjataan metodilla `redirect` takaisin etusivulle.

Sovelluksen käyttäminen voi näyttää seuraavalta:

TODO: Kuva tähän
