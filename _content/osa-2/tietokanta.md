## Tietokannan käyttäminen

### PostgreSQL:n asennus

Olemme tehneet kurssia varten [asennusskriptin](linkki), joka asentaa PostgreSQL:n Linux-ympäristöön. Skripti asentaa tietokannan käyttäjän kotihakemistoon niin, että asennus ei vaadi pääkäyttäjän oikeuksia. Skripti on tarkoitettu ertyisesti käytettäväksi tietojenkäsittelytieteen osaston fuksiläppäreissä ja mikroluokissa.

Voit myös asentaa PostgreSQL:n pääkäyttäjänä käyttöjärjestelmäsi pakettienhallinnan kautta, käyttää Dockeria tai vastaavaa alustaa tai ladata asennuspaketin itse. Ohjeita asennukseen eri järjestelmiin on [PostgreSQL:n sivulla](https://www.postgresql.org/download/).

### PostgreSQL-tulkki

Tietokannan asennuksen jälkeen komento `psql` avaa PostgreSQL-tulkin, jonka avulla voi suorittaa SQL-komentoja komentorivillä. Esimerkiksi voimme luoda seuraavasti taulun `users`, lisätä sinne kolme riviä ja hakea sitten kaikki rivit taulusta:

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

Komento `\q` poistuu PostgreSQL-tulkista:

```bash
pllk=# \q
$ 
```

### Tietokantayhteys sovelluksesta


Jotta voimme käyttää tietokantaa Flask-sovelluksessa, asennamme pari kirjastoa lisää:

```bash
(venv) $ pip install flask-sqlalchemy
(venv) $ pip install psycopg2
```

Ensimmäinen kirjasto `flask-sqlalchemy` on SQLAlchemy-rajapinta, jonka kautta käytämme tietokantaa Flaskissa. Toinen kirjasto `psycopg2` puolestaan mahdollistaa yhteyden muodostamisen PostgreSQL-tietokantaan.

Seuraavassa on yksinkertainen sovellus, joka testaa tietokantayhteyttä. Sovellus olettaa, että tietokannassa on äsken luomamme `users`-taulu.

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///pllk"
db = SQLAlchemy(app)

@app.route("/")
def index():
    result = db.session.execute("SELECT COUNT(*) FROM users")
    count = result.fetchone()[0]
    return f"Taulussa on {count} riviä"
```

Sovellus suorittaa SQL-kyselyn `SELECT COUNT(*) FROM users`, joka hakee taulun rivien määrän. Metodi `fetchone` hakee yhden tulosrivin tuplena, jonka alkiot vastaavat rivin sarakkeita, ja `[0]` viittaa ensimmäiseen sarakkeeseen. Tuloksena on seuraava sivu:

TODO: Kuva tähän

Tässä on vielä toinen esimerkki, joka hakee käyttäjien nimet:

```python
@app.route("/")
def index():
    result = db.session.execute("SELECT name FROM users")
    users = result.fetchall()
    names = [row[0] for row in users]
    return ", ".join(names)
```

Nyt käytössä on metodi `fetchall`, joka hakee koko tulostaulun sisällön. Metodi palauttaa listan, jonka jokainen alkio on tulosriviä vastaava tuple. Tuloksena on seuraava sivu:

TODO: Kuva tähän

### Ympäristömuuttujat

Käytännössä ei ole hyvä tapa kovakoodata tietokannan osoitetta sovelluksen koodiin, vaan parempi tapa on välittää tämä tieto _ympäristömuuttujan_ kautta. Voimme tehdä tämän mukavasti asentamalla kirjaston `python-dotenv`.

```bash
$ pip install python-dotenv
```

Tämän jälkeen voimme luoda tiedoston `.env`, jossa on tietokannan osoitteen ilmoittava ympäristömuuttuja:

```
DATABASE_URL=postgresql:///pllk
```

Nyt voimme hakea tiedostossa `.env` annetun muuttujan arvon sovellukseen näin:

```python
from dotenv import load_dotenv
import os

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
```

Tästä lähtien oletamme, että ympäristömuuttuja `DATABASE_URL` kertoo tietokannan osoitteen. Tämä tieto voi olla ympäristöstä riippuen tiedostossa `.env` tai määritetty muulla tavalla.