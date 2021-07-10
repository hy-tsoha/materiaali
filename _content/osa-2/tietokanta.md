## Tietokannan käyttäminen

### PostgreSQL:n asennus

Jotta voit kehittää sovellusta, sinun täytyy asentaa koneellesi PostgreSQL-tietokanta.

Voit asentaa PostgreSQL:n Linuxiin käyttäen [asennusskriptiä](https://github.com/hy-tsoha/local-pg), joka on tehty tätä kurssia varten. Skripti asentaa PostgreSQL:n käyttäjän kotihakemistoon ja on tarkoitettu erityisesti käytettäväksi tietojenkäsittelytieteen osaston fuksiläppäreissä ja mikroluokissa. Saatavilla on myös [video](https://www.helsinki.fi/fi/unitube/video/617d690b-b1ce-44f0-997a-dca01bf7eff0), joka näyttää asennuksen vaiheet ja esimerkin tietokannan käyttämisestä.

Voit myös asentaa PostgreSQL:n pääkäyttäjänä käyttöjärjestelmäsi pakettienhallinnan kautta, käyttää Dockeria tai vastaavaa alustaa tai ladata asennuspaketin itse. Ohjeita asennukseen eri järjestelmiin on [PostgreSQL:n sivulla](https://www.postgresql.org/download/).

Macilla helppo tapa saada PostgreSQL käyttöön on [Postgres.app](https://postgresapp.com/).

### PostgreSQL-tulkki

Tietokannan asennuksen jälkeen komento `psql` avaa PostgreSQL-tulkin, jonka avulla voi suorittaa SQL-komentoja komentorivillä. Esimerkiksi voimme luoda seuraavasti taulun `messages`, lisätä sinne kolme riviä ja hakea sitten kaikki rivit taulusta:

```prompt
$ psql
user=# CREATE TABLE messages (id SERIAL PRIMARY KEY, content TEXT);
CREATE TABLE
user=# INSERT INTO messages (content) VALUES ('moikka');
INSERT 0 1
user=# INSERT INTO messages (content) VALUES ('apina banaani cembalo');
INSERT 0 1
user=# INSERT INTO messages (content) VALUES ('kolmas viesti');
INSERT 0 1
user=# SELECT * FROM messages;
 id |        content        
----+-----------------------
  1 | moikka
  2 | apina banaani cembalo
  3 | kolmas viesti
(3 rows)
```

Rivien alussa oleva `user` on tietokoneen käyttäjän tunnus, jonka kautta tietokantaa käytetään. Tässä materiaalissa käytetään esimerkkinä tunnusta `user`, mutta omalla koneellasi se on todennäköisesti jokin muu.

PostgreSQL:ssä tyyppi `SERIAL` tarkoittaa taulun avaimena käytettävää kokonaislukua, joka kasvaa automaattisesti, kun tauluun lisätään uusia rivejä.

Hyödyllisiä PostgreSQL-tulkin komentoja ovat `\dt`, joka näyttää listan tauluista, sekä `\d [taulu]`, joka näyttää taulun sarakkeet ja muuta tietoa siitä.

```prompt
user=# \dt
         List of relations
 Schema |   Name   | Type  | Owner 
--------+----------+-------+-------
 public | messages | table | user
(1 row)

user=# \d messages
                             Table "public.messages"
 Column  |  Type   | Collation | Nullable |               Default                
---------+---------+-----------+----------+--------------------------------------
 id      | integer |           | not null | nextval('messages_id_seq'::regclass)
 content | text    |           |          | 
Indexes:
    "messages_pkey" PRIMARY KEY, btree (id)
```

Komento `\q` poistuu PostgreSQL-tulkista:

```prompt
user=# \q
$ 
```

### Tietokantayhteys sovelluksesta

Jotta voimme käyttää tietokantaa Flask-sovelluksessa, asennamme pari kirjastoa lisää:

```prompt
(venv) $ pip install flask-sqlalchemy
(venv) $ pip install psycopg2
```

Ensimmäinen kirjasto `flask-sqlalchemy` on SQLAlchemy-rajapinta, jonka kautta voi käyttää tietokantaa Flaskissa. Toinen kirjasto `psycopg2` puolestaan mahdollistaa yhteyden muodostamisen PostgreSQL-tietokantaan.

Jos sinulla on ongelmia saada kirjasto `psycopg2` toimimaan, voit kokeilla asentaa sen sijaan kirjaston `psycopg2-binary`, jolla on vähemmän riippuvuuksia.

Jotta sovellus saa yhteyden tietokantaan, sen täytyy tietää tietokannan _osoite_. Tässä materiaalissa käytämme osoitetta muodossa `postgresql:///user`, missä `user` on käytettävän tietokannan nimi ja näkyy myös PostgreSQL-tulkissa rivien alussa. Tietokannan nimi on siis tässä sama kuin käyttäjän tunnus.

Huomaa, että vaadittu tapa antaa tietokannan osoite riippuu siitä, mikä järjestelmä on käytössä ja miten PostgreSQL on asennettu. Jos asensit PostgreSQL:n tämän kurssin asennusskriptillä, voit käyttää osoitetta `postgresql+psycopg2://`. Lisää tietoa tietokannan osoitteen muodostumisesta on [PostgreSQL:n dokumentaatiossa](https://www.postgresql.org/docs/12/libpq-connect.html#LIBPQ-CONNSTRING) 

Seuraavassa on yksinkertainen sovellus, joka testaa tietokantayhteyttä. Sovellus olettaa, että tietokannassa on äsken luomamme `messages`-taulu.

<p class="code-title">app.py</p>
```python
from flask import Flask
from flask import redirect, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///user"
db = SQLAlchemy(app)

@app.route("/")
def index():
    result = db.session.execute("SELECT content FROM messages")
    messages = result.fetchall()
    return render_template("index.html", count=len(messages), messages=messages) 

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
{{ message.content }}
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

<img class="screenshot" src="../assets/osa-2/viestit1.png">

<img class="screenshot" src="../assets/osa-2/viestit2.png">

<img class="screenshot" src="../assets/osa-2/viestit3.png">

Katsotaan vielä tarkemmin joitakin kohtia koodista:

```python
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///user"
db = SQLAlchemy(app)
```

Tämä koodi määrittelee osoitteen, jonka kautta tietokantaan saadaan yhteys, sekä luo `db`-olion, jonka avulla sovellus voi suorittaa SQL-komentoja.

```python
    result = db.session.execute("SELECT content FROM messages")
    messages = result.fetchall()
```

Tämä koodi suorittaa kyselyn, joka hakee kaikki taulussa olevat viestit. Metodi `fetchall` antaa listan, jonka jokainen alkio on yhden rivin sisältö. Sivupohjassa `message.content` näyttää rivin sarakkeen `content` arvon eli viestin sisällön.

```python
    sql = "INSERT INTO messages (content) VALUES (:content)"
    db.session.execute(sql, {"content":content})
    db.session.commit()
    return redirect("/")
```

Tämä koodi lisää tietokantaan uuden rivin, kun käyttäjä on lähettänyt viestin lomakkeella.

Käyttäjän antama syöte yhdistetään SQL-komentoon parametrina, jolla on tietty nimi, tässä tapauksessa `content`. SQL-komennossa ennen parametrin nimeä on kaksoispiste. Parametrin käyttäminen on turvallinen tapa yhdistää käytäjän antamaa tietoa SQL-komentoon, koska tällöin tiedon yhdistäminen ei voi muuttaa kyselyn rakennetta eikä SQL-injektio ole mahdollinen.

Huomaa, että sovelluksen tekemät SQL-komennot suoritetaan automaattisesti transaktion sisällä. Kun sovellus tekee muutoksia tietokantaan, muutosten jälkeen täytyy kutsua metodia `commit`, jotta transaktio viedään loppuun ja muutokset menevät pysyvästi tietokantaan.

Funktio `redirect` ohjaa käyttäjän toiselle sivulle. Tässä tapauksessa viestin lähetyksen jälkeen siirrytään takaisin etusivulle. Tämän tavan etuna on, että käyttäjä ei voi vahingossa lähettää lomaketta uudestaan, jos hän lataa sivun uudestaan. Tämä on hyvin yleinen toteutustapa web-ohjelmoinnissa, ja siitä käytetään joskus nimeä PRG-malli (Post/Redirect/Get).

### Kyselyn tulosten hakeminen

Kaksi tavallista metodia kyselyn tulosten hakemiseen ovat `fetchall` ja `fetchone`. Metodi `fetchall` hakee kaikki kyselyn antamat rivit listana, kuten teimme äskeisessä esimerkissä, kun taas metodi `fetchone` hakee vain yhden (ensimmäisen) rivin. Metodi `fetchone` on hyödyllinen silloin, kun kysely palauttaa varmasti tarkalleen yhden rivin.

Molemmissa metodeissa yksittäisen rivin sisältö on olio, josta voidaan hakea tietyn sarakkeen sisältö useilla tavoilla:

* `row[i]`: hakee sarakkeen `i` sisällön (0-indeksoituna)
* `row.name`: hakee sarakkeen `name` sisällön
* `row["name"]`: hakee sarakkeen `name` sisällön

Esimerkiksi seuraava koodi näyttää kolme tapaa hakea rivit metodilla `fetchall` ja tulostaa sarakkeiden `id` ja `content` arvot joka riviltä.

```python
result = db.session.execute("SELECT id, content FROM messages")
messages = result.fetchall()

for message in messages:
    print(message[0], message[1])

for message in messages:
    print(message.id, message.content)

for message in messages:
    print(message["id"], message["content"])
```

Seuraava koodi puolestaan hakee rivien lukumäärän funktion `COUNT` avulla. Koska kysely palauttaa aina tasan yhden rivin, on luontevaa käyttää metodia `fetchone`.

```python
result = db.session.execute("SELECT COUNT(*) FROM messages")
row = result.fetchone()
print(row[0])
print(row.count)
print(row["count"])
```

Rivin sarakkeen sisällön hakemiseen on siis kolme erilaista syntaksia, ja on makuasia, mitä niistä käyttää milloinkin. Sarakkeen indeksin perusteella hakemisessa etuna on, että indeksointi tapahtuu aina samalla tavalla. Muut tavat ovat helpompia lukea, mutta voi olla epäselvää, mikä on tulostaulun sarakkeen nimi. Esimerkiksi äskeisessä koodissa piti tietää tai arvata, että funktiosta `COUNT(*)` tulee tulostauluun sarake `count`.

### Ympäristömuuttujat

Käytännössä ei ole hyvä tapa kovakoodata tietokannan osoitetta sovelluksen koodiin, vaan parempi tapa on välittää tämä tieto _ympäristömuuttujan_ kautta. Tässä tapauksessa voimme päättää, että ympäristömuuttuja `DATABASE_URL` ilmaisee tietokannan osoitteen.

Yksi tapa määritellä ympäristömuuttuja olisi käyttää komentoa `export` seuraavasti ennen sovelluksen käynnistämistä:

```prompt
(venv) $ export DATABASE_URL=postgresql:///user
(venv) $ flask run
```

Kuitenkin kätevämpi tapa on ottaa käyttöön kirjasto `python-dotenv`:

```prompt
(venv) $ pip install python-dotenv
```

Kun kirjasto on asennettu, Flask osaa käyttää sitä automaattisesti. Tämän ansiosta voimme luoda tiedoston `.env`, jossa on määritelty ympäristömuuttujat:

```
DATABASE_URL=postgresql:///user
```

Tämän etuna on, että ennen sovelluksen käynnistämistä ei tarvitse suorittaa `export`-komentoa vaan ympäristömuuttujat ovat aina tallessa tiedostossa.

Voimme hakea ympäristömuuttujan arvon sovellukseen näin:

```python
from os import getenv

app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
```

Tästä lähtien oletamme, että ympäristömuuttuja `DATABASE_URL` kertoo tietokannan osoitteen. Tämä tieto voi olla ympäristöstä riippuen tiedostossa `.env` tai määritetty muulla tavalla.

### SQLAlchemyn varoitus

Kun sovelluksessa käytetään tietokantaa SQLAlchemyn kautta, sovelluksen käynnistäminen saattaa antaa seuraavan varoituksen:

```prompt
FSADeprecationWarning: SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and will be disabled by default in the future.  Set it to True or False to suppress this warning.
```

Tässä projektissa tämä ei haittaa sinänsä, mutta jos haluat päästä varoituksesta eroon, voit lisätä koodiin seuraavan rivin:

```python
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
```

Lisää tietoa varoituksen syystä löydät [Stack Overflow'n keskustelusta](https://stackoverflow.com/questions/33738467/how-do-i-know-if-i-can-disable-sqlalchemy-track-modifications).
