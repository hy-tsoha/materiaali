## Sivupyynnöt

Flask-kirjaston ideana on, että määrittelemme ohjelmassa funktioita, jotka käsittelevät sivupyyntöjä. Ennen funktion määrittelyä oleva _dekoraattori_ `@app.route` ilmaisee, mikä on sivun osoite. Funktio palauttaa merkkijonon, jossa on sivun sisältö.

Esimerkiksi voisimme laajentaa sovellusta niin, että siinä on kolme sivua:

```python
@app.route("/")
def index():
    return "Heipparallaa!"

@app.route("/page1")
def page1():
    return "Tämä on sivu 1"

@app.route("/page2")
def page2():
    return "Tämä on sivu 2"
```

Tässä sovelluksessa on etusivu, kuten ennenkin, sekä kaksi muuta sivua, joiden osoitteet ovat `page1` ja `page2`. Uudet sivut näyttävät tältä:

<img class="screenshot" src="../assets/osa-1/page1.png">

<img class="screenshot" src="../assets/osa-1/page2.png">

Huomaa, että sivun osoite ja funktion nimi ovat kaksi eri asiaa. Sivun osoite annetaan dekoraattorissa, jonka jälkeen tulee sivupyynnön käsittelevä funktio, jolla voi olla muu nimi. Kuitenkin usein toimiva käytäntö on, että sivun osoite ja funktion nimi ovat samat, kuten yllä olevassa koodissa `page1` ja `page2`.

Koska sivun sisältö luodaan Pythonilla, voimme käyttää sivun luomisessa mitä tahansa ohjelmoinnin keinoja. Esimerkiksi seuraava funktio tuottaa sivun, jossa on luvut 1–100:

```python
@app.route("/test")
def test():
    content = ""
    for i in range(100):
        content += str(i + 1) + " "
    return content
```

Funktion tuloksena on seuraava sivu:

<img class="screenshot" src="../assets/osa-1/test.png">

Voimme myös määritellä sivun osoitteen niin, että siinä on _parametri_. Esimerkiksi seuraava funktio käsittelee sivuja, joiden osoitteessa on `int`-tyyppinen parametri `id`:

```python
@app.route("/page/<int:id>")
def page(id):
    return "Tämä on sivu " + str(id)
```

Sivun osoitteessa annettu parametri välittyy funktiolle, joka voi käyttää sitä haluamallaan tavalla sivun luomisessa. Tässä tapauksessa funktio näyttää sivulla viestin "Tämä on sivu _id_", eli esimerkiksi osoitteessa `page/123` oleva sivu näyttää tältä:

<img class="screenshot" src="../assets/osa-1/page123.png">

### HTML ja sivupohjat

Tähän mennessä olemme tuottaneet sivuja, joissa on pelkkää tekstiä,
mutta tarkemmin ottaen voimme käyttää sivuilla HTML-koodia. HTML on kieli, jolla määritellään nettisivun sisältö. Kurssin taustamateriaalissa on [HTML-opas]({% link _pages/html_opas.md %}), joka käsittelee HTML:n perusteet.

Esimerkiksi seuraava sivu käyttää HTML-komentoja:

```python
@app.route("/")
def index():
    return "<b>Tervetuloa</b> <i>sovellukseen</i>!"
```

Tässä tapauksessa sana "Tervetuloa" näkyy lihavoituna ja sana "sovellukseen" näkyy kursivoituna:

<img class="screenshot" src="../assets/osa-1/html.png">

Periaatteessa voisimme luoda sovelluksen sivujen HTML:n suoraan funktioissa, mutta  tämä olisi vaivalloista, kun sivulla on enemmän sisältöä. Parempi tapa on määritellä _sivupohjia_, joita funktiot käyttävät. Sivupohjat tallennetaan `templates`-hakemistoon.

Luodaan testiksi sivupohja `index.html`:

```html
<title>Etusivu</title>
<h1>Etusivu</h1>
<b>Tervetuloa</b> <i>sovellukseen</i>!
```

Tämän jälkeen saamme näytettyä sivupohjan sisällön etusivulla näin:

```python
from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")
```

Funktio `render_template` lukee sivupohjan annetusta tiedostosta ja palauttaa sen sivun sisältönä. Jotta funktiota voi käyttää, se tulee ottaa mukaan `import`-rivillä. Flask-kirjastossa on monia muitakin funktioita ja olioita, joihin tutustumme pikkuhiljaa materiaalissa.

Yllä oleva esimerkki tuottaa seuraavan sivun:

<img class="screenshot" src="../assets/osa-1/template.png">

Flask käyttää sivujen luomisessa Jinja-sivupohjia, minkä avulla sivun osaksi voi välittää tietoa Python-koodista. Seuraava esimerkki antaa näytteen asiasta:

```jinja
<title>Etusivu</title>
<h1>Etusivu</h1>
{% raw %}<p>{{ message }}</p>
<ul>
{% for item in items %}
<li> {{ item }}
{% endfor %}
</ul>{% endraw %}
```

Tässä sivun osaksi tulee parametrin `message` määrittämä viesti sekä listan `items` alkiot HTML-listana. Voimme kutsua sivupohjaa vaikkapa näin:

```python
@app.route("/")
def index():
    words = ["apina", "banaani", "cembalo"]
    return render_template("index.html", message="Tervetuloa!", items=words)
```

Tämän seurauksena sivu näyttää tältä:

<img class="screenshot" src="../assets/osa-1/jinja.png">

### Staattiset tiedostot

Staattiset tiedostot ovat sivuston osana olevia tiedostoja, joita ei luoda ohjelmallisesti. Tavallisia staattisia tiedostoja ovat sivustolla olevat kuvat.

Flaskissa suositeltu paikka sijoittaa staattiset tiedostot on hakemisto `static`. Esimerkiksi seuraava HTML-koodi näyttää hakemistossa olevan kuvan `kuva.png`:

```html
<img src="/static/kuva.png">
```

Huomaa, että tiedoston polun alussa on merkki `/`, mikä tarkoittaa, että tiedostoon viitataan sovelluksen hakemiston juuresta alkaen. Tämä on hyvä tapa toteuttaa viittaus niin, että se toimii luotettavasti sovelluksen eri sivuilla.
