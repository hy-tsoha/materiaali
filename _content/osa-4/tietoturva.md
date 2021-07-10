## Tietoturva

### SQL-injektio

SQL-injektio on tietoturvaongelma, joka syntyy siitä, että SQL-komennon osaksi laitetaan käyttäjän syöte yhdistämällä merkkijonoja. Tarkastellaan esimerkkinä seuraavaa koodia, jonka tarkoituksena on päivittää käyttäjän sähköpostiosoite:

```python
@app.route("/update", methods=["POST"])
def update():
    check_user()
    user_id = session["user_id"]
    email = request.form["email"]
    sql = "UPDATE users SET email='" + email + "' WHERE id=" + str(user_id)
    db.session.execute(sql)
    ...
```

Yllä oleva koodi sallii SQL-injektion, koska käyttäjän antama syöte liitetään suoraan SQL-komennon osaksi ja käyttäjä voi muuttaa tämän avulla SQL-komennon rakennetta. Esimerkiksi käyttäjä voi antaa sähköpostiosoitteeksi `', is_admin=TRUE --`, jolloin komennosta tulee seuraavanlainen (olettaen, että käyttäjän id-numero on 123):

```sql
UPDATE users SET email='', is_admin=TRUE --' WHERE id=123
```

Tämä komento muuttaa _kaikki_ sovelluksen käyttäjät admin-käyttäjiksi ja myös poistaa kaikki sähköpostiosoitteet. Tässä SQL-komennon rakenne muuttuu merkittävästi, koska käyttäjän antama syöte lisää muutettavan sarakkeen `is_admin` sekä poistaa komennon loppuosan, joka rajaa muutettavan käyttäjän (SQL:ssä merkintä `--` aloittaa kommentin). Vastaavasti käyttäjä voisi hakea `SELECT`-kyselyssä tietoa, jota hänen ei pitäisi pystyä saamaan.

Tehokas tapa estää SQL-injektio on yhdistää syötteet SQL-komentoihin parametrien avulla, kuten olemme tehneet kaikissa kurssin esimerkeissä. Voimme poistaa SQL-injektion yllä olevasta koodista muuttamalla koodia näin:

```python
@app.route("/update", methods=["POST"])
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
UPDATE users SET email='\', is_admin=TRUE --' WHERE id=123
```

Tämä komento muuttaa vain saraketta `email` eikä aiheuta tietoturvaongelmaa.

### XSS-haavoittuvuus

XSS-haavoittuvuus perustuu siihen, että käyttäjän antama syöte yhdistetään sellaisenaan sivun HTML-koodiin, jolloin käyttäjä pystyy vaikuttamaan sivun toimintaan selaimessa antamalla syötteen, jossa on HTML-koodia.

Seuraavassa on esimerkki koodista, jossa on XSS-haavoittuvuus:

```python
@app.route("/result", methods=["POST"])
def result():
    name = request.form["name"]
    return "Moikka, " + name
```

Tässä käyttäjä antaa nimensä lomakkeen kautta ja sivu näyttää viestin "Moikka, _nimi_". Sivu toimii odotusten mukaisesti, jos käyttäjä antaa nimensä:

<img class="screenshot" src="../assets/osa-4/xss1.png">

Kuitenkin käyttäjä voi antaa nimen sijasta myös merkkijonon, jossa on HTML-koodia. Esimerkiksi jos nimenä on `<h1>LOL</h1>`, sivu näyttää tältä:

<img class="screenshot" src="../assets/osa-4/xss2.png">

Lisäksi käyttäjä voi antaa JavaScript-koodia, joka myös suoritetaan selaimessa. Esimerkiksi jos nimenä on `<script>alert("Sivu on hakkeroitu!")</script>`, sivu näyttää tältä:

<img class="screenshot" src="../assets/osa-4/xss3.png">

Tässä tapauksessa XSS-haavoittuvuus ei ole vielä vaarallinen, koska käyttäjä voi muuttaa vain itselleen näkyvää sivua. Kuitenkin asiasta tulee ongelma, jos käyttäjän syöte tallennetaan palvelimelle ja se välittyy muille käyttäjille. Kiusanteon lisäksi JavaScriptin avulla voi tuottaa todellisia tietoturvaongelmia XSS-haavoittuvuuden kautta.

XSS-haavoittuvuuden pystyy estämään pitämällä huolta siitä, että käyttäjän antamia syötteitä ei näytetä koskaan sivulla sellaisenaan. Kun käytämme Flaskissa sivupohjia, tämä tapahtuu automaattisesti. Esimerkiksi seuraavassa koodissa ei ole XSS-haavoittuvuutta:

```python
@app.route("/result", methods=["POST"])
def result():
    name = request.form["name"]
    return render_template("result.html", name=name)
```

Kun muuttuja `name` näytetään sivupohjassa, sen sisältöä muutetaan automaattisesti niin, että HTML-koodia ei suoriteta:

<img class="screenshot" src="../assets/osa-4/xss4.png">

Käytännössä esimerkiksi merkit `<` ja `>` muuttuvat muotoon `&lt;` ja `&gt;`, jolloin selain näyttää nämä merkit sellaisenaan eikä tulkitse niitä HTML-tagien osiksi.

Jos emme käyttäisi sivupohjia, merkit tulisi muuttaa jollain toisella tavalla. Esimerkiksi Werkzeug-kirjastossa on funktio `escape`, joka hoitaa tämän asian. Kuitenkin hyvä käytäntö on käyttää aina sivupohjia, jolloin XSS-haavoittuvuuden riski katoaa automaattisesti.

### CSRF-haavoittuvuus

CSRF-haavoittuvuus syntyy, kun web-sovellus ei varmista, että kirjautuneen käyttäjän tekemä sivupyyntö todella tulee käyttäjältä. Tarkastellaan esimerkkinä seuraavaa lomaketta, jonka kautta käyttäjä voi lähettää uuden viestin:

```html
<form action="/send" method="POST">
Uusi viesti:
<textarea name="message"></textarea>
<input type="submit" value="Lähetä">
</form>
```

```python
@app.route("/send", methods=["POST"])
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

CSRF-haavoittuvuuden pystyy estämään muuttamalla lomaketta niin, että sen osana on käyttäjän istuntoon liittyvä tieto, joka ei ole hyökkääjän tiedossa. Esimerkiksi kun käyttäjä kirjautuu sisään, sovellus voi lisätä istuntoon satunnaisen kentän `csrf_token`. Tässä on yksi tapa luoda kyseinen kenttä `secrets`-moduulin avulla:

```python
    session["csrf_token"] = secrets.token_hex(16)
```

Tämän kentän sisältö laitetaan piilokentäksi lomakkeeseen:

```html
{% raw %}<form action="/send" method="POST">
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

### Muut salaiset tiedot

Web-sovelluksissa on usein muutakin salaista tietoa, kuten tietokannan salasana, Flaskissa istuntojen salainen avain jne. Näiden tietojen tulee olla turvallisessa paikassa palvelimella niin, että ulkopuoliset eivät pääse niihin käsiksi. Yksi turvallinen tapa on käyttää ympäristömuuttujia kurssin materiaalissa esitetyllä tavalla.

Salaista tietoa ei erityisesti saa laittaa GitHubiin. Tutkimalla GitHubin käyttäjien projekteja voi löytää paljon salaista tietoa, jonka ei kuuluisi olla siellä. Pidä huoli, että oma projektisi ei ole yksi niistä. Jos kuitenkin vahingossa laitat GitHubiin salaista tietoa, niin huomaa, että pelkkä tiedon poistaminen repositoriosta ei riitä, koska myös tiedostojen muutoshistoria on tallessa. Lisätietoa asiasta on esimerkiksi [GitGuardian-sivustolla](https://blog.gitguardian.com/leaking-secrets-on-github-what-to-do/).
