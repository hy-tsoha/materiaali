## Versionhallinta

Käytämme kurssilla versionhallintaan GitHubia. Seuraavaksi käymme läpi esimerkin, jossa aloitamme sovelluksen kehityksen GitHubissa.

Teemme pienen sovelluksen, joka tallentaa tietokantaan sivuston kävijöiden määrän ja näyttää tämän tiedon etusivulla. Esimerkki olettaa, että GitHubiin on luotu uusi repositorio `tsoha-visitors`, jossa on tiedosto `README.md` mutta ei vielä muuta.

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

Luomme tietokantaan yhden taulun, johon tallennetaan jokaisen kävijän vierailuaika:

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
Ideana on, että aina kun käyttäjä lataa etusivun, tauluun `visitors` lisätään uusi rivi. Tämän jälkeen haetaan taulun rivien määrä, joka kertoo kävijöiden yhteismäärän.

Nyt voimme kokeilla suorittaa sovelluksen:

```bash
(venv) $ flask run
```

Sovelluksen pitäisi näyttää tältä:

TODO: Kuva tähän

### Tiedostojen lisääminen repositorioon

Koska sovelluksen ensimmäinen versio toimii, nyt on hyvä hetki lisätä sovelluksen tiedostot repositorioon. Hyödyllinen komento on `git status`, joka näyttää repositorion tilanteen. Komento antaa nyt seuraavan tuloksen:

```bash
(venv) $ git status
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

Komento antaa listan tiedostoista ja hakemistoista, joita _ei_ ole repositoriossa:

* `.env` on luomamme tiedosto, jossa on ympäristömuuttujia
* `__pycache__` on sovelluksen suorituksen aikana syntynyt hakemisto, jossa on tavukoodiksi käännetty sovellus
* `app.py` on luomamme tiedosto, jossa on sovelluksen koodi
* `templates` on hakemisto, jossa on sivupohja `index.html`
* `venv` on hakemisto, joka sisältää virtuaaliympäristön tarvitsemat tiedostot

Tärkeä asia versionhallinnassa on päättää, mitkä tiedostot laitetaan repositorioon kaikkien saataville. Tässä tapauksessa repositorioon kuuluvat `app.py` ja `templates`, jotka muodostavat sovelluksen toteutuksen. Komento `git add` laittaa ne lisättäväksi:

```bash
(venv) $ git add app.py
(venv) $ git add templates
```

Nyt `git status` näyttää muuttuneen tilanteen näin:

```bash
(venv) $ git status
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
(venv) $ git commit -m "Create first version"
(venv) $ git push
```

Tämän seurauksena sovelluksen nykyinen versio on tallessa GitHubissa.

### Tiedosto .gitignore

Tiedosto `.env` ja hakemistot `__pycache__` ja `venv` eivät kuulu repositorioon, koska ne liittyvät käyttäjän ympäristöön eikä sovelluksen toteutukseen. Nämä kuitenkin näkyvät häiritsevästi listassa aina, kun suoritamme komennon `git status`.

Hyödyllinen tiedosto on `.gitignore`, joka määrittää, mitä tiedostoja ja hakemistoja _emme_ halua viedä repositorioon. Tässä tapauksessa tiedoston sisältö voisi olla:

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
(venv) $ git add .gitignore 
(venv) $ git commit -m "Add .gitignore"
(venv) $ git push
```

Tästä lähtien tiedostossa `.gitignore` mainitut tiedostot ja hakemistot eivät ole ehdolla repositorioon lisättäväksi. Projektin kehityksen aikana tiedostoon `.gitignore` voi lisätä tarvittaessa lisää sisältöä.

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
(venv) $ git add requirements.txt 
(venv) $ git commit -m "Add requirements"
(venv) $ git push
```

Nyt jos toinen henkilö hakee sovelluksen GitHubista, hän voi asentaa virtuaaliympäristöönsä tarvittavat kirjastot seuraavalla komennolla:

```bash
(venv) $ pip install -r requirements.txt
```

### Tietokannan rakenne

Repositoriosta puuttuu vielä tieto siitä, mikä on sovelluksen käyttämän tietokannan rakenne. Tätä varten voimme luoda tiedoston `schema.sql`, joka sisältää tietokannan skeeman. Tässä sovelluksessa tietokannassa on vain yksi taulu ja tiedoston sisältö on seuraava:

```
CREATE TABLE visitors (id SERIAL PRIMARY KEY, time TIMESTAMP);
```

Lisäämme uuden tiedoston repositorioon:

```
(venv) $ git add schema.sql 
(venv) $ git commit -m "Add SQL schema"
(venv) $ git push
```

Tästä lähtien sovelluksen tarvitsemat taulut voi luoda tietokantaan seuraavasti ohjaamalla tiedostossa `schema.sql` olevat komennot PostgreSQL-tulkille:

```bash
(venv) $ psql < schema.sql
```

Tarvittaessa voimme hakea myös tietokannan skeeman komennolla `pg_dump` seuraavasti:

```bash
(venv) $ pg_dump -s
```

Komennossa lippu `-s` tarkoittaa, että haluamme hakea vain skeeman eikä taulujen sisältöä. Komento tuottaa melko pitkän tulostuksen, jonka osana on taulujen määrittely:

```
CREATE TABLE public.visitors (
    id integer NOT NULL,
    "time" timestamp without time zone
);

CREATE SEQUENCE public.visitors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.visitors_id_seq OWNED BY public.visitors.id;    

ALTER TABLE ONLY public.visitors ALTER COLUMN id SET DEFAULT nextval('public.visitors_id_seq'::regclass);

ALTER TABLE ONLY public.visitors
    ADD CONSTRAINT visitors_pkey PRIMARY KEY (id);
```

Huomaa, että tämä määrittely on paljon pidempi kuin käyttämämme tapa: automaattisesti kasvava id-numero asetetaan erikseen ja samoin pääavain asetetaan erikseen.