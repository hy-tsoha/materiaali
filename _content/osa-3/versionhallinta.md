## Versionhallinta

Käytämme kurssilla versionhallintaan GitHubia. Seuraava esimerkki näyttää kaikki vaiheet, kun aloitamme sovelluksen kehityksen GitHubissa.

Teemme pienen sovelluksen, joka tallentaa tietokantaan sivuston kävijöiden määrän ja näyttää tämän tiedon etusivulla. Esimerkki olettaa, että GitHubiin on luotu uusi repositorio `tsoha-visitors`, jossa on automaattisesti luotu tiedosto `README.md`.

Seuraavat komennot kloonaavat repositorion omalle koneelle, luovat sovellusta varten virtuaaliympäristön sekä asentavat tarvittavat kirjastot:

```bash
$ git clone https://github.com/pllk/tsoha-visitors.git
Cloning into 'tsoha-visitors'...
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
$ cd tsoha-visitors/
$ python3 -m venv venv
$ source venv/bin/activate
(venv) $ pip install flask
(venv) $ pip install flask-sqlalchemy
(venv) $ pip install psycopg2
(venv) $ pip install python-dotenv
```

Tietokannassa on yksi taulu, johon tallennetaan jokaisen kävijän vierailuaika:

```sql
CREATE TABLE visitors (id SERIAL PRIMARY KEY, time TIMESTAMP);
```

Sovellus muodostuu seuraavista tiedostoista:

<p class="code-title">app.py</p>
```python
from flask import Flask, render_template, redirect
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
db = SQLAlchemy(app)

@app.route("/")
def index():
    db.session.execute("INSERT INTO visitors (time) VALUES (NOW())")
    db.session.commit()
    result = db.session.execute("SELECT COUNT(*) FROM visitors")
    counter = result.fetchone()[0]
    return render_template("index.html", counter=counter) 
```

<p class="code-title">templates/index.html</p>
```html
{% raw %}Tervetuloa!
<p>
Olet sivuston {{ counter }}. käyttäjä{% endraw %}
```

<p class="code-title">.env</p>
```
DATABASE_URL=postgresql:///pllk
```

Nyt voimme kokeilla suorittaa sovelluksen:

```bash
(venv) $ flask run
```

Sovelluksen pitäisi näyttää tältä:

TODO: Kuva tähän

### Tiedostojen lisääminen repositorioon

Koska sovelluksen ensimmäinen versio toimii, nyt on hyvä hetki lisätä sovelluksen tiedostot repositorioon. Hyödyllinen komento on `git status`, joka näyttää repositorion tilanteen. Komento antaa nyt seuraavan tuloksen:

```bash
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.env
	__pycache__/
	app.py
	templates/
	venv/

nothing added to commit but untracked files present (use "git add" to track)
```

Tässä on lista tiedostoista ja hakemistoista, joita _ei_ ole repositoriossa:

* `.env` on luomamme tiedosto, jossa on ympäristömuuttujia
* `__pycache__` on sovelluksen suorituksen aikana syntynyt hakemisto, jossa on tavukoodiksi käännetty sovellus
* `app.py` on luomamme tiedosto, jossa on sovelluksen koodi
* `templates` on hakemisto, jossa on sivupohja `index.html`
* `venv` on hakemisto, joka sisältää virtuaaliympäristön tarvitsemat tiedostot

Näistä repositorioon kuuluvat `app.py` ja `templates`, jotka muodostavat sovelluksen toteutuksen. Komento `git add` laittaa ne lisättäväksi:

```bash
$ git add app.py
$ git add templates
```

Nyt `git status` näyttää muuttuneen tilanteen näin:

```bash
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   app.py
	new file:   templates/index.html

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.env
	__pycache__/
	venv/
```

Tämä näyttää hyvältä, koska oikeat tiedostot ovat menossa repositorioon, joten voimme suorittaa komennot `git commit` ja `git push`:

```bash
$ git commit -m "Create first version"
$ git push
```

Tämän seurauksena sovelluksen nykyinen versio on tallessa GitHubissa.

### Tiedosto .gitignore

Tiedosto `.env` ja hakemistot `__pycache__` ja `venv` eivät kuulu repositorioon, koska ne liittyvät käyttäjän ympäristöön eikä sovelluksen toteutukseen. Nämä kuitenkin näkyvät häiritsevästi listassa aina, kun suoritamme komennon `git status`.

Hyödyllinen tiedoston on `.gitignore`, joka määrittää, mitä tiedostoja ja hakemistoja _emme_ halua viedä repositorioon. Tässä tapauksessa tiedoston sisältö voisi olla:

```
.env
__pycache__
venv
```

Tämän tiedoston luomisen jälkeen `git status` alkaa näyttää siistimmältä:

```bash
(venv) $ git status
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.gitignore

nothing added to commit but untracked files present (use "git add" to track)
```

Tiedosto `.gitignore` kuitenkin lisätään repositorioon:

```bash
$ git add .gitignore 
$ git commit -m "Add .gitignore"
$ git push
```

Nyt meidän ei tarvitse enää varoa sitä, että repositorioon joutuu vääriä tiedostoja, koska `.gitignore` pitää huolen tästä. Projektin kehityksen aikana tiedostoon voi lisätä tarvittaessa lisää tiedostoja ja hakemistoja.

### Sovelluksen riippuvuudet

Komento `pip freeze` kertoo, mitkä ovat sovelluksen _riippuvuudet_  eli mitä kirjastoja sovellus tarvitsee toimiakseen. Kun suoritamme komennon nyt, saamme seuraavan tuloksen:

```bash
(venv) $ pip freeze
click==7.1.2
Flask==1.1.2
Flask-SQLAlchemy==2.4.3
itsdangerous==1.1.0
Jinja2==2.11.2
MarkupSafe==1.1.1
pkg-resources==0.0.0
psycopg2==2.8.5
python-dotenv==0.13.0
SQLAlchemy==1.3.18
Werkzeug==1.0.1
```

Tämä lista kertoo jokaisesta kirjastosta, minkä kirjaston version sovellus vaatii. Huomaa, että jos suoritat komennon itse, voit saada vähän eri versioita.

Sovelluksen riippuvuuksista on tapana tehdä tiedosto `requirements.txt`. Tämä tiedosto tallennetaan repositorioon:

```bash
(venv) $ pip freeze > requirements.txt
$ git add requirements.txt 
$ git commit -m "Add requirements"
$ git push
```

Nyt jos toinen henkilö hakee sovelluksen GitHubista, hän voi asentaa virtuaaliympäristöönsä tarvittavat kirjastot seuraavalla komennolla:

```bash
$ pip install -r requirements.txt
```

### Tietokannan rakenne

Repositoriosta puuttuu vielä tieto siitä, mikä on sovelluksen käyttämän tietokannan rakenne. Voimme hakea tietokannan rakenteen komennolla `pg_dump` seuraavasti:

```bash
$ pg_dump -s -t visitors
```

Komennossa lippu `-s` tarkoittaa, että komento näyttää _skeeman_  eli taulujen rakenteen, ja lippu `-t` määrittää, että haluamamme taulu on `visitors`. Komento tuottaa melko pitkän tulostuksen SQL-komennoista, joiden suorittaminen luo tietokannan:

```
--
-- PostgreSQL database dump
--

(rivejä välissä...)

CREATE TABLE public.visitors (
    id integer NOT NULL,
    "time" timestamp without time zone
);

(lisää rivejä...)
```

Lisäämme komennon tulostuksen repositorioon tiedostona `schema.sql`:

```bash
$ pg_dump -s -t visitors > schema.sql
$ git add schema.sql 
$ git commit -m "Add SQL schema"
$ git push
```

Tämän jälkeen sovelluksen tarvitseman tietokannan saa luotua `psql`-komennolla ohjaamalla sinne tiedoston `schema.sql` sisällön:

```bash
$ psql < schema.sql
```