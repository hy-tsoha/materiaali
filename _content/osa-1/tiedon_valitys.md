## Tiedon välittäminen

### Lomakkeet

Sivuston käyttäjä pystyy lähettämään tietoa sovellukselle lomakkeiden kautta. Tehdään ensimmäisenä esimerkkinä lomake, joka kysyy käyttäjältä nimeä. Lomake määritellään HTML-koodina sivupohjassa `form.html`:

```html
<form action="/result" method="post">
Anna nimesi:
<input type="text" name="name">
<br>
<input type="submit" value="Lähetä">
</form>
```

Tämä lomake lähettää tietoa sivulle `result` metodilla `post`. Lomakkeessa on tekstikenttä, jonka nimi on `name`, sekä lähetysnappi.

Tarkoituksena on, että kun käyttäjä lähettää lomakkeen, hän siirtyy toiselle sivulle, joka näyttää viestin nimen perusteella. Tässä on sivupohja `result.html` tätä sivua varten:

```html
{% raw %}<p>Moikka, {{ name }}!</p>{% endraw %}
```

Seuraava sovellus toteuttaa sivupohjien avulla sivut `form` ja `result`:

```python
from flask import Flask, render_template, request
app = Flask(__name__)

@app.route("/form")
def form():
    return render_template("form.html")

@app.route("/result", methods=["post"])
def result():
    return render_template("result.html",name=request.form["name"])
```

Sivu `result` ottaa vastaan `post`-metodilla lähetetyn lomakkeen, mikä näkyy dekoraattorin parametrissa `methods`. Lomakkeen kautta lähetetty tieto on saatavilla olion `request` kautta, joka täytyy ottaa mukaan `import`-osassa.

Lomakkeen käyttäminen voi näyttää tältä:

TODO: Kuva tähän

Metodi `post` on yleisin tapa lomakkeen lähettämiseen, ja se soveltuu useimpiin tilanteisiin. Toinen metodi on `get`, johon palaamme myöhemmin.

### Lomakkeen elementit

Tavallisia lomakkeen elementtejä ovat tekstikentät ja valintaruudut. Jokainen elementti määritellään tietyllä tavalla HTML-koodissa ja sen kautta lähetettyyn tietoon pääsee käsiksi tietyllä tavalla `request`-olion kautta.

Tehdään seuraavaksi esimerkki, jossa käyttäjä voi tilata pizzan. Sivupohja `order.html` näyttää tilaukseen liittyvät valinnat:

```html
<form action="/result" method="post">
Valitse pizza:
<p>
<input type="radio" name="pizza" value="1"> Frutti di Mare <br>
<input type="radio" name="pizza" value="2"> Margherita <br>
<input type="radio" name="pizza" value="3"> Quattro Formaggi <br>
<input type="radio" name="pizza" value="4"> Quattro Stagioni <br>
<p>
Valitse lisät:
<p>
<input type="checkbox" name="extra" value="A"> oregano <br>
<input type="checkbox" name="extra" value="B"> valkosipuli <br>
<p>
Erikoistoiveet: <br>
<textarea name="message" rows="5" cols="50"></textarea>
<p>
<input type="submit" value="Lähetä">
</form>
```

Elementtien `radio` ja `checkbox` erona on, että samannimisistä elementeistä vain yksi `radio` voi olla valittuna mutta yksi tai useampi `checkbox` voi olla valittuna.

Sivupohja `result.html` näyttää tilauksen tiedot lähetyksen jälkeen:

```html
Valitsit pizzan {{ pizza }}
<p>
Seuraavat lisät:
<ul>
{% for extra in extras %}
<li> {{ extra }}
{% endfor %}
</ul>
Erikoistoiveet: <br>
{{ message }}
```

Seuraava sovellus käsittelee lomakkeen kautta lähetetyt tiedot:

```python
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/order")
def order():
    return render_template("order.html")

@app.route("/result", methods=["post"])
def result():
    pizza = request.form["pizza"]
    extras = request.form.getlist("extra")
    message = request.form["message"]
    return render_template("result.html", pizza=pizza,
                                          extras=extras,
                                          message=message)
```

Koska `extra`-nimen alla voi olla useita valintoja, ne haetaan listana `getlist`-metodilla.

Lomakkeen käyttäminen voi näyttää tältä:

### Ohjaus toiselle sivulle

Seuraavassa on lomake, jonka kautta käyttäjä pystyy kirjautumaan sivustolle:

```html
<form action="/login" method="post">
Tunnus: <input type="text" name="username">
<p>
Salasana: <input type="password" name="password">
<p>
<input type="submit" value="Kirjaudu">
</form>
```

Toteutetaan kirjautumisen käsittely niin, että käyttäjä ohjataan salaiselle sivulle, jos hän antaa oikean tunnuksen ja salasanan, ja muuten virhesivulle. Ohjaus onnistuu näin:

```python
@app.route("/login",methods=["post"])
def login():
    username = request.form["username"]
    password = request.form["password"]
    if username == "maija" and password == "kissa":
        return redirect("/secret")
    else:
        return redirect("/error")
```

Tässä käytössä on `redirect`-olio, joka ohjaa pyynnön toiselle sivulle. Käyttäjä ohjataan joko sivulle `secret` tai `error` seuraavasti:

TODO: Kuva tähän

Kirjautuminen on kuitenkin vielä varsin alkeellinen: oikea tunnus ja salasana on kovakoodattu sovellukseen ja käyttäjä voi ohittaa kirjautumisen, jos hän tietää salaisen sivun osoitteen. Osassa 2 toteutamme kirjautumisen paremmin tietokannan avulla.

### Virhekoodit

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

Seuraava koodi toteuttaa kirjautumisen käsittelyn toisella tavalla niin, että jos tunnus tai salasana ei ole oikein, käyttäjä saa virhekoodin 403 (pääsy kielletty):

```python
@app.route("/login",methods=["post"])
def login():
    username = request.form["username"]
    password = request.form["password"]
    if username == "maija" and password == "kissa":
        return redirect("/secret")
    else:
        abort(403)
```

Sivu voi näyttää selaimessa tältä:

TODO: Kuva tähän

Tämä ei ole kuitenkaan mukava tapa viestiä käyttäjän kanssa, vaan on parempi ohjata käyttäjä omalle virhesivulle, josta pystyy koettamaan kirjautumista uudestaan.