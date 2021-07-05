---
title: Pylint-työkalu
hidden: true
---

# Pylint-työkalu

[Pylint](https://pypi.org/project/pylint/) on työkalu, joka antaa palautetta siitä, miten Python-koodi noudattaa hyvää ohjelmointityyliä. Työkalun avulla on kätevää etsiä omasta koodista korjattavia asioita.

Esimerkiksi seuraava komento tarkastaa tiedoston `test.py` sisällön:

```prompt
$ pylint test.py
```

## Esimerkki

Kokeillaan esimerkin vuoksi, millaista palautetta Pylint antaa kurssin [esimerkkisovelluksesta](https://github.com/hy-tsoha/tsoha-words). Tässä tapauksessa on kätevää antaa parametriksi `*.py`, jolloin saadaan palaute kaikista hakemiston Python-tiedostoista.

```prompt
$ pylint *.py
************* Module app
app.py:1:0: C0114: Missing module docstring (missing-module-docstring)
app.py:1:0: E0401: Unable to import 'flask' (import-error)
app.py:7:0: C0413: Import "import routes" should be placed at the top of the module (wrong-import-position)
app.py:7:0: W0611: Unused import routes (unused-import)
app.py:2:0: C0411: standard import "from os import getenv" should be placed before "from flask import Flask" (wrong-import-order)
************* Module db
db.py:1:0: C0114: Missing module docstring (missing-module-docstring)
db.py:2:0: E0401: Unable to import 'flask_sqlalchemy' (import-error)
db.py:3:0: C0411: standard import "from os import getenv" should be placed before "from app import app" (wrong-import-order)
************* Module decks
decks.py:72:0: C0301: Line too long (101/100) (line-too-long)
decks.py:1:0: C0114: Missing module docstring (missing-module-docstring)
decks.py:4:0: C0116: Missing function or method docstring (missing-function-docstring)
decks.py:8:0: C0116: Missing function or method docstring (missing-function-docstring)
decks.py:13:0: C0116: Missing function or method docstring (missing-function-docstring)
decks.py:17:0: C0116: Missing function or method docstring (missing-function-docstring)
decks.py:22:0: C0116: Missing function or method docstring (missing-function-docstring)
decks.py:39:0: C0116: Missing function or method docstring (missing-function-docstring)
decks.py:44:0: C0116: Missing function or method docstring (missing-function-docstring)
decks.py:50:0: C0116: Missing function or method docstring (missing-function-docstring)
decks.py:54:0: C0116: Missing function or method docstring (missing-function-docstring)
decks.py:64:0: C0116: Missing function or method docstring (missing-function-docstring)
decks.py:69:0: C0116: Missing function or method docstring (missing-function-docstring)
decks.py:2:0: C0411: standard import "from random import randint" should be placed before "from db import db" (wrong-import-order)
************* Module routes
routes.py:56:0: C0301: Line too long (135/100) (line-too-long)
routes.py:98:0: C0301: Line too long (110/100) (line-too-long)
routes.py:1:0: C0114: Missing module docstring (missing-module-docstring)
routes.py:2:0: E0401: Unable to import 'flask' (import-error)
routes.py:3:0: C0410: Multiple imports on one line (decks, stats, users) (multiple-imports)
routes.py:6:0: C0116: Missing function or method docstring (missing-function-docstring)
routes.py:10:0: C0116: Missing function or method docstring (missing-function-docstring)
routes.py:10:0: R1710: Either all return statements in a function should return an expression, or none of them should. (inconsistent-return-statements)
routes.py:35:8: W0622: Redefining built-in 'list' (redefined-builtin)
routes.py:42:12: W0621: Redefining name 'deck' from outer scope (line 48) (redefined-outer-name)
routes.py:31:0: C0116: Missing function or method docstring (missing-function-docstring)
routes.py:31:0: R1710: Either all return statements in a function should return an expression, or none of them should. (inconsistent-return-statements)
routes.py:48:9: W0622: Redefining built-in 'id' (redefined-builtin)
routes.py:48:0: C0103: Argument name "id" doesn't conform to snake_case naming style (invalid-name)
routes.py:48:0: C0116: Missing function or method docstring (missing-function-docstring)
routes.py:59:0: C0116: Missing function or method docstring (missing-function-docstring)
routes.py:80:9: W0622: Redefining built-in 'id' (redefined-builtin)
routes.py:80:0: C0103: Argument name "id" doesn't conform to snake_case naming style (invalid-name)
routes.py:80:0: C0116: Missing function or method docstring (missing-function-docstring)
routes.py:87:0: C0116: Missing function or method docstring (missing-function-docstring)
routes.py:101:0: C0116: Missing function or method docstring (missing-function-docstring)
routes.py:109:8: R1705: Unnecessary "else" after "return" (no-else-return)
routes.py:101:0: R1710: Either all return statements in a function should return an expression, or none of them should. (inconsistent-return-statements)
routes.py:115:0: C0116: Missing function or method docstring (missing-function-docstring)
routes.py:120:0: C0116: Missing function or method docstring (missing-function-docstring)
routes.py:137:11: R1714: Consider merging these comparisons with "in" to "role not in ('1', '2')" (consider-using-in)
routes.py:140:8: R1705: Unnecessary "else" after "return" (no-else-return)
routes.py:120:0: R1710: Either all return statements in a function should return an expression, or none of them should. (inconsistent-return-statements)
routes.py:120:0: R0911: Too many return statements (7/6) (too-many-return-statements)
routes.py:146:0: C0116: Missing function or method docstring (missing-function-docstring)
************* Module stats
stats.py:1:0: C0114: Missing module docstring (missing-module-docstring)
stats.py:3:0: C0116: Missing function or method docstring (missing-function-docstring)
stats.py:8:0: C0116: Missing function or method docstring (missing-function-docstring)
************* Module users
users.py:1:0: C0114: Missing module docstring (missing-module-docstring)
users.py:2:0: E0401: Unable to import 'flask' (import-error)
users.py:3:0: E0401: Unable to import 'werkzeug.security' (import-error)
users.py:6:0: C0116: Missing function or method docstring (missing-function-docstring)
users.py:10:4: R1705: Unnecessary "else" after "return" (no-else-return)
users.py:13:8: R1705: Unnecessary "else" after "return" (no-else-return)
users.py:22:0: C0116: Missing function or method docstring (missing-function-docstring)
users.py:27:0: C0116: Missing function or method docstring (missing-function-docstring)
users.py:34:4: W0702: No exception type(s) specified (bare-except)
users.py:38:0: C0116: Missing function or method docstring (missing-function-docstring)
users.py:41:0: C0116: Missing function or method docstring (missing-function-docstring)
users.py:45:0: C0116: Missing function or method docstring (missing-function-docstring)
users.py:4:0: C0411: standard import "import os" should be placed before "from db import db" (wrong-import-order)
users.py:1:0: R0401: Cyclic import (app -> routes) (cyclic-import)
users.py:1:0: R0401: Cyclic import (app -> routes -> decks -> db) (cyclic-import)
users.py:1:0: R0401: Cyclic import (app -> routes -> stats -> db) (cyclic-import)
users.py:1:0: R0401: Cyclic import (app -> routes -> users -> db) (cyclic-import)

------------------------------------------------------------------
Your code has been rated at 5.62/10
```

Pylint antaa palautteen jokaisesta tiedostosta ja lopuksi arvion koodin laadusta. Tässä tapauksessa Pylint antaa koodille arvion 5.62/10.

## Raportin tulkinta

Pylintin antama raportti kannattaa lukea huolellisesti ja miettiä, miten koodin laatua voi parantaa sen avulla. Tässä projektissa Pylint huomauttaa mm. seuraavista asioista:

* **Missing module docstring (missing-module-docstring)**:
  Moduulin alussa ei ole kommenttia, joka dokumentoi moduulin sisällön.
  
* **Missing function or method docstring (missing-function-docstring)**:
  Funktion alussa ei ole kommenttia, joka dokumentoi funktion sisällön.
  
* **Unable to import X (import-error)**:
  Moduulia ei pystytä ottamaan mukaan. Syynä tähän voi olla, että käytössä on virtuaaliympäristö.
  
* **Standard import "from os import getenv" should be placed before "from app import app" (wrong-import-order)**:
  Standardikirjaston `import`-komennot tulisi laittaa ennen muita `import`-komentoja.
  
* **Line too long (X/100) (line-too-long)**:
  Koodissa on liian pitkä rivi. Rivillä saa olla korkeintaan 100 merkkiä.
  
* **Redefining built-in X (redefined-builtin)**:
  Koodissa on käytetty nimeä, joka korvaa Python-kielessä olevan nimen. Näin on esimerkiksi seuraavassa koodissa:
```python
@app.route("/deck/<int:id>")
  def deck(id):
```
  Tässä parametrin nimi on `id`, mutta Python-kielessä on myös sisäinen funktio `id`. Tämän seurauksena funktiossa `deck` ei ole mahdollista käyttää funktiota `id`.
* **Either all return statements in a function should return an expression, or none of them should. (inconsistent-return-statements)**:
  Funktio voi palauttaa arvon, mutta ei välttämättä palauta arvoa. Näin on esimerkiksi seuraavassa funktiossa:
```python
  def login():
      if request.method == "GET":
          ...
          return ...
      if request.method == "POST":
          ...
          return ...
```
  Funktio palauttaa arvon, jos pyynnön metodi on `GET` tai `POST`, mutta jos metodi on jotain muuta, funktio ei palauta arvoa.
* **Unnecessary "else" after "return" (no-else-return)**: Tämä huomautus tulee esimerkiksi seuraavasta koodista:
```python
  if users.login(username, password):
      return redirect("/")
  else:
      return render_template("error.html", message="Väärä tunnus tai salasana")
```
Koska ensimmäisessä haarassa on `return`, koodin voisi kirjoittaa lyhyemmin näin:
```python
if users.login(username, password):
      return redirect("/")
return render_template("error.html", message="Väärä tunnus tai salasana")
```

Huomaa kuitenkin, että raportin tulkinnassa kannattaa käyttää omaa harkintaa. Vaikka Pylint huomauttaa jostain asiasta, se ei välttämättä vaadi korjaamista. Esimerkiksi tämän kurssin projektissa moduuleja ja funktioita ei tarvitse dokumentoida.

## Raportin asetukset

Pylintin raportissa joka rivin perässä on tunnus, joka ilmaisee palautteen aiheen. Tiedoston `.pylintrc` avulla voi määrittää, että tiettyjä asioita ei käsitellä raportissa.

Esimerkiksi tämän kurssin projektissa tiedoston sisältö voisi olla seuraava:

<p class="code-title">.pylintrc</p>
```
[MESSAGES CONTROL]

disable=missing-module-docstring,
        missing-function-docstring,
        import-error,
        cyclic-import
```

Tämän seurauksena raportti lyhenee selvästi ja siitä näkee paremmin tämän projektin kannalta hyödyllistä palautetta:

```prompt
$ pylint *.py
************* Module app
app.py:7:0: C0413: Import "import routes" should be placed at the top of the module (wrong-import-position)
app.py:7:0: W0611: Unused import routes (unused-import)
app.py:2:0: C0411: standard import "from os import getenv" should be placed before "from flask import Flask" (wrong-import-order)
************* Module db
db.py:3:0: C0411: standard import "from os import getenv" should be placed before "from app import app" (wrong-import-order)
************* Module decks
decks.py:72:0: C0301: Line too long (101/100) (line-too-long)
decks.py:2:0: C0411: standard import "from random import randint" should be placed before "from db import db" (wrong-import-order)
************* Module routes
routes.py:56:0: C0301: Line too long (135/100) (line-too-long)
routes.py:98:0: C0301: Line too long (110/100) (line-too-long)
routes.py:3:0: C0410: Multiple imports on one line (decks, stats, users) (multiple-imports)
routes.py:10:0: R1710: Either all return statements in a function should return an expression, or none of them should. (inconsistent-return-statements)
routes.py:35:8: W0622: Redefining built-in 'list' (redefined-builtin)
routes.py:42:12: W0621: Redefining name 'deck' from outer scope (line 48) (redefined-outer-name)
routes.py:31:0: R1710: Either all return statements in a function should return an expression, or none of them should. (inconsistent-return-statements)
routes.py:48:9: W0622: Redefining built-in 'id' (redefined-builtin)
routes.py:48:0: C0103: Argument name "id" doesn't conform to snake_case naming style (invalid-name)
routes.py:80:9: W0622: Redefining built-in 'id' (redefined-builtin)
routes.py:80:0: C0103: Argument name "id" doesn't conform to snake_case naming style (invalid-name)
routes.py:109:8: R1705: Unnecessary "else" after "return" (no-else-return)
routes.py:101:0: R1710: Either all return statements in a function should return an expression, or none of them should. (inconsistent-return-statements)
routes.py:137:11: R1714: Consider merging these comparisons with "in" to "role not in ('1', '2')" (consider-using-in)
routes.py:140:8: R1705: Unnecessary "else" after "return" (no-else-return)
routes.py:120:0: R1710: Either all return statements in a function should return an expression, or none of them should. (inconsistent-return-statements)
routes.py:120:0: R0911: Too many return statements (7/6) (too-many-return-statements)
************* Module users
users.py:10:4: R1705: Unnecessary "else" after "return" (no-else-return)
users.py:13:8: R1705: Unnecessary "else" after "return" (no-else-return)
users.py:34:4: W0702: No exception type(s) specified (bare-except)
users.py:4:0: C0411: standard import "import os" should be placed before "from db import db" (wrong-import-order)

------------------------------------------------------------------
Your code has been rated at 8.71/10
```

Nyt koodi saa arvion 8.71/10, mutta koodissa olisi vielä monenlaista parannettavaa.
