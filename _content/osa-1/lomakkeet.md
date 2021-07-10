## Lomakkeiden käsittely

_Lomake_ on HTML-sivun osa, jonka kautta käyttäjä pystyy lähettämään tietoa sovellukselle.

Tehdään ensimmäisenä esimerkkinä lomake, joka kysyy käyttäjältä nimeä. Määrittelemme lomakkeen seuraavasti sivupohjassa `form.html`:

```html
<form action="/result" method="POST">
Anna nimesi:
<input type="text" name="name">
<br>
<input type="submit" value="Lähetä">
</form>
```

Tämä lomake lähettää tietoa sivulle `result` metodilla `POST`. Lomakkeessa on tekstikenttä, jonka nimi on `name`, sekä lähetysnappi.

Tarkoituksena on, että kun käyttäjä lähettää lomakkeen, hän siirtyy toiselle sivulle, joka näyttää viestin nimen perusteella. Tässä on sivupohja `result.html` tätä sivua varten:

```jinja
{% raw %}Moikka, {{ name }}!{% endraw %}
```

Seuraava sovellus toteuttaa sivupohjien avulla sivut `form` ja `result`:

```python
from flask import Flask
from flask import render_template, request
app = Flask(__name__)

@app.route("/form")
def form():
    return render_template("form.html")

@app.route("/result", methods=["POST"])
def result():
    return render_template("result.html", name=request.form["name"])
```

Sivu `result` ottaa vastaan `POST`-metodilla lähetetyn lomakkeen, mikä näkyy dekoraattorin parametrissa `methods`. Lomakkeen kautta lähetetty tieto on saatavilla olion `request` kautta. Koska lomakkeen tekstikentän nimi on `name`, siihen viitataan `request.form["name"]`.

Lomakkeen käyttäminen voi näyttää tältä:

<img class="screenshot" src="../assets/osa-1/form.png">

<img class="screenshot" src="../assets/osa-1/result.png">

Metodi `POST` on yleisin tapa lomakkeen lähettämiseen, ja se soveltuu useimpiin tilanteisiin. Toinen tavallinen metodi on `GET`, johon palaamme myöhemmin.

### Lomakkeen elementit

Tavallisia lomakkeen elementtejä ovat tekstikentät ja valintaruudut. Jokainen elementti määritellään tietyllä tavalla HTML-koodissa ja sen kautta lähetettyyn tietoon pääsee käsiksi tietyllä tavalla `request`-olion kautta.

Tehdään seuraavaksi esimerkki, jossa käyttäjä voi tilata pizzan. Sivupohja `order.html` näyttää tilaukseen liittyvät valinnat:

```html
<form action="/result" method="POST">
Valitse pizza:
<p>
<input type="radio" name="pizza" value="1"> Frutti di Mare
<input type="radio" name="pizza" value="2"> Margherita
<input type="radio" name="pizza" value="3"> Quattro Formaggi
<input type="radio" name="pizza" value="4"> Quattro Stagioni
<p>
Valitse lisät:
<p>
<input type="checkbox" name="extra" value="A"> oregano
<input type="checkbox" name="extra" value="B"> valkosipuli
<p>
Erikoistoiveet: <br>
<textarea name="message" rows="3" cols="50"></textarea>
<p>
<input type="submit" value="Lähetä">
</form>
```

Elementtien `radio` ja `checkbox` erona on, että samannimisistä elementeistä vain yksi `radio` voi olla valittuna mutta yksi tai useampi `checkbox` voi olla valittuna.

Sivupohja `result.html` näyttää tilauksen tiedot lähetyksen jälkeen:

```jinja
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
from flask import Flask
from flask import render_template, request

app = Flask(__name__)

@app.route("/order")
def order():
    return render_template("order.html")

@app.route("/result", methods=["POST"])
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

<img class="screenshot" src="../assets/osa-1/pizza1.png">

<img class="screenshot" src="../assets/osa-1/pizza2.png">
