---
title: SQLite vs. PostgreSQL
hidden: true
---

# SQLite vs. PostgreSQL

Kurssilla _Tietokantojen perusteet_ käytettiin SQLite-tietokantaa, mutta tällä kurssilla käytetään PostgreSQL-tietokantaa. Mitä eroa näillä on?

## Tietokantaan pääsy

SQLitessä tietokanta on tietyssä yksittäisessä tiedostossa. Esimerkiksi seuraava komento avaa tiedostossa `testi.db` olevan tietokannan SQLite-tulkissa:

```prompt
$ sqlite3 testi.db
```

PostgreSQL:ssä on kiinteä tietokanta, jota hallinnoi taustalla suoritettava palvelinohjelma. Tietokantaan saa yhteyden esimerkiksi avaamalla PostgreSQL-tulkin:

```prompt
$ psql
```

PostgreSQL:n tietokanta on tallennettu hakemistoihin ja tiedostoihin, jotka ovat PostgreSQL:n sisäisesti käyttämässä hakemistossa.

## SQL-kieli

SQLite ja PostgreSQL käyttävät SQL-kieltä samaan tapaan, mutta niissä on monia pieniä eroja. Esimerkiksi SQLitessä `id INTEGER PRIMARY KEY` määrittelee pääavaimen, jolla on automaattinen numerointi, kun taas PostgreSQL:ssä tämä merkitään `id SERIAL PRIMARY KEY`.

SQLite on tietyissä asioissa hyvin vapaamielinen verrattuna muihin tietokantoihin. Esimerkiksi SQLite antaa luoda sarakkeen tyyppiä `INTEGER`, johon tallennetaan kuitenkin merkkijono:

```prompt
sqlite> CREATE TABLE test (x INTEGER);
sqlite> INSERT INTO test (x) VALUES ('aybabtu');
sqlite> SELECT * FROM test;
aybabtu
```

Sama temppu ei onnistu PostgreSQL:ssä, vaan tulee ilmoitus väärästä tyypistä:

```prompt
user=# CREATE TABLE test (x INTEGER);
CREATE TABLE
user=# INSERT INTO test (x) VALUES ('aybabtu');
ERROR:  invalid input syntax for integer: "aybabtu"
LINE 1: INSERT INTO test (x) VALUES ('aybabtu');
```

Vastaavasti oletuksena SQLitessä viiteavaimia (`REFERENCES`) ei tarkasteta, mutta PostgreSQL:ssä ne tarkastetaan aina.

Yleensä ottaen PostgreSQL pyrkii seuraamaan SQL-standardia ja toteuttaa monia SQL:n ominaisuuksia, jotka puuttuvat SQLitestä.

## Käyttökohteet

SQLiten vahvuuksia ovat sen keveys ja suoraviivainen toiminta. Koska tietokannan sisältö on yksittäisessä tiedostossa, tietokannan kopiointi on helppoa ja sitä pystyy käyttämään riippumatta muusta järjestelmästä. SQLite soveltuu erityisesti SQL-kielen harjoitteluun ja pieniin tietokantaa käyttäviin sovelluksiin.

PostgreSQL on monipuolisempi tietokanta kuin SQLite ja sisältää esimerkiksi käyttäjien hallintaan ja rinnakkaisuuteen liittyviä ominaisuuksia, jotka puuttuvat kokonaan SQLitestä. PostgreSQL näyttää kyntensä silloin, kun tietokannassa on paljon tietoa ja paljon samanaikaisia käyttäjiä, mutta toisaalta se on selvästi monimutkaisempi kuin SQLite.

Tämän kurssin laajuisen sovelluksen tietokannaksi soveltuisi sinänsä mainiosti sekä SQLite että PostgreSQL. Kuitenkin yksi kurssin tavoitteista on oppia käyttämään PostgreSQL:ää, koska on hyvä tuntea useita tietokantoja.