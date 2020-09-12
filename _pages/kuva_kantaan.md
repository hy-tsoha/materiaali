---
title: Kuva tietokantaan
hidden: true
---

# Kuva tietokantaan

Tämä ohje näyttää, miten sovellukseen voidaan toteuttaa seuraavat toiminnot:

* Käyttäjä lähettää sovellukseen kuvatiedoston lomakkeella
* Kuva tallennetaan tietokantaan
* Kuva näytetään käyttäjälle myöhemmin

## Tiedoston lähetys

Tiedoston lähettäminen toteutetaan lomakkeella, jossa on `file`-tyyppinen `input`-elementti. Tämän elementin kautta lomakkeen käyttäjä pystyy valitsemaan tiedoston tietokoneeltaan ja lähettämään sen palvelimelle.

Lisäksi kun lomakkeen kautta lähetetään tiedosto, siinä täytyy olla lisäattribuutti `enctype`, jonka arvona on `multipart/form-data`.

Tässä on esimerkkinä lomake, joka lähettää tiedoston käsittelijälle `send`:

```html
<form action="/send" method="POST" enctype="multipart/form-data">
File: <input type="file" name="file">
<p>
<input type="submit" value="Send">
</form>
```

Python-koodissa käyttäjän lähettämään tiedostoon pääsee käsiksi `request.files`-olion kautta.

Tiedoston nimi on kentässä `filename` ja tiedoston sisällön voi lukea metodilla `read`. Esimerkiksi seuraava testikoodi näyttää lähetetyn tiedoston nimen ja koon tavuina.

```python
@app.route("/send", methods=["POST"])
def send():
    file = request.files["file"]
    print("name",file.filename)
    print("length",len(file.read()),"bytes")
    ...
```

## Tallennus tietokantaan

Tehdään seuraavaksi koodi, joka tallentaa lähetetyn kuvatiedoston nimen ja sisällön tietokantaan. Seuraava taulu soveltuu kuvan tallentamiseen:

```sql
CREATE TABLE images (id SERIAL PRIMARY KEY, name TEXT, data BYTEA);
```

Tässä sarakkeen `data` tyyppinä on `BYTEA`, mikä tarkoittaa binääridataa.

Seuraava koodi tallentaa lähetetyn kuvan tietokantaan:

```python
@app.route("/send", methods=["POST"])
def send():
    file = request.files["file"]
    name = file.filename
    if not name.endswith(".jpg"):
        return "Invalid filename"
    data = file.read()
    if len(data) > 100*1024:
        return "Too big file"
    sql = "INSERT INTO images (name,data) VALUES (:name,:data)"
    db.session.execute(sql, {"name":name,"data":data})
    db.session.commit()
    return "OK"
```

Ennen tietokantaan tallentamista koodi tarkastaa, että tiedoston pääte on `.jpg` ja tiedoston koko on enintään 100 kilotavua.

Huomaa, että tiedoston nimi ei takaa, että tiedoston sisältö olisi halutunlainen. Esimerkiksi käyttäjä voi lähettää tiedoston `kuva.jpg`, joka on kuitenkin tekstitiedosto.

## Kuvan näyttäminen

Tietokannassa oleva kuva voidaan näyttää käyttäjälle antamalla kuvan sisältö sivupyynnön tuloksena. Seuraava koodi luo sivun `show/[id]`, joka näyttää kuvan id-numeron perusteella:

```python
@app.route("/show/<int:id>")
def show(id):
    sql = "SELECT data FROM images WHERE id=:id"
    result = db.session.execute(sql, {"id":id})
    data = result.fetchone()[0]
    response = make_response(bytes(data))
    response.headers.set("Content-Type","image/jpeg")
    return response
```

Tässä käytössä on Flaskin funktio `make_response`, jolle annetaan kuvadata binäärimuodossa. Lisäksi asetetaan sisällön tyypiksi `image/jpeg`, jotta selain osaa näyttää kuvan sopivalla tavalla.

