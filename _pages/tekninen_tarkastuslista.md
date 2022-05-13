---
title: Tekninen tarkastuslista
hidden: true
---

# Tekninen tarkastuslista

Tämän sivun avulla voit tarkastaa, että sovelluksesi tekniset asiat ovat kunnossa. Monista tämän sivun aiheista on tarkempaa tietoa kurssimateriaalin muissa osissa.

## Versionhallinta

* Tee usein commiteja niin, että jokainen commit muuttaa jonkin yksittäisen asian.

* Kirjoita commit-viestit englanniksi ja yhtenäisellä tyylillä.

* Kirjoita commit-viestiin selkeästi tehty muutos (esim. mikä ominaisuus lisättiin). Esimerkki hyvästä commit-viestistä on "Show number of users in each group".

* Varmista, että versionhallinnassa ei ole sinne kuulumattomia tiedostoja tai hakemistoja (kuten `.env`, `__pycache__` tai `venv`).

* Laadi hyvä tiedosto `README.md`, joka antaa hyödyllistä tietoa henkilölle, joka päätyy sovelluksesi repositorioon.

## Ohjelmointityyli

* [Pythonin tyyliohje](https://www.python.org/dev/peps/pep-0008/) (PEP 8) antaa ohjeita Python-koodin kirjoittamiseen. Tutustu tyyliohjeeseen ja pyri noudattamaan sitä omassa koodissasi.

* [Pylint]({% link _pages/pylint.md %}) on kätevä työkalu, joka antaa palautetta Python-koodin tyylistä. Sen avulla voit löytää automaattisesti monia ongelmia koodista.

* Pythonissa sisennyksen leveys on *neljä välilyöntiä*. Paras tapa on säätää editorin asetukset niin, että editori pitää huolta tästä.

* Kirjoita kaikki koodi englanniksi. Tämä koskee koodin muuttujien, funktioiden yms. nimiä sekä kommentteja.

* Nimeä muuttujat kuvaavasti mutta älä tarpeettoman pitkästi. Hyvä nimi on esimerkiksi `user_count`, huonoja nimiä ovat `x` ja `total_number_of_users_in_system`. Pythonin käytäntönä on, että nimet kirjoitetaan kokonaan pienillä kirjaimilla ja sanojen väliin laitetaan alaviiva. Huomaa, että esimerkiksi Javassa on toisenlainen käytäntö ja muuttuja `user_count` kirjoitettaisiin `userCount`.

* Pythonissa merkkijonon voi merkitä kahdella tavalla: `'esimerkki'` ja `"esimerkki"`. Valitse toinen tapa ja käytä sitä yhdenmukaisesti kaikkialla koodissa.

* Muuttujan sijoituksessa `=`-merkin ympärille tulee välit mutta funktion kutsussa nimetyssä parametrissa ei tule.
  ```python
  name = "Maija"
  ```
  ```python
  return render_template("index.html", name="Maija")
  ```
* Pilkun oikealla puolella on välilyönti. Tämä vaikuttaa esimerkiksi listojen ja funktion parametrien muotoiluun.
  ```python
  names = ["Maija", "Anna", "Uolevi"]  
  ```
  ```python
  def login(username, password):
  ```
* Seuraavan tapainen koodi on tarpeettoman pitkä:
  ```python
  if success:
      return True
  else:
      return False
  ```
  Parempi tapa on toteuttaa sama lyhyesti näin:
  ```python
  return success
  ```
* Jos funktio palauttaa arvon, sillä tulee olla useita mahdollisia palautusarvoja. Esimerkiksi seuraava tyyli ei ole hyvä:
  ```python
  def add_message(user_id, content):
      ...
      return True
  ```
  Tässä funktio palauttaa aina lopuksi `True` eikä voi koskaan palauttaa `False`. Koska palautusarvo on aina sama, siitä ei ole hyötyä.
* Pythonissa ei käytetä sulkeita `if`- ja `while`-rakenteiden ehdoissa. Esimerkiksi älä kirjoita
  ```python
  if (status == 1):
  ```
  vaan
  ```python
  if status == 1:
  ```
* Pythonissa `None` tulkitaan epätodeksi vertailussa. Tämän ansiosta seuraavat ehdot vastaavat toisiaan:
  ```python
  if result == None:
  if result is None:
  if not result:
  ```
  Vastaavasti seuraavat ehdot vastaavat toisiaan:
  ```python
  if result != None:
  if result is not None:
  if result:
  ```
  Molemmissa tapauksissa hyvää tyyliä on käyttää viimeistä tapaa, joka on lyhin.
  
## Tietokanta-asiat

* Käytä englantia taulujen ja sarakkeiden nimissä.
* Nimeä taulut ja sarakkeet kuvaavasti ja yhdenmukaisesti.
* Käytä `REFERENCES`-määrettä, kun taulun sarake viittaa toiseen tauluun.
* Käytä `UNIQUE`-määrettä, kun sarakkeessa tulee olla eri arvo joka rivillä.
* Kysely muotoa `SELECT *` ei ole koskaan hyvä. Merkitse aina näkyviin haettavat sarakkeet, vaikka hakisit kaikki tai lähes kaikki sarakkeet.
* Jaa pitkät SQL-komennot useille riveille. Tässä on kaksi tapaa rivittämiseen:
  ```python
  sql = "SELECT u.id, COUNT(*) FROM users u, messages m " \
        "WHERE u.id = m.user_id AND m.status = 1 GROUP BY u.id"
  ```
  ```python
  sql = """SELECT u.id, COUNT(*) FROM users u, messages m
           WHERE u.id = m.user_id AND m.status = 1 GROUP BY u.id"""
  ```
* Hae kaikki tiedot yhdellä SQL-kyselyllä, jos se on mielekkäästi mahdollista. Esimerkiksi seuraavassa on huono tapa hakea joka ryhmästä id, nimi ja käyttäjien määrä:
  ```python
  sql = "SELECT id, name FROM groups"
  result = db.session.execute(sql)
  groups = result.fetchall()
  data = []
  for group in groups:
      sql = "SELECT COUNT(*) FROM users WHERE group_id = :id"
      result = db.session.execute(sql, {"id":group[0]})
      count = result.fetchone()[0]
      data.append((group[0], group[1], count))
  ```
  Koodi hakee ensin ryhmien nimet ja id:t ja sitten joka ryhmästä erikseen käyttäjien määrän. Parempi tapa on tehdä yksi SQL-kysely, joka hakee suoraan kaiken:
  ```python
  sql = "SELECT g.id, g.name, COUNT(*) FROM groups g, users u " \
        "WHERE g.id = u.group_id GROUP BY g.id, g.name"
  result = db.session.execute(sql)
  data = result.fetchall()
  ```
* Älä tee Python-koodissa tiedon käsittelyä, jos sen voi tehdä mielekkäästi tietokannan puolella. Esimerkiksi seuraavassa on huono tapa etsiä paras annettu arvosana:
  ```python
  sql = "SELECT grade FROM reviews WHERE book_id = :id"
  result = db.session.execute(sql, {"id":book_id})
  grades = result.fetchall()
  best = 0
  for grade in grades:
      best = max(best, grade[0])
  ```
  Koodi hakee listaan kaikki arvosanat ja etsii parhaan arvosanan `for`-silmukan avulla. Kuitenkin parhaan arvosanan voi hakea suoraan SQL:llä:
  ```python
  sql = "SELECT MAX(grade) FROM reviews WHERE book_id = :id"
  result = db.session.execute(sql, {"id":book_id})
  best = result.fetchone()[0]
  ```  
* Käytä `try`/`except`-virheenkäsittelyä SQL-komennon ympärillä vain silloin, kun todella aiot tunnistaa jonkin virheen. Hyvä esimerkki on tilanne, jossa sarakkeessa on ehto `UNIQUE` ja haluat varmistaa, ettei samaa arvoa lisätä uudestaan.

## Tietoturva

* Älä laita versionhallintaan salaista tietoa, kuten istuntojen salaista avainta tai osoitetta, jonka kautta pääsee käsiksi tuotantotietokantaan.

* Tallenna salasanat tietokantaan turvallisesti.

* Tarkasta käyttäjän antama tieto ennen tietokantaan tallentamista (esim. merkkijonon pituudella on sopiva yläraja).

* Tarkasta jokaisella sivulla käyttäjän oikeudet niin, että käyttäjä voi nähdä sivun sisällön vain, jos se on sallittua. Huomaa, että käyttäjä voi kokeilla vaihtaa sivun osoitetta ja päästä käsiksi toisen käyttäjän tietoon.

* Tarkasta lomakkeen lähettämisen jälkeen, että käyttäjällä on oikeus lähettää lomake. Huomaa, että käyttäjä voi kokeilla vaihtaa myös lomakkeessa olevia piilokenttiä.

* Käytä aina parametreja SQL-komennoissa, mikä estää SQL-injektion tekemisen.

* Käytä aina sivupohjia, mikä estää XSS-haavoittuvuuden.

* Varmista, että sovelluksessa ei ole CSRF-haavoittuvuutta. Tämä vaatii, että lomakkeissa on istuntokohtainen salainen avain, joka tarkastetaan.
