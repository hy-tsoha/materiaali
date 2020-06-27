## Lomakkeiden käsittely

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
{% raw %}Valitsit pizzan {{ pizza }}
<p>
Seuraavat lisät:
<ul>
{% for extra in extras %}
<li> {{ extra }}
{% endfor %}
</ul>
Erikoistoiveet: <br>
{{ message }}{% endraw %}
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

TODO: Kuva tähän