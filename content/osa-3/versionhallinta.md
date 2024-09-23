## Versionhallinta

Käytämme kurssilla versionhallintaan [GitHubia](https://github.com/). Seuraavaksi käymme läpi esimerkin, jossa aloitamme sovelluksen kehityksen GitHubissa.

Teemme pienen sovelluksen, joka tallentaa tietokantaan sivuston kävijöiden määrän ja näyttää tämän tiedon etusivulla. Esimerkki olettaa, että GitHubiin on luotu uusi repositorio `tsoha-visitors`, jossa on tiedosto `README.md` mutta ei vielä muuta.

Seuraavat komennot kloonaavat repositorion omalle koneelle, luovat sovellusta varten virtuaaliympäristön sekä asentavat tarvittavat kirjastot. Tässä ja myöhemmin vastaavissa kohdissa `user` on käytetty GitHub-tunnus.

```prompt
$ git clone https://github.com/user/tsoha-visitors.git
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
from flask import Flask
from flask import redirect, render_template
from flask_sqlalchemy import SQLAlchemy
from os import getenv

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
db = SQLAlchemy(app)

@app.route("/")
def index():
    db.session.execute("INSERT INTO visitors (time) VALUES (NOW())")
    db.session.commit()
    result = db.session.execute("SELECT COUNT(*) FROM visitors")
    counter = result.fetchone()[0]
    return render_template("index.html", counter=counter) 
```

<p class="code-title">index.html</p>
```jinja
{% raw %}Tervetuloa!
<p>
Olet sivuston {{ counter }}. käyttäjä{% endraw %}
```

<p class="code-title">.env</p>
```
DATABASE_URL=postgresql:///user
```
Ideana on, että aina kun käyttäjä lataa etusivun, tauluun `visitors` lisätään uusi rivi. Tämän jälkeen haetaan taulun rivien määrä, joka kertoo kävijöiden yhteismäärän.

Nyt voimme kokeilla suorittaa sovelluksen:

```prompt
(venv) $ flask run
```

Sovelluksen käyttäminen näyttää tältä:

<img class="screenshot" src="../assets/osa-3/visitors.png">

### Tiedostojen lisääminen repositorioon

Koska sovelluksen ensimmäinen versio toimii, nyt on hyvä hetki lisätä sovelluksen tiedostot repositorioon. Hyödyllinen komento on `git status`, joka näyttää repositorion tilanteen. Komento antaa nyt seuraavan tuloksen:

```prompt
(venv) $ git status
On branch main
Your branch is up to date with 'origin/main'.

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

Tärkeä asia versionhallinnassa on päättää, mitkä tiedostot laitetaan repositorioon kaikkien saataville. Tässä tapauksessa repositorioon kuuluvat `app.py` ja `templates`, jotka muodostavat sovelluksen toteutuksen. Sen sijaan `.env`, `__pycache__` ja `venv` eivät kuulu repositorioon, koska ne liittyvät sovelluksen kehittäjän ympäristöön eivätkä sovelluksen toteutukseen.

Komento `git add` laittaa tiedostoja lisättäväksi:

```prompt
(venv) $ git add app.py
(venv) $ git add templates
```

Nyt `git status` näyttää muuttuneen tilanteen näin:

```prompt
(venv) $ git status
On branch main
Your branch is up to date with 'origin/main'.

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

```prompt
(venv) $ git commit -m "Create first version"
(venv) $ git push
```

Tämän seurauksena sovelluksen nykyinen versio on tallessa GitHubissa.

### Tiedosto .gitignore

Tiedosto `.env` ja hakemistot `__pycache__` ja `venv` eivät siis kuulu repositorioon, mutta ne näkyvät häiritsevästi listassa aina, kun suoritamme komennon `git status`.

Hyödyllinen tiedosto on `.gitignore`, joka määrittää, mitä tiedostoja ja hakemistoja _emme_ halua viedä repositorioon. Tässä tapauksessa tiedoston sisältö voisi olla:

```
.env
__pycache__
venv
```

Tämän tiedoston luomisen jälkeen `git status` alkaa näyttää siistimmältä:

```prompt
(venv) $ git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	.gitignore

nothing added to commit but untracked files present (use "git add" to track)
```

Tiedosto `.gitignore` kuitenkin lisätään repositorioon:

```prompt
(venv) $ git add .gitignore 
(venv) $ git commit -m "Add .gitignore"
(venv) $ git push
```

Tästä lähtien tiedostossa `.gitignore` mainitut tiedostot ja hakemistot eivät ole ehdolla repositorioon lisättäväksi. Projektin kehityksen aikana tiedostoon `.gitignore` voi lisätä tarvittaessa lisää sisältöä.

### Sovelluksen riippuvuudet

Komento `pip freeze` kertoo, mitkä ovat sovelluksen _riippuvuudet_  eli mitä kirjastoja sovellus tarvitsee toimiakseen. Kun suoritamme komennon nyt, saamme seuraavan tuloksen:

```prompt
(venv) $ pip freeze
click==7.1.2
Flask==1.1.2
Flask-SQLAlchemy==2.4.4
itsdangerous==1.1.0
Jinja2==2.11.3
MarkupSafe==1.1.1
pkg-resources==0.0.0
psycopg2==2.8.6
python-dotenv==0.15.0
SQLAlchemy==1.3.23
Werkzeug==1.0.1
```

Tämä lista kertoo jokaisesta kirjastosta, minkä kirjaston version sovellus vaatii. Huomaa, että jos suoritat komennon itse, voit saada vähän eri versioita.

Sovelluksen riippuvuuksista on tapana tehdä tiedosto `requirements.txt`. Tämä tiedosto tallennetaan repositorioon:

```prompt
(venv) $ pip freeze > requirements.txt
(venv) $ git add requirements.txt 
(venv) $ git commit -m "Add requirements"
(venv) $ git push
```

Nyt jos toinen henkilö hakee sovelluksen GitHubista, hän voi asentaa virtuaaliympäristöönsä tarvittavat kirjastot seuraavalla komennolla:

```prompt
(venv) $ pip install -r requirements.txt
```

### Tietokannan rakenne

Repositoriosta puuttuu vielä tieto siitä, mikä on sovelluksen käyttämän tietokannan rakenne. Tätä varten luomme tiedoston `schema.sql`, joka sisältää tietokannan skeeman. Tässä sovelluksessa tietokannassa on vain yksi taulu ja tiedoston sisältö on seuraava:

```sql
CREATE TABLE visitors (id SERIAL PRIMARY KEY, time TIMESTAMP);
```

Lisäämme uuden tiedoston repositorioon:

```prompt
(venv) $ git add schema.sql 
(venv) $ git commit -m "Add SQL schema"
(venv) $ git push
```

Tästä lähtien sovelluksen tarvitsemat taulut voi luoda tietokantaan seuraavasti ohjaamalla tiedostossa `schema.sql` olevat komennot PostgreSQL-tulkille:

```prompt
(venv) $ psql < schema.sql
```

Huomaa, että aina kun sovelluksen tietokannan rakenne muuttuu, myös tiedostosta `schema.sql` täytyy tehdä uusi versio ja lähettää se repositorioon. Tämän avulla repositoriossa on aina tieto siitä, millainen on sovelluksen senhetkinen tietokanta.
