## Hakutoiminto

Perinteinen periaate web-sovelluksissa on, että `get`-metodia käyttävä sivupyyntö _hakee_ tietokannasta tietoa (`SELECT`-komennoilla), kun taas `post`-metodia käyttävä sivupyyntö voi myös _muuttaa_ tietoa (`INSERT`-, `UPDATE`- ja `DELETE`-komennoilla). Toisin sanoen `get`-metodi ei muuta tietokannan _tilaa_, kun taas `post`-metodi voi muuttaa sitä.

Olemme tähän mennessä toteuttaneet kaikki lomakkeet `post`-metodilla, mikä on luontevaa, koska yleensä lomakkeen lähetys aiheuttaa muutoksia tietokannassa. Kuitenkin joskus on paikallaan `get`-metodia käyttävä lomake, joka ei muuta tietokantaa.

Tarkastellaan seuraavaksi tilannetta, jossa haluamme toteuttaa sovellukseen _hakutoiminnon_. Ideana on, että käyttäjä voi antaa lomakkeella hakusanan, minkä jälkeen sovellus etsii tietokannasta kaikki tähän täsmäävät rivit. Oletamme, että sovelluksessa on taulu `messages`:

```sql
CREATE TABLE messages (id SERIAL PRIMARY KEY, content TEXT);
```

Käyttäjä pystyy hakemaan tietoa seuraavan lomakkeen kautta, joka on määritelty muuten samaan tyyliin kuin aiemmin, mutta metodina on `get` eikä `post`:

```html
<form action="/result" method="get">
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
    return render_template("result.html",messages=messages)
```

Kun käytössä on `get`-metodi, lomakkeen sisältö välitetään sivun osoitteen mukana. Esimerkiksi kun käyttäjä hakee sanalla "kissa", sivun osoite on `/result?query=kissa`. Tämä tarkoittaa myös, että käyttäjä voi tehdä helposti hakuja myös ilman lomaketta muuttamalla osoitetta.

Lomakkeen käsittelyssä `get`-metodilla lähetetty tieto on saatavilla `request.args`-olion kautta. Yllä oleva koodi muodostaa SQL-kyselyn, jossa hakuehdossa on `LIKE`-operaattori eli riittää, että hakusana esiintyy jossain kohtaa viestin sisältöä. Esimerkiksi kun hakusana on `kissa`, ehdoksi tulee `content LIKE '%kissa%'`.

Koska kyseessä on `get`-metodi, lomakkeen käsittelijän alussa ei tarvitse ilmoittaa metodia, koska Flaskissa oletusmetodi on `get`. Silti voisimme halutessamme merkitä selkeyden vuoksi myös `get`-metodin samaan tapaan kuin ennen:

```python
@app.route("/result", methods=["get"])
def result():
    ...
```

Huomaa, että koska `get`-metodia käyttäessä lomakkeen tiedot välitetään sivun osoitteen kautta, tiedoista jää usein kopio välittäville palvelimille ja palvelinten lokitiedostoihin (ks. [RFC 7231, kohta 9.4](https://tools.ietf.org/html/rfc7231#section-9.4)). Lisäksi selain voi säilyttää `get`-pyyntöjen vastaukset välimuistissaan, mutta `post`-pyyntöjen vastauksia ei oletusarvoisesti säilytetä.