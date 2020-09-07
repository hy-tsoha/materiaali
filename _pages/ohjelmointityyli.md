---
title: Ohjelmointityyli
hidden: true
---

# Ohjelmointityyli

[Pythonin tyyliohje](https://www.python.org/dev/peps/pep-0008/) (PEP 8) antaa neuvoja Python-ohjelmoinnin tyyliasioihin. Myös [Googlen tyyliohje](https://google.github.io/styleguide/pyguide.html) on tutustumisen arvoinen. Tärkein asia on kuitenkin, että koodin tyyli on _yhtenäinen_ sovelluksen sisällä.

Seuraavassa on kymmenen vinkkiä, joista on hyötyä tämän kurssin sovelluksen toteuttamisessa.

## 1. Sisentäminen

Pythonissa käytäntönä on, että sisennyksen leveys on *neljä välilyöntiä*.

Seuraa tätä käytäntöä koodissasi, eli varmista, että kaikkialla sisennyksenä on neljä välilyöntiä. Paras tapa on säätää editorin asetukset niin, että editori pitää huolta tästä.

## 2. Koodin kieli

Suositeltava tapa on kirjoittaa koodi englanniksi. Tämä koskee koodissa olevia nimiä, kommentteja ja myös tietokannan taulujen ja sarakkeiden nimiä.

## 3. Nimien valinta

Nimeä muuttujat kuvaavasti mutta älä tarpeettoman pitkästi. Hyvä nimi on esimerkiksi `user_count`, huonoja nimiä ovat `x` ja `total_number_of_users_in_system`.

Pythonissa on käytäntönä, että muuttujien, funktioiden ja moduulien nimet kirjoitetaan kokonaan pienillä kirjaimilla ja sanojen väliin laitetaan alaviiva. Noudata tätä käytäntöä kaikkialla koodissasi.

Huomaa, että esimerkiksi Javassa on toisenlainen käytäntö. Javassa muuttuja `user_count` kirjoitettaisiin `userCount`.

## 4. Totuusarvot

Seuraavan tapainen koodi on tarpeettoman pitkä:

```python
if success:
    return True
else:
    return False
```

Saman voi toteuttaa lyhyesti näin:

```python
return success
```

## 5. Lainausmerkit

Pythonissa merkkijonon voi merkitä kahdella tavalla: `'esimerkki'` ja `"esimerkki"`. Valitse toinen tapa ja käytä sitä yhdenmukaisesti kaikkialla koodissa.

## 6. Tyhjä tila

Käytä tyhjää tilaa (whitespace) yhdenmukaisesti kaikkialla koodissa. Esimerkiksi seuraava koodi ei näytä hyvältä:

```python
names = ["Maija","Anna","Uolevi"]
results = [4, 2, 5]
```

Ongelmana on, että ylemmällä rivillä listan sisällä ei ole välilyöntejä ja alemmalla rivillä on. Parempi tapa on kirjoittaa koodi näin:

```python
names = ["Maija", "Anna", "Uolevi"]
results = [4, 2, 5]
```

## 7. Merkki =

Huomaa erityisesti Pythonin käytäntö, että muuttujan sijoituksessa `=`-merkin ympärille tulee välit mutta funktion kutsussa nimetyssä parametrissa ei tule.

```python
name = "Maija"
```

```python
return render_template("index.html", name="Maija")
```

## 8. Pitkät rivit

Pitkät rivit koodissa vaikeuttavat koodin lukemista. Tällä kurssilla erityisesti SQL-komennot voivat aiheuttaa pitkiä rivejä. Jaa pitkä rivi tarvittaessa useammaksi riviksi.

Esimerkiksi seuraava rivi on liian pitkä eikä näytä hyvältä:

```python
sql = "SELECT u.id, COUNT(*) FROM users u, messages m WHERE u.id=m.user_id AND m.status=1 GROUP BY u.id"
```

Tässä on kaksi tapaa rivin jakamiseen:

```python
sql = "SELECT u.id, COUNT(*) FROM users u, messages m " \
      "WHERE u.id=m.user_id AND m.status=1 GROUP BY u.id"
```

```python
sql = """SELECT u.id, COUNT(*) FROM users u, messages m
         WHERE u.id=m.user_id AND m.status=1 GROUP BY u.id"""
```

## 9. Palautusarvo

Jos funktio palauttaa arvon, sillä tulee olla useita mahdollisia palautusarvoja. Esimerkiksi seuraava tyyli ei ole hyvä:

```python
def add_message(user_id, content):
    ...
    return True
```

Tässä funktio palauttaa aina lopuksi `True` eikä voi koskaan palauttaa `False`. Koska palautusarvo on aina sama, siitä ei ole hyötyä.

## 10. Virheenkäsittely

Rakennetta `try`-`except` ei kannata käyttää turhaan seuraavan kaltaisesti:

```python
try:
    sql = "INSERT INTO messages (user_id,content) VALUES (:user_id,:content)"
    db.session.execute(sql,{"user_id":user_id,"content":content})
    db.session.commit()
except:
    return False
```

Ei ole syytä, miksi komento `INSERT` ei onnistuisi tässä (koska rivin lisäämistä tauluun ei ole rajoitettu), joten ei ole tarpeen varautua virheeseen.

Toki on mahdollista, että sovellus menettää jostain syystä yhteyden tietokantaan, mutta tällöin ei ole mitään tehtävissä muutenkaan.
