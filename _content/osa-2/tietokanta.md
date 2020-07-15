## Tietokannan käyttäminen

### PostgreSQL:n asennus

Jotta voit kehittää sovellusta, sinun täytyy asentaa koneellesi PostgreSQL-tietokanta.

Olemme tehneet kurssia varten [asennusskriptin](https://github.com/hy-tsoha/local-pg), joka asentaa PostgreSQL:n Linux-ympäristöön. Skripti asentaa tietokannan käyttäjän kotihakemistoon niin, että asennus ei vaadi pääkäyttäjän oikeuksia eikä tietokanta ole muiden käyttäjien käytettävissä. Skripti on tarkoitettu erityisesti käytettäväksi tietojenkäsittelytieteen osaston fuksiläppäreissä ja mikroluokissa.

Voit myös asentaa PostgreSQL:n pääkäyttäjänä käyttöjärjestelmäsi pakettienhallinnan kautta, käyttää Dockeria tai vastaavaa alustaa tai ladata asennuspaketin itse. Ohjeita asennukseen eri järjestelmiin on [PostgreSQL:n sivulla](https://www.postgresql.org/download/).

### PostgreSQL-tulkki

Tietokannan asennuksen jälkeen komento `psql` avaa PostgreSQL-tulkin, jonka avulla voi suorittaa SQL-komentoja komentorivillä. Esimerkiksi voimme luoda seuraavasti taulun `messages`, lisätä sinne kolme riviä ja hakea sitten kaikki rivit taulusta:

```plaintext
$ psql
pllk=# CREATE TABLE messages (id SERIAL PRIMARY KEY, content TEXT);
CREATE TABLE
pllk=# INSERT INTO messages (content) VALUES ('moikka');
INSERT 0 1
pllk=# INSERT INTO messages (content) VALUES ('apina banaani cembalo');
INSERT 0 1
pllk=# INSERT INTO messages (content) VALUES ('kolmas viesti');
INSERT 0 1
pllk=# SELECT * FROM messages;
 id |        content        
----+-----------------------
  1 | moikka
  2 | apina banaani cembalo
  3 | kolmas viesti
(3 rows)
```

PostgreSQL:ssä tyyppi `SERIAL` tarkoittaa taulun avaimena käytettävää kokonaislukua, joka kasvaa automaattisesti, kun tauluun lisätään uusia rivejä.

Hyödyllisiä PostgreSQL-tulkin komentoja ovat `\dt`, joka näyttää listan tauluista, sekä `\d [taulu]`, joka näyttää taulun sarakkeet ja muuta tietoa siitä.

```plaintext
pllk=# \dt
         List of relations
 Schema |   Name   | Type  | Owner 
--------+----------+-------+-------
 public | messages | table | pllk
(1 row)

pllk=# \d messages
                             Table "public.messages"
 Column  |  Type   | Collation | Nullable |               Default                
---------+---------+-----------+----------+--------------------------------------
 id      | integer |           | not null | nextval('messages_id_seq'::regclass)
 content | text    |           |          | 
Indexes:
    "messages_pkey" PRIMARY KEY, btree (id)
```

Komento `\q` poistuu PostgreSQL-tulkista:

```plaintext
pllk=# \q
$ 
```

### Tietokantayhteys sovelluksesta

Jotta voimme käyttää tietokantaa Flask-sovelluksessa, asennamme pari kirjastoa lisää:

```plaintext
(venv) $ pip install flask-sqlalchemy
(venv) $ pip install psycopg2
```

Ensimmäinen kirjasto `flask-sqlalchemy` on SQLAlchemy-rajapinta, jonka kautta käytämme tietokantaa Flaskissa. Toinen kirjasto `psycopg2` puolestaan mahdollistaa yhteyden muodostamisen PostgreSQL-tietokantaan.

Seuraavassa on yksinkertainen sovellus, joka testaa tietokantayhteyttä. Sovellus olettaa, että tietokannassa on äsken luomamme `messages`-taulu.

<p class="code-title">app.py</p>
```python
from flask import Flask
from flask import redirect, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///pllk"
db = SQLAlchemy(app)

@app.route("/")
def index():
    result = db.session.execute("SELECT COUNT(*) FROM messages")
    count = result.fetchone()[0]
    result = db.session.execute("SELECT content FROM messages")
    messages = result.fetchall()
    return render_template("index.html", count=count, messages=messages) 

@app.route("/new")
def new():
    return render_template("new.html")

@app.route("/send", methods=["POST"])
def send():
    content = request.form["content"]
    sql = "INSERT INTO messages (content) VALUES (:content)"
    db.session.execute(sql, {"content":content})
    db.session.commit()
    return redirect("/")
```

<p class="code-title">index.html</p>
```jinja
{% raw %}Viestien määrä: {{ count }}
<hr>
{% for message in messages %}
{{ message[0] }}
<hr>
{% endfor %}
<a href="/new">Lähetä viesti</a>{% endraw %}
```

<p class="code-title">new.html</p>
```html
<form action="/send" method="POST">
Viesti: <br>
<textarea name="content" rows="3" cols="40"></textarea>
<br>
<input type="submit" value="Lähetä">
</form>
```

Sovelluksen käyttäminen voi näyttää tältä:

<img class="screenshot" src="viestit1.png">

<img class="screenshot" src="viestit2.png">

<img class="screenshot" src="viestit3.png">

Katsotaan vielä tarkemmin joitakin kohtia koodista:

```python
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///pllk"
db = SQLAlchemy(app)
```

Tämä koodi määrittelee osoitteen, jonka kautta tietokantaan saadaan yhteys, sekä luo `db`-olion, jonka avulla sovellus voi suorittaa SQL-komentoja.

```python
    result = db.session.execute("SELECT COUNT(*) FROM messages")
    count = result.fetchone()[0]
```

Tämä kysely tuottaa tulostaulun, jossa on yksi rivi: funktion `COUNT(*)` palauttama taulun rivien määrä. Metodi `fetchone` hakee rivin sisällön tuplena ja kohta 0 viittaa ensimmäiseen (tässä tapauksessa ainoaan) sarakkeeseen, jossa on rivien määrä.

```python
    result = db.session.execute("SELECT content FROM messages")
    messages = result.fetchall()
```

Tämä kysely hakee sisällön kaikista taulussa olevista viesteistä. Metodi `fetchall` antaa listan, jossa on kunkin rivin sisältö tuplena. Sivupohjassa `message[0]` näyttää rivin ensimmäisen sarakkeen arvon eli viestin sisällön.

```python
    sql = "INSERT INTO messages (content) VALUES (:content)"
    db.session.execute(sql, {"content":content})
    db.session.commit()
    return redirect("/")
```

Tämä koodi lisää tietokantaan uuden rivin, kun käyttäjä on lähettänyt viestin lomakkeella.

Käyttäjän antama syöte yhdistetään SQL-komentoon parametrina, jolla on tietty nimi, tässä tapauksessa `content`. Huomaa kaksoispiste ennen parametrin nimeä SQL-komennossa.

Kun sovellus tekee muutoksia tietokantaan, muutosten jälkeen täytyy kutsua metodia `commit`, jotta transaktio päättyy ja muutokset menevät pysyvästi tietokantaan.

Funktio `redirect` aiheuttaa uudelleenohjauksen toiselle sivulle. Tässä tapauksessa viestin lähetyksen jälkeen siirrytään takaisin etusivulle.

### Ympäristömuuttujat

Käytännössä ei ole hyvä tapa kovakoodata tietokannan osoitetta sovelluksen koodiin, vaan parempi tapa on välittää tämä tieto _ympäristömuuttujan_ kautta. Tässä tapauksessa voimme päättää, että ympäristömuuttuja `DATABASE_URL` ilmaisee tietokannan osoitteen.

Yksi tapa määritellä ympäristömuuttuja olisi käyttää komentoa `export` seuraavasti ennen sovelluksen käynnistämistä:

```plaintext
$ export DATABASE_URL=postgresql:///pllk
```

Kuitenkin kätevämpi tapa on ottaa käyttöön kirjasto `python-dotenv`:

```plaintext
$ pip install python-dotenv
```

Kun kirjasto on asennettu, Flask osaa käyttää sitä automaattisesti. Tämän ansiosta voimme luoda tiedoston `.env`, jossa on määritelty ympäristömuuttujat:

```
DATABASE_URL=postgresql:///pllk
```

Tämän etuna on, että meidän ei tarvitse suorittaa `export`-komentoa ennen sovelluksen käynnistämistä vaan ympäristömuuttujat ovat aina tallessa tiedostossa.

Voimme hakea ympäristömuuttujan arvon sovellukseen näin:

```python
from os import getenv

app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
```

Tästä lähtien oletamme, että ympäristömuuttuja `DATABASE_URL` kertoo tietokannan osoitteen. Tämä tieto voi olla ympäristöstä riippuen tiedostossa `.env` tai määritetty muulla tavalla.
