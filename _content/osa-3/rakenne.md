## Sovelluksen rakenne

Pienen sovelluksen voi toteuttaa mainiosti yhtenä tiedostona `app.py`, joka käsittelee kaikki sivupyynnöt, mutta suuremmassa projektissa (kuten tällä kurssilla) koodi kannattaa jakaa sopivasti tiedostoihin ja funktioihin.

Flask mahdollistaa monia tapoja toteuttaa sovelluksen rakenne, ja tutustumme seuraavaksi yhteen tapaan kävijäsovelluksen yhteydessä. Huomaa, että todellisuudessa näin pientä sovellusta ei ehkä olisi järkeä jakaa osiin, vaan tämä on vain esimerkki.

Tärkein periaate sovelluksen rakenteen suunnittelussa on, että tiedostot ja funktiot antavat sovellukselle selkeän rakenteen ja sovellusta on mukavaa kehittää. Jos nämä vaatimukset eivät täyty, sovelluksen rakenne ei ole hyvä.

### Sovelluksen jakaminen osiin

Seuraavassa on mahdollinen tapa jakaa kävijäsovellus tiedostoiksi:

<p class="code-title">app.py</p>
```python
from flask import Flask

app = Flask(__name__)

import routes
```

Kuten ennenkin, sovelluksen päämoduuli on `app`, joka käynnistää sovelluksen. Koodi luo Flask-olion sekä ottaa lopuksi mukaan moduulin `routes`.

<p class="code-title">db.py</p>
```python
from app import app
from flask_sqlalchemy import SQLAlchemy
from os import getenv

app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
db = SQLAlchemy(app)
```

Moduuli `db` huolehtii tietokantaan liittyvistä asioista. Tässä sovelluksessa moduuli määrittää tietokannan osoitteen ja luo `db`-olion, jonka kautta tietokantaa voidaan käyttää.

<p class="code-title">routes.py</p>
```python
from app import app
import visits
from flask import render_template

@app.route("/")
def index():
    visits.add_visit()
    counter = visits.get_counter()
    return render_template("index.html", counter=counter)
```

Moduulin `routes` tehtävänä on käsitellä sivupyynnöt. Toisin kuin ennen, sivupyynnön käsittelijä ei suorita tietokantakomentoja vaan kutsuu moduulissa `visits` olevia funktioita.

<p class="code-title">visits.py</p>
```python
from db import db

def add_visit():
    db.session.execute("INSERT INTO visitors (time) VALUES (NOW())")
    db.session.commit()

def get_counter():
    result = db.session.execute("SELECT COUNT(*) FROM visitors")
    counter = result.fetchone()[0]
    return counter
```

Moduuli `visits` sisältää funktiot `add_visit` ja `get_counter`, joiden avulla sovelluksessa pystyy lisäämään tiedon vierailusta sekä hakemaan vierailujen määrän.

Tässä moduulit viittaavat toisiinsa muutamilla eri tavoilla. Periaatteena on, että kun moduuli tarvitsee toisessa moduulissa määriteltyä funktiota tai oliota, toinen moduuli otetaan mukaan `import`-rivillä. Huomaa, että moduulissa oleva koodi (kuten olioiden `app` ja `db` luominen) suoritetaan vain kerran, vaikka moduuli otetaan mukaan useita kertoja.

Tällainen rakenne sopii moneen sovellukseen: moduulit `app`, `db` ja `routes` muodostavat sovelluksen perustan ja tämän lisäksi on muita moduuleja, jotka toteuttavat sovelluksen toimintoja. Tässä esimerkissä moduuli `visits` toteuttaa käynteihin liittyvät toiminnot ja tämän moduulin funktioita on kätevä kutsua sivupyynnön käsittelijästä.

### Laajempi esimerkki

Seuraavassa on vielä laajempi esimerkki, joka kokoaa yhteen materiaalissa käsiteltyjä asioita. Sovelluksen aiheena on keskustelusivusto, jossa käyttäjä voi luoda tunnuksen ja lähettää viestejä. Kaikki viestit ovat samassa ketjussa aikajärjestyksessä.

TODO: Tästä olisi varmaan hyvä antaa GitHub-linkki ja käsitellä vain oleellisia kohtia materiaalissa.

Sovelluksen käyttäminen näyttää tältä:

TODO: Lisää kuva

Sovelluksen tietokanta muodostuu kahdesta taulusta:

```sql
CREATE TABLE messages (id SERIAL PRIMARY KEY, content TEXT, user_id INTEGER REFERENCES users, sent_at TIMESTAMP);
CREATE TABLE users (id SERIAL PRIMARY KEY, username TEXT UNIQUE, password TEXT);
```

Taulu `messages` sisältää jokaisen viestin sisällön, viittauksen lähettäjään ja lähetysajan. Taulu `users` puolestaan sisältää sivuston rekisteröityneet käyttäjät. Jokaisesta käyttäjästä tallennetaan yksilöllinen käyttäjätunnus sekä salasanan hajautusarvo.

Sovellus rakentuu seuraavista tiedostoista:

<p class="code-title">app.py</p>
```python
from flask import Flask
from os import getenv

app = Flask(__name__)
app.secret_key = getenv("SECRET_KEY")

import routes
```

Sovelluksen päämoduuli on `app`. Koska sovellus käyttää istuntoja, tarvitaan salainen avain, joka haetaan ympäristömuuttujasta `SECRET_KEY`.

<p class="code-title">db.py</p>
```python
from app import app
from flask_sqlalchemy import SQLAlchemy
from os import getenv

app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
db = SQLAlchemy(app)
```

Moduuli `db` huolehtii tietokantaolion luomisesta kuten edellisessä esimerkissä.

<p class="code-title">routes.py</p>
```python
from app import app
from flask import render_template, request, redirect
import messages, users

@app.route("/")
def index():
    list = messages.get_list()
    return render_template("index.html", count=len(list), messages=list)

@app.route("/new")
def new():
    return render_template("new.html")

@app.route("/send", methods=["POST"])
def send():
    content = request.form["content"]
    if messages.send(content):
        return redirect("/")
    else:
        return render_template("error.html",message="Viestin lähetys ei onnistunut")

@app.route("/login", methods=["GET","POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        if users.login(username,password):
            return redirect("/")
        else:
            return render_template("error.html",message="Väärä tunnus tai salasana")

@app.route("/logout")
def logout():
    users.logout()
    return redirect("/")

@app.route("/register", methods=["GET","POST"])
def register():
    if request.method == "GET":
        return render_template("register.html")
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        if users.register(username,password):
            return redirect("/")
        else:
            return render_template("error.html",message="Rekisteröinti ei onnistunut")
```

<p class="code-title">error.html</p>
```html
{% raw %}Virhe: {{ message }}{% endraw %}
```

<p class="code-title">index.html</p>
```html
{% raw %}Viestien määrä: {{ count }}
<hr>
{% for message in messages %}
<i>Viesti:</i> {{ message[0] }}
<p>
<i>Lähettäjä:</i> {{ message[1] }}
<p>
<i>Aika:</i> {{ message[2] }}
<hr>
{% endfor %}
{% if session.user_id %}
Olet kirjautunut sisään.
<a href="/new">Lähetä viesti</a> | <a href="/logout">Kirjaudu ulos</a>
{% else %}
<a href="/login">Kirjaudu sisään</a>
{% endif %}{% endraw %}
```

<p class="code-title">login.html</p>
```html
<form action="/login" method="POST">
Tunnus: <input type="text" name="username">
<p>
Salasana: <input type="password" name="password">
<p>
<input type="submit" value="Kirjaudu">
</form>
Jos sinulla ei ole tunnusta, voit luoda uuden tunnuksen <a href="/register">tästä</a>
```

<p class="code-title">new.html</p>
```html
<form action="/send" method="POST">
Viesti: <br>
<textarea name="content"></textarea>
<input type="submit" value="Lähetä">
</form>
```

<p class="code-title">register.html</p>
```html
<form action="/register" method="POST">
Tunnus: <input type="text" name="username">
<p>
Salasana: <input type="password" name="password">
<p>
<input type="submit" value="Luo tunnus">
</form>
```

Moduuli `routes` määrittelee sivupyyntöjen käsittelyn. Huomaa, että sivut `login` ja `register` ottavat vastaan kahdentyyppisiä sivunpyyntöjä. Jos kyseessä on `GET`-pyyntö, näytetään kirjautumis- tai rekisteröintisivu. Jos taas kyseessä on `POST`-pyyntö, toteutetaan kirjautuminen tai rekisteröityminen.

<p class="code-title">messages.py</p>
```python
from db import db
import users

def get_list():
    sql = "SELECT M.content, U.username, M.sent_at FROM messages M, users U WHERE M.user_id=U.id ORDER BY M.id"
    result = db.session.execute(sql)
    return result.fetchall()

def send(content):
    user_id = users.user_id()
    if user_id == 0:
        return False
    sql = "INSERT INTO messages (content, user_id, sent_at) VALUES (:content, :user_id, NOW())"
    db.session.execute(sql, {"content":content, "user_id":user_id})
    db.session.commit()
    return True
```

Moduuli `messages` sisältää kaksi toimintoa: viestien hakemisen sekä uuden viestin lähettämisen. Jälkimmäisessä tapauksessa täytyy tarkastaa, että käyttäjä on kirjautunut sisään.

<p class="code-title">users.py</p>
```python
from db import db
from flask import session
import werkzeug.security

def login(username,password):
    sql = "SELECT password, id FROM users WHERE username=:username"
    result = db.session.execute(sql, {"username":username})
    user = result.fetchone()
    if user == None:
        return False
    else:
        if werkzeug.security.check_password_hash(user[0],password):
            session["user_id"] = user[1]
            return True
        else:
            return False

def logout():
    del session["user_id"]

def register(username,password):
    hash_value = werkzeug.security.generate_password_hash(password)
    try:
        sql = "INSERT INTO users (username,password) VALUES (:username,:password)"
        db.session.execute(sql, {"username":username,"password":hash_value})
        db.session.commit()
    except:
        return False
    return login(username,password)

def user_id():
    return session.get("user_id",0)
```

Moduuli `users` toteuttaa käyttäjien hallinnan. Kuten osan 2 esimerkissä, salasanat suojataan Werkzeug-kirjaston avulla.

Koska tietokannan taulussa `users` sarake `username` on uniikki, tietokantaan ei ole mahdollista lisätä kahta käyttäjää, joilla on sama tunnus. Tämä on hyvä tapa toteuttaa asia, koska tietokanta pitää tästä huolta automaattisesti. Jos käyttäjätunnus on olemassa, lisääminen aiheuttaa virheen, joka havaitaan sovelluksessa `try`/`except`-rakenteella.