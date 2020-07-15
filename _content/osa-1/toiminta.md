## Sovelluksen toiminta

### Selain ja palvelin

Nyt kun meillä on perustiedot web-sovelluksen tekemisestä, on hyvä hetki katsoa vähän tarkemmin, mitä tapahtuu, kun sovellusta käytetään selaimessa. Tarkastellaan ensin yksinkertaista sovellusta, joka näyttää tekstin etusivulla:

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Heipparallaa!"
```

Selaimissa on kehittäjän työkaluja, joiden avulla voi tarkastella selaimen ja palvelimen välistä liikennettä. Esimerkiksi Chromessa painamalla F12 avautuu kehittäjän näkymä. Välilehti `Network` näyttää, miten selain viestii palvelimen kanssa:

TODO: Kuva tähän

Tässä selain lähetti palvelimelle HTTP-pyynnön, jonka osoite on `http://127.0.0.1:5000/` ja metodi on `GET`. Palvelin vastasi tähän koodilla 200, jonka merkitys on _OK_ eli pyyntö onnistui. Palvelin lähetti vastauksena 13 tavua tietoa eli tekstin "Heipparallaa!". Samaan aikaan sovellus tulosti komentoikkunaan rivin tietoa pyynnöstä:

```plaintext
127.0.0.1 - - [07/Jul/2020 15:56:54] "GET / HTTP/1.1" 200 -
```

Tarkastellaan sitten toista tilannetta, jossa lomake lähettää tietoa sivulle `result`:

```html
<form action="/result" method="POST">
Nimi: <input type="text" name="name">
<br>
<input type="submit" value="Lähetä">
</form>
```

Nyt sivupyyntö näyttää tältä:

TODO: Kuva tähän

Tästä näkee, miten käyttäjän lomakkeeseen kirjoittama tieto (tässä kentän `name` arvo) kulkee sivupyynnön mukana. Selain ei näytä tätä suoraan käyttäjälle, mutta asian pystyy havaitsemaan kehittäjän näkymästä.

### Sovelluksen toiminta

Kun Flask-sovellus käynnistetään komennolla `flask run`, sovellus suorittaa ensin alkutoimet ja jää sitten odottamaan käsiteltäviä sivupyyntöjä. Sovellus käsittelee jokaisen sivupyynnön omassa säikeessään erillään muista.

Huomaa, että jotkin asiat sovelluksessa ovat yhteisiä kaikille sivupyynnöille ja jotkin taas ovat sivupyyntökohtaisia. Esimerkiksi seuraavassa koodissa muuttuja `value` on globaali, joten muuttuja saa satunnaisen arvon sovelluksen käynnistyessä ja tämän jälkeen sama muuttujan arvo näkyy aina etusivun latautuessa.

```python
value = randint(1,100)

@app.route("/")
def index():
    return "Satunnainen luku: "+str(value)
```

Seuraavassa koodissa puolestaan muuttuja `value` saakin arvon paikallisesti sivupyynnön yhteydessä ja etusivun latautuessa näkyy vaihtuva satunnainen luku:

```python
@app.route("/")
def index():
    value = randint(1,100)
    return "Satunnainen luku: "+str(value)
```

Jotkin Flaskin sisäiset oliot _näyttävät_ globaaleilta mutta ovat todellisuudessa sivupyyntökohtaisia. Esimerkki tästä on olio `request`, joka sisältää sivupyynnön tietoja. Tämän olion kautta voi hakea esimerkiksi lomakkeen kautta lähetetyn kentän sisällön:

```python
@app.route("/result", methods=["POST"])
def result():
    name = request.form["name"]
    ...
```

Oliota `request` voidaan käyttää globaalin muuttujan tavoin, mutta se kuitenkin on sivupyyntökohtainen, koska muuten eri sivupyyntöjen tiedot menisivät sekaisin.