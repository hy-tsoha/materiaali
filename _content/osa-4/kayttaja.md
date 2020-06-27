## Oikeudet ja syötteet

Kun web-sovellus saa käyttäjältä sivupyynnön, sovelluksen tulee tarkastaa ennen toiminnon suorittamista kaksi asiaa: (1) käyttäjällä on riittävät oikeudet toiminnon suorittamiseen ja (2) käyttäjän antama syöte (kuten lomakkeen kautta lähetetyt tiedot) on kelvollinen.

Vaikka sovelluksen linkit ja lomakkeet ohjaisivat käyttäjää toimimaan tietyllä tavalla, ei voi luottaa, että näin tapahtuisi, koska web-tekniikkaa tunteva käyttäjä voi lähettää mitä tahansa sivupyyntöjä palvelimelle. Niinpä sovelluksen tulee aina varautua pahimpaan: vastassa on pahantahtoinen käyttäjä, joka koettaa aiheuttaa vahinkoa sovellukselle.

### Käyttäjän oikeudet

Tarkastellaan sovellusta, jossa käyttäjä voi luoda profiilin ja ystävystyä muiden kanssa. Käyttäjä voi katsoa oman profiilinsa ja lisäksi toisen käyttäjän profiilin, jos käyttäjät ovat ystäviä. Lisäksi admin-käyttäjä voi katsoa kenen tahansa profiilin.

Oletetaan, että sivu `profile/id` näyttää käyttäjän profiilin. Esimerkiksi jos käyttäjän id-numero on 123, sivu `profile/123` näyttää profiilin. Koska käyttäjä voi kokeilla antaa sivulle minkä tahansa id-numeron, ennen profiilin näyttämistä täytyy tarkastaa huolellisesti, että käyttäjällä on todella oikeus nähdä profiili.

Seuraava koodi tarkastaa, että käyttäjä saa nähdä profiilin:

```python
@app.route("/profile/<int:id>")
def profile(id):
    allow = False
    if is_admin():
        allow = True
    elif is_user() and my_id() == id:
        allow = True
    elif is_user():
        sql = "SELECT 1 FROM friends WHERE user1=:user1 AND user2=:user2"
        result = db.session.execute(sql, {"user1":my_id(), "user2":id})
        if result.fetchone() != None:
            allow = True
    if not allow:
        # don't show the profile
    ...
```

Ideana on, että muuttuja `allow` ilmaisee, saako käyttäjä nähdä sivua. Funktiot `is_admin` ja `is_user` tarkastavat, onko käyttäjä admin-käyttäjä tai kirjautunut käyttäjä, ja funktio `my_id` antaa käyttäjän id-numeron. Käyttäjä saa nähdä profiilin, jos hän on admin-käyttäjä, katsoo omaa profiiliaan tai katsoo jonkun ystävänsä profiilia.

Huomaa koodissa käytetty näppärä tapa tarkastaa SQL-kyselyllä, onko taulussa tiettyä riviä. Jos taulussa on rivi, kyselyn tulostaulussa on yksi rivi, jossa on arvo 1. Jos taas taulussa ei ole riviä, kyselyn tulostaulu on tyhjä.

Jos käyttäjällä ei ole oikeutta nähdä sivua, käyttäjän voi ohjata virhesivulle tähän tapaan:

```python
    if not allow:
        return redirect("/error")
```

Toinen mahdollisuus on keskeyttää sivun muodostaminen ja antaa sopiva HTTP-virhekoodi. Esimerkiksi koodi 403 tarkoittaa "Forbidden":

```python
    if not allow:
        abort(403) # Forbidden
```

Tässä tapauksessa ylempi tapa on parempi, koska tässä kyseessä ei ole välttämättä murtautumisyritys vaan käyttäjä voi olla väärällä sivulla myös sen vuoksi, että hänen kirjautumisensa on vanhentunut. On parempi näyttää käyttäjälle virhesivu, jossa voi myös tarjota mahdollisuutta kirjautua sisään uudestaan.

### Syöte lomakkeesta

Käyttäjä voi koettaa antaa lomakkeen kautta mitä tahansa tietoa, joten sovelluksen tulee tarkastaa ennen toiminnon toteuttamista, että tieto on kelvollista. Tyypillinen tarkastettava asia on syötteen pituus: ei ole esimerkiksi hyvä, jos käyttäjä pystyy lähettämään keskustelualueelle viestin, jonka otsikossa on miljoona merkkiä.

Hyvä tapa on tarkastaa tiedot kahdesti: ensin selaimessa JavaScriptin avulla ja sitten vielä uudestaan palvelimella. Selaimessa käyttäjälle voidaan antaa virheilmoitus ennen lomakkeen lähettämistä palvelimelle, jolloin käyttäjä voi korjata tietoja. Toinen tarkastus palvelimella on tarpeen sen vuoksi, että JavaScriptillä tehty tarkastus ei ole luotettava, koska käyttäjä voi kiertää sen esimerkiksi kytkemällä JavaScriptin pois käytöstä selaimen asetuksista.

Tarkastellaan esimerkkinä seuraavaa lomaketta, jonka kautta käyttäjä pystyy lähettämään viestin keskustelualueelle:

```html
<form action="/send" method="post">
Otsikko: <input type="text" name="title">
Viesti: <textarea name="message"></textarea>
<input type="submit" value="Lähetä">
</form>
```

Tässä tapauksessa voisi olla järkevää rajoittaa viestin lähetystä niin, että otsikossa saa olla enintään 100 merkkiä ja viestissä saa olla enintään 5000 merkkiä. Nämä tarkastukset voidaan toteuttaa selaimessa JavaScriptin avulla näin:

```html
<form action="/send" method="post" onsubmit="return check(this)">
Otsikko: <input type="text" name="title">
Viesti: <textarea name="message"></textarea>
<input type="submit" value="Lähetä">
</form>

<script>
function check(form) {
    if (form.title.value.length > 100) {
        alert("Otsikko on liian pitkä!");
        return false;
    }
    if (form.message.value.length > 5000) {
        alert("Viestin sisältö on liian pitkä!");
        return false;
    }
    return true;
}
</script>
```

Tässä funktio `check` tarkastaa ennen lomakkeen lähettämistä, että sen sisältö on kunnossa. Funktion paluuarvo ilmaisee, lähetetäänkö lomake vai ei. Jos lomakkeen kentissä on liikaa tekstiä, käyttäjä saa tästä ilmoituksen eikä lomaketta lähetetä. Esimerkiksi jos otsikko on liian pitkä, käyttäjä saa seuraavan ilmoituksen:

TODO: Kuva tähän

Tämän lisäksi tarvitaan vielä tarkastus palvelimelle funktioon, joka käsittelee lomakkeen. Tarkastus voisi näyttää tältä:

```python
@app.route("/send", methods=["post"])
def send():
    title = request.form["title"]
    message = request.form["message"]
    if len(title) > 100 or len(message) > 5000:
        abort(400) # Bad Request
    ...
```

Tässä tapauksessa suorituksen keskeyttäminen ja HTTP-virhekoodin palauttaminen on perusteltu ratkaisu, koska jos tässä vaiheessa kentässä on liikaa tekstiä, käyttäjä selkeästi yrittää kiertää tarkastusta eikä kysymys voi olla vahingosta.

Huomaa, että käyttäjän syötteen muotoa ei yleensä kannata yrittää tarkastaa kovin tarkasti, koska tämä menee helposti pieleen. Esimerkiksi verkko on täynnä virheellisiä sähköpostiosoitteen muodon tarkastajia, jotka hylkäävät toimivia osoitteita. Toisaalta käyttäjä voi aina halutessaan antaa keksittyä tietoa, kuten sähköpostiosoitteen `lol@mikkihiiri.fi`, joka menee läpi kaikista tarkastuksista.
