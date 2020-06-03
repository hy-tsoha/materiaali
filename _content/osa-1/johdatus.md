## Johdatus web-sovelluksiin

### Selain ja palvelin

Web-sovellusten toiminta perustuu HTTP-protokollaan, jossa selain lähettää palvelimelle pyyntöjä ja palvelin vastaa pyyntöihin. Tyypillinen tilanne on, että selain pyytää palvelimella olevaa HTML-tiedostoa, jossa on nettisivun sisältö.

Esimerkiksi seuraavassa kuvassa selain pyytää tiedostoa `index.html`. Palvelin lähettää tiedoston sisällön koodilla 200, mikä tarkoittaa, että pyyntö onnistui.

TODO: Kuva tähän

Perinteinen tapa toteuttaa nettisivusto on luoda HTML-tiedostot käsin ja sijoittaa ne palvelimella olevaan hakemistoon. Tämän rajoituksena on kuitenkin, että palvelimella olevan sivu on staattinen eli samanlainen aina, kun käyttäjä lataa sen.

Tällä kurssilla opimme toteuttamaan web-sovelluksia, jotka luovat dynaamisia nettisivuja tietokannan sisällön perusteella ja tallentavat käyttäjien antamaa tietoa tietokantaan. Tämä antaa valtavasti lisää mahdollisuuksia verrattuna staattisiin nettisivuihin.

### Ensimmäinen web-sovellus

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

Voimme myös määritellä sivun osoitteen niin, että siinä on parametri. Esimerkiksi seuraava funktio käsittelee sivuja, joiden osoitteessa on `int`-tyyppinen parametri `id`:

```python
@app.route("/page/<int:id>")
def page(id):
    return "Tämä on sivu "+str(id)
```

Esimerkiksi osoitteessa `page/123` oleva sivu näyttää tältä:

TODO: Kuva tähän

Koska sivun sisältö luodaan Pythonilla, voimme käyttää tässä mitä tahansa ohjelmoinnin keinoja. Esimerkiksi seuraava funktio tuottaa sivun, jossa on luvut 1–100:

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

### Sivupohjat

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
<p><b>Tervetuloa</b> <i>sovellukseen</i>!</p>
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

Tämä tuottaa seuraavan sivun:

TODO: Kuva tähän

Flask käyttää sivupohjissa Jinja-skriptikieltä, jonka ansiosta sivupohjaan voi välittää tietoa Python-koodista. Seuraava sivupohja antaa näytteen asiasta:

```html
<html>
<head>
<title>Etusivu</title>
</head>
<body>
<h1>Etusivu</h1>
{% raw %}<p>{{ message }}</p>
<ul>
{% for item in items %}
<li> {{ item }}
{% endfor %}
</ul>{% endraw %}
</body>
</html>
```

Tässä sivun osaksi tulee parametrin `message` arvo sekä listana listalla `list` olevat alkiot. Voimme kutsua sivupohjaa vaikkapa näin:

```python
@app.route("/")
def index():
    words = ["apina","banaani","cembalo"]
    return render_template("index.html",message="Tervetuloa!",items=words)
```

Tämän seurauksena sivu näyttää tältä:

TODO: Kuva tähän

### Staattiset tiedostot

Staattiset tiedostot ovat sivun osana olevia tiedostoja, joita ei luoda ohjelmallisesti. Esimerkiksi tavallisia staattisia tiedostoja ovat sivulla olevat kuvat.

Flaskissa suositeltu paikka sijoitta staattiset tiedostot on hakemisto `static`. Esimerkiksi seuraava HTML-koodi näyttää hakemistossa olevan kuvan `kuva.png`:

```html
<img src="/static/kuva.png">
```

### Lomakkeet

Nettisivun käyttäjä pystyy lähettämään tietoa sovellukselle lomakkeiden kautta. Esimerkiksi seuraavalla sivulla `form.html` on lomake, joka kysyy käyttäjän nimeä:

```html
<form action="/result" method="get">
Anna nimesi:
<input type="text" name="name">
<br>
<input type="submit" value="Lähetä">
</form>
```

Tämä lomake lähettää tietoa sivulle `result` metodilla `get`. Lomakkeessa on tekstikenttä, jonka nimi on `name`, sekä lähetysnappi.

Sivu `result.html` puolestaan näyttää tervehdyksen lomakkeen perusteella:

```html
{% raw %}<p>Moikka, {{ name }}!</p>{% endraw %}
```

Jotta pääsemme käsiksi lomakkeen tietoihin, tarvitsemme `request`-olion:

```python
from flask import Flask, render_template, request
```

Tämän jälkeen saamme lomakkeen toimimaan näin:

```python
@app.route("/form")
def form():
    return render_template("form.html")

@app.route("/result")
def result():
    return render_template("result.html",name=request.args["name"])
```

Kun käytetään metodia `get`, lomakkeeseen annettu tieto välitetään sivun osoitteen mukana ja se on saatavilla `request.args`-rakenteessa. Lomake toimii käytännössä näin:

TODO: Kuva tähän

Huomaa, että jälkimmäisen sivun osoite on `result?name=Maija`, jossa näkyy parametrina lomakkeeseen annettu tieto.

Toinen tapa välittää tietoa lomakkeella on käyttää `post`-metodia, jolloin lomakkeen alkurivi näyttää tältä:

```html
<form action="/test" method="post">
```

Kun metodina on `post`, tietoa ei välitetä sivun osoitteessa vaan piilossa sivupyynnön mukana. Pystymme käsittelemään `post`-metodilla lähetetyn lomakkeen näin:

```python
@app.route("/result", methods=["post"])
def result():
    return render_template("result.html",name=request.form["name"])
```

Erona on, että lomakkeen metodi pitää ilmoittaa (oletuksena metodi on `get`) ja rakenteen `request.args` sijasta tiedot haetaan rakenteesta `request.form`.

Sivu toimii muuten samalla tavalla kuin ennenkin, mutta tietoa ei näy osoitteessa:

TODO: Kuva tähän

### HTTP-koodit

Jos sivupyyntö onnistuu, palvelin lähettää vastauksen HTTP-koodilla 200. Muita koodeja käytetään esimerkiksi virhetilanteista ilmoittamiseen.

Voimme keskeyttää sivun muodostamisen ja lähettää virhekoodin `abort`-funktiolla. Esimerkiksi seuraava koodi lähettää koodin 404, joka tarkoittaa puuttuvaa tiedostoa:

```python
from flask import Flask, abort
```

```python
@app.route("/test")
def test():
    abort(404)
```

Sivu voi näyttää selaimessa tältä:

TODO: Kuva tähän

Seuraava koodi puolestaan käsittelee lomakkeen niin, että jos nimi on Maija, käyttäjä näkee sivun `result`, mutta muuten sivun muodostaminen keskeytyy koodilla 403 (pääsy kielletty):

```python
@app.route("/result",methods=["post"])
def result():
    name = request.form["name"]
    if name == "Maija":
        return render_template("result.html",name=name)
    else:
        abort(403)
```

Sivu voi näyttää selaimessa tältä:

TODO: Kuva tähän
