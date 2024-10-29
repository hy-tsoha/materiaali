## Sovelluksen rakenne

Pienen sovelluksen voi toteuttaa mainiosti yhtenä tiedostona `app.py`, joka käsittelee kaikki sivupyynnöt, mutta suuremmassa projektissa (kuten tällä kurssilla) koodi kannattaa jakaa sopivasti moduuleihin ja funktioihin. Moduuli on tiedosto, jossa on Python-koodia ja jonka voi ottaa mukaan `import`-komennolla.

Flask mahdollistaa monia tapoja toteuttaa sovelluksen rakenne, ja tutustumme seuraavaksi yhteen tapaan kävijäsovelluksen yhteydessä. Huomaa, että todellisuudessa näin pientä sovellusta ei olisi järkeä jakaa osiin, vaan tämä on vain esimerkki.

Tärkein periaate sovelluksen rakenteen suunnittelussa on, että moduulit ja funktiot antavat sovellukselle selkeän rakenteen ja sovellusta on mukavaa kehittää. Jos nämä vaatimukset eivät täyty, sovelluksen rakenne ei ole hyvä.

Seuraavassa on mahdollinen tapa jakaa kävijäsovellus moduuleiksi:

**Moduuli `app`**

<p class="code-title">app.py</p>
```python
from flask import Flask

app = Flask(__name__)

import routes
```

Kuten ennenkin, sovelluksen päämoduuli on `app`, joka käynnistää sovelluksen. Koodi luo Flask-olion sekä ottaa lopuksi mukaan moduulin `routes`.

**Moduuli `db`**

<p class="code-title">db.py</p>
```python
from app import app
from flask_sqlalchemy import SQLAlchemy
from os import getenv

app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")
db = SQLAlchemy(app)
```

Moduuli `db` huolehtii tietokantaan liittyvistä asioista. Tässä sovelluksessa moduuli määrittää tietokannan osoitteen ja luo `db`-olion, jonka kautta tietokantaa voidaan käyttää.

**Moduuli `routes`**

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

**Moduuli `visits`**

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

***

Tässä moduulit viittaavat toisiinsa muutamilla eri tavoilla. Periaatteena on, että kun moduuli tarvitsee toisessa moduulissa määriteltyä funktiota tai oliota, toinen moduuli otetaan mukaan `import`-rivillä. Huomaa, että moduulissa oleva koodi (kuten olioiden `app` ja `db` luominen) suoritetaan vain kerran, vaikka moduuli otetaan mukaan useita kertoja.

Tällainen rakenne sopii moneen sovellukseen: moduulit `app`, `db` ja `routes` muodostavat sovelluksen perustan ja tämän lisäksi on muita moduuleja, jotka toteuttavat sovelluksen toimintoja. Tässä esimerkissä moduuli `visits` toteuttaa käynteihin liittyvät toiminnot ja tämän moduulin funktioita on kätevä kutsua sivupyynnön käsittelijästä. Jos sovelluksessa on paljon sivuja, voi olla myös paikallaan jakaa sivupyyntöjen käsittely useampaan moduuliin.

Sovelluksen kehittyessä kuuluu asiaan _refaktoroida_ sen koodia eli muuttaa tarvittaessa sovelluksen rakennetta. On hyvä aloittaa yksinkertaisesta rakenteesta ja tarvittaessa jakaa myöhemmin koodia osiin sen sijaan, että tekee sovellukselle heti aluksi "varmuuden vuoksi" monimutkaisen rakenteen.
