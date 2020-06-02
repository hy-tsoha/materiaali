## Ensimmäinen web-sovellus

Aloitamme ensimmäisen web-sovelluksen tekemisen luomalla sovellusta varten hakemiston `ekasovellus` ja siirtymällä sinne:

```bash
$ mkdir ekasovellus
$ cd ekasovellus
```

Jotta voimme kätevästi hallinnoida sovelluksen tarvitsemia kirjastoja, luomme hakemistoon Pythonin virtuaaliympäristön seuraavalla komennolla:

```bash
$ python3 -m venv venv
```

Tämä komento luo hakemiston `venv`, jonka sisällä on Pythonin suoritusympäristö sovellusta varten. Saamme virtuaaliympäristön käyntiin suorittamalla aktivointikomennon näin:

```bash
$ source venv/bin/activate
```

Tämän seurauksena komentorivin alkuun ilmestyy tunnus `(venv)` merkkinä siitä, että olemme virtuaaliympäristössä. Asennamme ensin `flask`-kirjaston:

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

Sovellus sulkeutuu painamalla Control+C komentorivillä. Lopuksi voimme poistua virtuaaliympäristöstä näin:

```bash
(venv) $ deactivate
```

### Sivujen tuottaminen

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

Koska funktio luo sivun sisällön, voimme käyttää tässä mitä tahansa ohjelmoinnin keinoja. Esimerkiksi seuraava funktio tuottaa sivun, jossa on luvut 1–100:

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

### HTML ja sivupohjat

Tähän mennessä olemme tuottaneet sivuja, joissa on pelkkää tekstiä,
mutta tarkemmin ottaen voimme käyttää sivuilla HTML-koodia. HTML on kieli, jolla määritellään nettisivun sisältö. Jos HTML ei ole sinulle ennestään tuttu, voit tutustua siihen [tästä](TODO).

Esimerkiksi seuraava funktio käyttää HTML-komentoja:

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
<html>
<head>
<title>Etusivu</title>
</head>
<body>
<h1>Etusivu</h1>
<b>Tervetuloa</b> <i>sovellukseen</i>!
</body>
</html>
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

Sovelluksen etusivu näyttää nyt tältä:

TODO: Kuva tähän