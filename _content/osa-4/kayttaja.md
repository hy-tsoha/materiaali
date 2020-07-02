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
        return render_templace("error.html",error="Ei oikeutta nähdä sivua")
    ...
```

Ideana on, että muuttuja `allow` ilmaisee, saako käyttäjä nähdä sivua. Funktiot `is_admin` ja `is_user` tarkastavat, onko käyttäjä admin-käyttäjä tai kirjautunut käyttäjä, ja funktio `my_id` antaa käyttäjän id-numeron. Käyttäjä saa nähdä profiilin, jos hän on admin-käyttäjä, katsoo omaa profiiliaan tai katsoo jonkun ystävänsä profiilia.

Huomaa koodissa käytetty näppärä tapa tarkastaa SQL-kyselyllä, onko taulussa tiettyä riviä. Jos taulussa on rivi, kyselyn tulostaulussa on yksi rivi, jossa on arvo 1. Jos taas taulussa ei ole riviä, kyselyn tulostaulu on tyhjä.

Jos käyttäjällä ei ole oikeutta nähdä sivua, käyttäjälle näytetään virhesivu sopivalla viestillä. Tällä sivulla käyttäjälle voi myös tarjota mahdollisuuden kirjautua sisään, koska virhe voi johtua siitä, että käyttäjällä olisi oikeus nähdä sivu mutta hän ei ole kirjautunut sisään.

### Syöte lomakkeesta

Käyttäjä voi koettaa antaa lomakkeen kautta mitä tahansa tietoa, joten sovelluksen tulee tarkastaa ennen toiminnon toteuttamista, että tieto on kelvollista.

Tarkastellaan esimerkkinä seuraavaa lomaketta, jonka kautta käyttäjä pystyy lähettämään uuden viestin keskustelualueelle:

```html
<form action="/send" method="post">
Otsikko: <input type="text" name="title">
Viesti: <textarea name="message"></textarea>
<input type="submit" value="Lähetä">
</form>
```

Tässä riskinä on, että käyttäjä syöttää lomakkeen kautta hyvin paljon tietoa. Esimerkiksi käyttäjä voi antaa viestille otsikon, jossa on miljoona merkkiä, mikä veisi paljon tilaa tietokannassa ja sotkisi sivuston ulkoasun. Niinpä lomakkeen käsittelijän tulee tarkastaa, että syötteet ovat järkevän pituisia. Voimme toteuttaa tämän tähän tapaan:

```python
@app.route("/send", methods=["post"])
def send():
    title = request.form["title"]
    message = request.form["message"]
    if len(title) > 100:
        return render_template("error.html", error="Otsikko on liian pitkä")
    if len(message) > 5000:
        return render_template("error.html", error="Viesti on liian pitkä")
```

Tässä viestin otsikko saa olla enintään 100 merkkiä ja sisältö saa olla enintään 5000 merkkiä. Jos nämä rajat ylittyvät, viestiä ei tallenneta vaan käyttäjä ohjataan virhesivulle.

Voimme vielä parantaa käyttökokemusta lisäämällä viestin lähetyssivulle JavaScript-koodin, joka tarkastaa lomakkeen sisällön selaimen puolella ennen lomakkeen lähettämistä:

```html
<form action="/send" method="post" onsubmit="return check(this)">
Otsikko: <input type="text" name="title">
Viesti: <textarea name="message"></textarea>
<input type="submit" value="Lähetä">
</form>

<script>
function check(form) {
    if (form.title.value.length > 100) {
        alert("Otsikko on liian pitkä");
        return false;
    }
    if (form.message.value.length > 5000) {
        alert("Viesti on liian pitkä");
        return false;
    }
    return true;
}
</script>
```

Nyt ilmoitus pituuden ylittymisestä tulee jo selaimen puolella:

TODO: Kuva tähän

Tarkastus JavaScriptillä ei ole kuitenkaan luotettava, koska käyttäjä saattaa esimerkiksi kytkeä JavaScriptin pois selaimen asetuksista. Niinpä joka tapauksessa tarkastus täytyy olla palvelimella lomakkeen käsittelijässä.

Huomaa, että käyttäjän syötteen muotoa ei yleensä kannata yrittää tarkastaa muilta osin kovin tarkasti, koska tämä menee helposti pieleen. Esimerkiksi verkko on täynnä virheellisiä sähköpostiosoitteen muodon tarkastajia, jotka hylkäävät toimivia osoitteita. Toisaalta käyttäjä voi aina halutessaan antaa keksittyä tietoa, kuten sähköpostiosoitteen `lol@mikkihiiri.fi`, joka menee läpi kaikista tarkastuksista.