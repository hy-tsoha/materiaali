## Johdatus web-sovelluksiin

### Selain ja palvelin

Web-sovellusten toiminta perustuu HTTP-protokollaan, jossa selain lähettää palvelimelle pyyntöjä ja palvelin vastaa pyyntöihin. Selain voi pyytää palvelimelta esimerkiksi HTML-tiedoston, joka kuvaa nettisivun sisällön, ja näyttää sivun sitten käyttäjälle.

Esimerkiksi seuraavassa kuvassa selain pyytää HTML-tiedostoa `index.html`. Palvelin lähettää tiedoston sisällön HTTP-koodilla 200, mikä tarkoittaa, että pyyntö onnistui.

TODO: Kuva tähän

Perinteinen tapa toteuttaa nettisivusto on luoda HTML-tiedostot käsin ja sijoittaa ne palvelimella olevaan hakemistoon. Tämän rajoituksena on kuitenkin, että palvelimella olevat sivut ovat _staattisia_ eli aina kun käyttäjä lataa tietyn sivun, se näyttää samalta.

Tällä kurssilla opimme toteuttamaan web-sovelluksia, jotka luovat _dynaamisia_ sivuja tietokannan sisällön perusteella ja tallentavat käyttäjien antamaa tietoa tietokantaan. Tämä antaa valtavasti lisää mahdollisuuksia verrattuna staattisiin sivuihin.

### Ensimmäinen web-sovellus

Aloitamme ensimmäisen web-sovelluksen tekemisen luomalla sovellusta varten hakemiston `sovellus` ja siirtymällä sinne:

```bash
$ mkdir sovellus
$ cd sovellus
```

Jotta voimme kätevästi hallinnoida sovelluksen tarvitsemia kirjastoja, luomme hakemistoon Pythonin virtuaaliympäristön seuraavalla komennolla:

```bash
$ python3 -m venv venv
```

Tämä komento luo hakemiston `venv`, jonka sisällä on Pythonin suoritusympäristö sovellusta varten. Saamme virtuaaliympäristön käyntiin suorittamalla aktivointikomennon näin:

```bash
$ source venv/bin/activate
```

Tämän seurauksena komentorivin alkuun ilmestyy tunnus `(venv)` merkkinä siitä, että olemme virtuaaliympäristössä. 
Kun olemme virtuaaliympäristössä, voimme asentaa Python-kirjastoja paikallisesti niin, että ne ovat käytettävissä vain kyseisessä virtuaaliympäristössä emmekä tarvitse asennukseen pääkäyttäjän oikeuksia. Asennamme ensin `flask`-kirjaston:

```bash
(venv) $ pip install flask
```

Nyt meillä on pystyssä ympäristö, jossa voimme suorittaa web-sovelluksen. Tehdään testiksi yksinkertainen sovellus tiedostoon `app.py`:

```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def index():
    return "Heipparallaa!"
```

Sovelluksen ideana on, että se näyttää tekstin `"Heipparallaa!"`, kun menemme sovelluksen etusivulle. Saamme sovelluksen käyntiin näin:

```bash
(venv) $ flask run
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

Viimeisellä rivillä näkyy osoite, jonka kautta voimme käyttää sovellusta nettiselaimella. Kun menemme sivulle `http://127.0.0.1:5000/`, näemme sovelluksen:

TODO: Kuva tähän

Sovellus sulkeutuu painamalla Control+C komentorivillä, jolloin voimme tehdä jotain muuta komentorivillä tai käynnistää sovelluksen uudestaan.

Komento `deactivate` lopettaa virtuaaliympäristön käyttämisen ja palauttaa komentorivin takaisin tavalliseen tilaan:

```bash
(venv) $ deactivate
$ 
```

Huomaa, että tämän jälkeen emme voi enää käynnistää sovellusta, koska Flask-kirjasto on asennettu vain virtuaaliympäristöön.

### Sivujen reititys

Flask-kirjaston ideana on, että määrittelemme ohjelmassa funktioita, jotka käsittelevät sivupyyntöjä. Ennen funktion määrittelyä oleva dekoraattori `@app.route` ilmaisee, mikä on sivun osoite, ja funktio palauttaa merkkijonona sivun sisällön.

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

Tässä sovelluksessa on etusivu, kuten ennenkin, sekä kaksi muuta sivua, joiden osoitteet ovat `page1` ja `page2`. Voimme katsoa sivuja näin:

TODO: Kuva tähän

Huomaa, että sivun osoite ja funktion nimi ovat kaksi eri asiaa. Sivun osoite annetaan dekoraattorissa, jonka jälkeen tulee sivupyynnön käsittelevä funktio, jolla voi olla muu nimi. Kuitenkin usein toimiva käytäntö on, että sivun osoite ja funktion nimi ovat samat, kuten yllä olevassa koodissa `page1` ja `page2`.

Koska sivun sisältö luodaan Pythonilla, voimme käyttää sivun luomisessa mitä tahansa ohjelmoinnin keinoja. Esimerkiksi seuraava funktio tuottaa sivun, jossa on luvut 1–100:

```python
@app.route("/test")
def test():
    content = ""
    for i in range(1,101):
        content += str(i)+" "
    return content
```

Funktion tuloksena on seuraava sivu:

TODO: Kuva tähän

Voimme myös määritellä sivun osoitteen niin, että siinä on _parametri_. Esimerkiksi seuraava funktio käsittelee sivuja, joiden osoitteessa on `int`-tyyppinen parametri `id`:

```python
@app.route("/page/<int:id>")
def page(id):
    return "Tämä on sivu "+str(id)
```

Sivun osoitteessa annettu parametri välittyy funktiolle, joka voi käyttää sitä haluamallaan tavalla sivun luomisessa. Tässä tapauksessa funktio näyttää sivulla viestin "Tämä on sivu _id_", eli esimerkiksi osoitteessa `page/123` oleva sivu näyttää tältä:

TODO: Kuva tähän

### HTML ja sivupohjat

Tähän mennessä olemme tuottaneet sivuja, joissa on pelkkää tekstiä,
mutta tarkemmin ottaen voimme käyttää sivuilla HTML-koodia. HTML on kieli, jolla määritellään nettisivun sisältö. Jos HTML ei ole sinulle ennestään tuttu, voit tutustua siihen [tästä](TODO).

Esimerkiksi seuraava sivu käyttää HTML-komentoja:

```python
@app.route("/")
def index():
    return "<b>Tervetuloa</b> <i>sovellukseen</i>!"
```

Tässä tapauksessa sana "Tervetuloa" näkyy lihavoituna ja sana "sovellukseen" näkyy kursivoituna:

TODO: Kuva tähän

Periaatteessa voisimme luoda sovelluksen sivujen HTML:n suoraan funktioissa, mutta  tämä olisi vaivalloista, kun sivulla on enemmän sisältöä. Parempi tapa on määritellä _sivupohjia_, joita funktiot käyttävät. Sivupohjat tallennetaan `templates`-hakemistoon.

Luodaan testiksi sivupohja `index.html`:

```html
<title>Etusivu</title>
<h1>Etusivu</h1>
<p><b>Tervetuloa</b> <i>sovellukseen</i>!</p>
```

Jotta voimme käyttää sivupohjia, meidän täytyy ottaa mukaan sovellukseen funktio `render_template`:

```python
from flask import Flask, render_template
```

Tämän jälkeen saamme näytettyä sivupohjan sisällön näin:

```python
@app.route("/")
def index():
    return render_template("index.html")
```

Tämä tuottaa seuraavan sivun:

TODO: Kuva tähän

Flask käyttää sivupohjissa Jinja-skriptikieltä, jonka avulla sivupohjaan voi välittää tietoa Python-koodista. Seuraava sivupohja antaa näytteen asiasta:

```html
<title>Etusivu</title>
<h1>Etusivu</h1>
{% raw %}<p>{{ message }}</p>
<ul>
{% for item in items %}
<li> {{ item }}
{% endfor %}
</ul>{% endraw %}
```

Tässä sivun osaksi tulee parametrin `message` arvo sekä listan `list` alkiot HTML-listana. Voimme kutsua sivupohjaa vaikkapa näin:

```python
@app.route("/")
def index():
    words = ["apina","banaani","cembalo"]
    return render_template("index.html",message="Tervetuloa!",items=words)
```

Tämän seurauksena sivu näyttää tältä:

TODO: Kuva tähän

Näemme lisää esimerkkejä sivupohjien mahdollisuuksista myöhemmin materiaalissa.

### Staattiset tiedostot

Staattiset tiedostot ovat sivuston osana olevia tiedostoja, joita ei luoda ohjelmallisesti. Esimerkiksi tavallisia staattisia tiedostoja ovat sivulla olevat kuvat.

Flaskissa suositeltu paikka sijoittaa staattiset tiedostot on hakemisto `static`. Esimerkiksi seuraava HTML-koodi näyttää hakemistossa olevan kuvan `kuva.png`:

```html
<img src="/static/kuva.png">
```