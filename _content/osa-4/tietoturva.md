## Tietoturva

### SQL-injektio

SQL-injektio on tietoturvaongelma, joka syntyy siitä, että SQL-komennon osaksi laitetaan käyttäjän syöte yhdistämällä merkkijonoja. Tarkastellaan esimerkkinä seuraavaa koodia, jonka tarkoituksena on päivittää käyttäjän sähköpostiosoite:

```python
@app.route("/update", methods=["post"])
def update():
    check_user()
    user_id = session["user_id"]
    email = request.form["email"]
    sql = "UPDATE users SET email='"+email+"' WHERE id="+str(user_id)
    db.session.execute(sql)
    ...
```

Yllä olevassa koodissa on SQL-injektio, koska käyttäjän antama syöte liitetään suoraan SQL-komennon osaksi ja käyttäjä voi muuttaa tämän avulla SQL-komennon rakennetta. Esimerkiksi käyttäjä voi antaa sähköpostiosoitteeksi `', status='admin`, jolloin komennosta tulee seuraavanlainen (olettaen, että käyttäjän id-numero on 123):

```sql
UPDATE users SET email='', status='admin' WHERE id=123
```

Tämä komento muuttaa käyttäjän sähköpostiosoitteen tyhjäksi ja antaa hänelle admin-oikeudet, eli käyttäjä pystyy muuttamaan itsensä adminiksi, vaikka tarkoituksena olisi vain pystyä muuttamaan sähköpostiosoitetta. Vastaavasti `SELECT`-kyselyissä SQL-injektion avulla voi hakea tietoa, jota käyttäjän ei pitäisi pystyä saamaan.

Tehokas tapa estää SQL-injektio on yhdistää syötteet SQL-komentoihin parametrien avulla, kuten olemme tehneet kaikissa kurssin esimerkeissä. Voimme poistaa SQL-injektion yllä olevasta koodista muuttamalla koodia näin:

```python
@app.route("/update", methods=["post"])
def update():
    check_user()
    user_id = session["user_id"]
    email = request.form["email"]
    sql = "UPDATE users SET email=:email WHERE id=:user_id"
    db.session.execute(sql, {"email":email, "user_id":user_id})
    ...
```

Tämän ansiosta muuttujan `email` sisältö ei voi sotkea SQL-komennon rakennetta. Jos muuttujan osana on heittomerkki `'`, se muuttuu automaattisesti muotoon `\'`, jolloin aiempi yritys tuottaa seuraavan SQL-komennon:

```sql
UPDATE users SET email='\', status=\'admin' WHERE id=123
```

Tämä komento muuttaa vain saraketta `email` eikä aiheuta tietoturvaongelmaa.

### XSS-haavoittuvuus

XSS-haavoittuvuus perustuu siihen, että käyttäjän antama syöte yhdistetään sellaisenaan sivun HTML-koodiin, jolloin käyttäjä pystyy vaikuttamaan sivun toimintaan selaimessa antamalla syötteen, jossa on HTML-koodia.

Seuraavassa on esimerkki koodista, jossa on XSS-haavoittuvuus:

```python
@app.route("/result", methods=["post"])
def result():
    name = request.form["name"]
    return "Moikka, "+name
```

Tässä käyttäjä antaa nimensä lomakkeen kautta ja sivu näyttää viestin "Moikka, _nimi_". Sivu toimii odotusten mukaisesti, jos käyttäjä antaa nimensä:

TODO: Kuva tähän

Kuitenkin käyttäjä voi antaa nimen sijasta myös merkkijonon, jossa on HTML-koodia. Esimerkiksi jos nimenä on `<h1>LOL</h1>`, sivu näyttää tältä:

TODO: Kuva tähän

Lisäksi käyttäjä voi antaa JavaScript-koodia, joka myös suoritetaan selaimessa. Esimerkiksi jos nimenä on `<script>alert("Sivu on hakkeroitu!")</script>`, sivu näyttää tältä:

TODO: Kuva tähän

Tässä tapauksessa XSS-haavoittuvuus ei ole vielä vaarallinen, koska käyttäjä voi muuttaa vain itselleen näkyvää sivua. Kuitenkin asiasta tulee ongelma, jos käyttäjän syöte tallennetaan tietokantaan ja se välittyy muille käyttäjille. Kiusanteon lisäksi JavaScriptin avulla voi tuottaa todellisia tietoturvaongelmia XSS-haavoittuvuuden kautta.

XSS-haavoittuvuuden pystyy estämään pitämällä huolta siitä, että käyttäjän antamia syötteitä ei näytetä koskaan sivulla sellaisenaan. Kun käytämme Flaskissa sivupohjia, tämä tapahtuu automaattisesti. Esimerkiksi seuraavassa koodissa ei ole XSS-haavoittuvuutta:

```python
@app.route("/result", methods=["post"])
def result():
    name = request.form["name"]
    return render_template("result.html",name=name)
```

Kun muuttuja `name` näytetään sivupohjassa, sen sisältöä muutetaan automaattisesti niin, että HTML-koodia ei suoriteta:

TODO: Kuva tähän

Käytännössä esimerkiksi merkit `<` ja `>` muuttuvat muotoon `&lt;` ja `&gt;`, jolloin selain näyttää nämä merkit sellaisenaan eikä tulkitse niitä HTML-tagien osiksi.

Jos emme käyttäisi sivupohjia, meidän tulisi muuttaa merkit jollain toisella tavalla. Esimerkiksi Werkzeug-kirjastossa on funktio `escape`, joka hoitaa tämän asian. Kuitenkin hyvä käytäntö on käyttää aina sivupohjia, jolloin XSS-haavoittuvuuden riski katoaa automaattisesti.

### CSRF-haavoittuvuus

CSRF-haavoittuvuus syntyy, kun web-sovellus ei varmista, että kirjautuneen käyttäjän tekemä sivupyyntö todella tulee käyttäjältä. Tarkastellaan esimerkkinä seuraavaa lomaketta, jonka kautta käyttäjä voi lähettää uuden viestin, ja sen käsittelijää:

```html
<form action="/send" method="post">
Uusi viesti:
<textarea name="message"></textarea>
<input type="submit" value="Lähetä">
</form>
```

```python
@app.route("/send", methods=["post"])
def send():
    check_user()
    user_id = session["user_id"]
    message = request.form["message"]
    sql = "INSERT INTO messages (user_id, message) VALUES (:user_id, :message)"
    db.session.execute(sql, {"user_id":user_id, "message":message})
    ...
```

Tässä lomakkeessa on CSRF-haavoittuvuus, koska hyökkääjä voi houkutella kirjautuneena olevan käyttäjän ulkopuoliselle sivulle, joka kutsuu taustalla sivua `send` käyttäjän tietämättä. Koska käyttäjä on kirjautuneena selaimessa, viestin lähetys menee läpi. Niinpä hyökkääjä voi lähettää käyttäjän nimissä minkä tahansa itse valitun viestin.

CSRF-haavoittuvuuden avulla hyökkääjä pystyy siis toimimaan käyttäjän nimissä sivustolla, olettaen että käyttäjä on kirjautunut sisään ja hyökkääjä on onnistunut houkuttelemaan hänet ulkoiselle hyökkääjän laatimalle sivulle.

CSRF-haavoittuvuuden pystyy estämään muuttamalla lomaketta niin, että sen osana on käyttäjän istuntoon liittyvä tieto, joka ei ole hyökkääjän tiedossa. Esimerkiksi kun käyttäjä kirjautuu sisään, sovellus voi lisätä istuntoon satunnaisen kentän `csrf_token`. Tässä on yksi tapa luoda kyseinen kenttä `urandom`-funktion avulla:

```python
    session["csrf_token"] = os.urandom(16).hex()
```

Tämän kentän sisältö laitetaan piilokentäksi lomakkeeseen:

```html
{% raw %}<form action="/send" method="post">
Uusi viesti:
<textarea name="message"></textarea>
<input type="submit" value="Lähetä">
<input type="hidden" name="csrf_token" value="{{ session.csrf_token }}">
</form>{% endraw %}
```

Sitten lomakkeen käsittelijä tarkastaa, että `csrf_token` on oikea:

```python
    if session["csrf_token"] != request.form["csrf_token"]:
        abort(403)
```

Tässä tapauksessa jos `csrf_token` on väärä, sivun käsittely katkeaa ja tuloksena on HTTP-virhekoodi 403 (Forbidden). Koska hyökkääjä ei tiedä, mikä `csrf_token` liittyy käyttäjän istuntoon, tämä estää tehokkaasti CSRF-haavoittuvuuden.

### Salasanat tietokannassa

Kun sovelluksessa on käyttäjiä ja salasanoja, salasanoja ei tule tallentaa tietokantaan sellaisenaan. Osassa 2 on esitetty turvallinen tapa tallentaa salasanat käyttäen Werkzeug-kirjaston työkaluja. Mutta miksi olisi ongelma tallentaa salasanat sellaisenaan?

Tässä on kyse siitä, että jos jostain syystä hyökkääjä pääsee käsiksi tietokannan sisältöön ja salasanat olisi tallennettu sellaisenaan, hyökkääjä saisi selville suoraan käyttäjien salasanat. Moni käyttää samoja tai samantapaisia salasanoja eri palveluissa, joten tästä voisi olla huomattava hyöty pahantahtoiselle hyökkääjälle.

Werkzeug-kirjasto käyttää `sha256`-hajautusfunktiota, joka laskee salasanan perusteella hajautusarvon. Tämän tavoitteena on _hidastaa_ hyökkääjän työtä: jos hyökkääjä haluaa selvittää alkuperäisen salasanan, hänen täytyy käytännössä kokeilla läpi suuri määrä mahdollisia salasanoja ja tarkastaa, antaako jokin niistä saman hajautusarvon. Jotta hyökkääjän työ olisi vaikeampaa, Werkzeug-kirjasto lisää salasanaan satunnaisen merkkijonon (_suolan_) ja suorittaa hajautusfunktiota suuren määrän kierroksia.

Huomaa, että jos hyökkääjä saa käsiinsä tietokannan sisällön, tilanne on jo erittäin paha eikä näin saisi päästä tapahtumaan. Kuitenkin tilanne olisi vielä pahempi, jos salasanat olisi tallennettu tietokantaan sellaisenaan. Toisaalta salasanan tallentaminen hajautusarvona ei auta asiaa, jos salasana on _huono_ eli helposti arvattava tai lyhyt. Tällöin hyökkääjä saa sen joka tapauksessa selville käymällä läpi raa'alla voimalla mahdollisia salasanoja. Käyttäjä on siis aina osittain vastuussa omasta tietoturvastaan.

Vaikka hyökkääjistä ei olisi huolta, ei silti olisi hyvä idea tallentaa salasanoja sellaisenaan, koska tietokannan ylläpitäjä voisi tahattomasti nähdä käyttäjien salasanoja.

### Muut salaiset tiedot

Web-sovelluksissa on usein muutakin salaista tietoa, kuten tietokannan salasana, Flaskissa istuntojen salainen avain jne. Näiden tietojen tulee olla turvallisessa paikassa palvelimella niin, että ulkopuoliset eivät pääse niihin käsiksi. Yksi turvallinen tapa on käyttää ympäristömuuttujia kurssin materiaalissa esitetyllä tavalla.

Huomaa, että salaista tietoa ei erityisesti saa laittaa GitHubiin tai muualle julkisesti. Tutkimalla GitHubin käyttäjien projekteja voi löytää paljon salaista tietoa, jonka ei kuuluisi olla siellä. Pidä huoli, että oma projektisi ei ole yksi niistä. Jos kuitenkin vahingossa laitat Githubiin tietoa jonka ei pitäisi päätyä sinne, niin huomioi että pelkkä tiedon poistaminen repositoriosta ei riitä, katso selitys esimerkiksi [täältä](https://blog.gitguardian.com/leaking-secrets-on-github-what-to-do/).
