## Virheiden etsiminen

Tavallinen tilanne web-sovelluksen kehityksessä on, että sovellus ei toimi oikealla tavalla. Tämä voi näkyä niin, että sovellus ei käynnisty lainkaan tai jokin sovelluksen toiminto tuottaa virhesivun. Tästä ei kannata kuitenkaan hätkähtää, vaan virheen syy löytyy yleensä aina tutkimalla lokeja ja tarvittaessa lisäämällä debug-tulostusta koodiin.

### Lokien tutkiminen

Web-sovellus tulostaa toimintansa aikana lokitietoa, jonka avulla voi jäljittää sovelluksessa esiintyviä virheitä. Esimerkiksi kun suoritamme paikallisesti komennon `flask run`, lokitiedot ilmestyvät komentoikkunaan.

Jos kaikki menee hyvin, komentoikkunaan voi tulla seuraavan tapaisia viestejä:

```prompt
(venv) $ flask run
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
127.0.0.1 - - [03/Jul/2020 13:28:03] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [03/Jul/2020 13:28:05] "GET / HTTP/1.1" 200 -
```

Tämä kertoo, että sovellus on käynnistetty ja sen etusivua on ladattu kahdesti. Molemmilla kerroilla vastaus on annettu HTTP-koodilla 200, mikä tarkoittaa onnistunutta pyyntöä.

Tehdään nyt testimielessä sovellukseen tahallinen bugi muuttamalla SQL-kyselyä niin, että sanan `SELECT` tilalla on väärin kirjoitettu `SELEC`:

```python
    result = db.session.execute("SELEC COUNT(*) FROM visitors")
```

Tämän seurauksena sovellus antaa virhesivun, jonka viestinä on _Internal Server Error_:

<img class="screenshot" src="../assets/osa-3/error.png">

Tällainen virhesivu kertoo hyvin vähän siitä, mikä mahdollinen virhe on, mutta voimme mennä heti tutkimaan lokin sisältöä:

```prompt
(venv) $ flask run
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
[2020-07-03 13:30:39,544] ERROR in app: Exception on / [GET]
Traceback (most recent call last):
  File "/tsoha-visitors/venv/lib/python3.6/site-packages/sqlalchemy/engine/base.py", line 1278, in _execute_context
    cursor, statement, parameters, context
  File "/tsoha-visitors/venv/lib/python3.6/site-packages/sqlalchemy/engine/default.py", line 593, in do_execute
    cursor.execute(statement, parameters)
psycopg2.errors.SyntaxError: syntax error at or near "SELEC"
LINE 1: SELEC COUNT(*) FROM visitors
        ^
The above exception was the direct cause of the following exception:

(...)

  File "/tsoha-visitors/app.py", line 15, in index
    result = db.session.execute("SELEC COUNT(*) FROM visitors")
        ^

(...)

[SQL: SELEC COUNT(*) FROM visitors]
(Background on this error at: http://sqlalche.me/e/13/f405)
127.0.0.1 - - [03/Jul/2020 13:30:39] "GET / HTTP/1.1" 500 -
```

Tästä näkee, että virheen syynä on `syntax error at or near "SELEC"` ja virhe ilmenee rivillä 15 tiedostossa `app.py`. Tällaisen tiedon avulla virhe on helppoa korjata.

Jos sovellus aiheuttaa virheen Herokussa, vastaavan lokin saa Herokun komentorivityökalun avulla näkyviin seuraavasti:

```prompt
$ heroku logs --tail
```

Vaikein asia lokin lukemisessa on, että virheen sattuessa lokissa on yleensä paljon rivejä. Vaatii kokemusta tunnistaa, mitkä rivit ovat oleellisia virheen etsimisen kannalta. Yleensä kannattaa etsiä lokista virheilmoitusta sekä sovelluksen koodin riviä, jolla virhe tapahtui.

### Debug-tulostukset

Sovelluksen toimintaa voi tutkia myös debug-tulostuksilla, joiden tekemiseen sopii vanha kunnon `print`-komento. Voimme esimerkiksi tulostaa sovelluksen eri vaiheissa ongelmaan mahdollisesti liittyvien muuttujien arvoja ja tarkastaa, että ne ovat kunnossa.

Esimerkiksi voimme tehdä seuraavan debug-tulostuksen, joka tulostaa muuttujan `counter` arvon:

```python
    result = db.session.execute("SELECT COUNT(*) FROM visitors")
    counter = result.fetchone()[0]
    print("counter is now", counter)
```

Nyt kun suoritamme sovelluksen ja käymme sivulla, lokiin ilmestyy seuraavaa tietoa:

```prompt
(venv) $ flask run
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
counter is now 12
127.0.0.1 - - [03/Jul/2020 13:53:57] "GET / HTTP/1.1" 200 -
```

Lokista katsomalla näemme siis, että sovellus suoritti kyseisen rivin ja sillä hetkellä muuttujan `counter` arvo oli 12.

Kun ongelma on saatu korjattua ja debug-tulosteita ei enää tarvita, muista kuitenkin siivota debug-tulosteet pois koodista.
