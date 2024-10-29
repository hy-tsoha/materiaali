## Hakutoiminto

Perinteinen periaate web-sovelluksissa on, että `GET`-metodia käyttävä sivupyyntö _hakee_ tietokannasta tietoa (`SELECT`-komennoilla), kun taas `POST`-metodia käyttävä sivupyyntö voi myös _muuttaa_ tietoa (`INSERT`-, `UPDATE`- ja `DELETE`-komennoilla). Toisin sanoen `GET`-metodi ei muuta tietokannan _tilaa_, kun taas `POST`-metodi voi muuttaa sitä.

Olemme tähän mennessä toteuttaneet kaikki lomakkeet `POST`-metodilla, mikä on luontevaa, koska yleensä lomakkeen lähetys aiheuttaa muutoksia tietokannassa. Kuitenkin joskus on paikallaan `GET`-metodia käyttävä lomake, joka ei muuta tietokantaa.

Tarkastellaan seuraavaksi tilannetta, jossa haluamme toteuttaa sovellukseen _hakutoiminnon_. Ideana on, että käyttäjä voi antaa lomakkeella hakusanan, minkä jälkeen sovellus etsii tietokannasta kaikki tähän täsmäävät rivit. Oletamme, että sovelluksessa on taulu `messages`:

```sql
CREATE TABLE messages (id SERIAL PRIMARY KEY, content TEXT);
```

Käyttäjä pystyy hakemaan tietoa seuraavan lomakkeen kautta, joka on määritelty muuten samaan tyyliin kuin aiemmin, mutta metodina on `GET` eikä `POST`:

```html
<form action="/result" method="GET">
Hakusana: <input type="text" name="query">
<br>
<input type="submit" value="Lähetä">
</form>
```

Seuraava sivu käsittelee lomakkeen:

```python
@app.route("/result")
def result():
    query = request.args["query"]
    sql = "SELECT id, content FROM messages WHERE content LIKE :query"
    result = db.session.execute(sql, {"query":"%"+query+"%"})
    messages = result.fetchall()
    return render_template("result.html", messages=messages)
```

Kun käytössä on `GET`-metodi, lomakkeen sisältö välitetään sivun osoitteen mukana. Esimerkiksi kun käyttäjä hakee sanalla "kissa", sivun osoite on `/result?query=kissa`. Tämä tarkoittaa myös, että käyttäjä voi tehdä helposti hakuja myös ilman lomaketta muuttamalla osoitetta.

Lomakkeen käsittelyssä `GET`-metodilla lähetetty tieto on saatavilla `request.args`-olion kautta. Yllä oleva koodi muodostaa SQL-kyselyn, jossa hakuehdossa on `LIKE`-operaattori eli riittää, että hakusana esiintyy jossain kohtaa viestin sisältöä. Esimerkiksi kun hakusana on `kissa`, ehdoksi tulee `content LIKE '%kissa%'`.

Koska kyseessä on `GET`-metodi, lomakkeen käsittelijän alussa ei tarvitse ilmoittaa metodia, koska Flaskissa oletusmetodi on `GET`. Silti voisimme halutessamme merkitä selkeyden vuoksi myös `GET`-metodin samaan tapaan kuin ennen:

```python
@app.route("/result", methods=["GET"])
def result():
    ...
```

Huomaa, että on vain käytäntö, että `GET`-metodi ei muuta tietokannan sisältöä. Metodista riippumatta sivupyynnön käsittelijä voi suorittaa mitä tahansa SQL-komentoja.

Koska `GET`-metodia käyttäessä lomakkeen tiedot välitetään sivun osoitteen kautta, tiedoista jää kopioita palvelinten lokitiedostoihin. Lisäksi selain voi säilyttää `GET`-pyyntöjen vastaukset välimuistissaan, mutta `POST`-pyyntöjen vastauksia ei yleensä säilytetä.
