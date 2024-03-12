## Sovellus tuotantoon

Sovelluksen laittaminen _tuotantoon_ tarkoittaa, että sovellus julkaistaan käyttäjille. Tällä kurssilla harjoittelemme tuotantoon laittamista [Fly.io](https://fly.io)-palvelun avulla. Fly.io tarjoaa ilmaiseksi palvelintilaa, jonne voi sijoittaa muun muassa Flaskilla toteutetun web-sovelluksen.

<mark>HUOM! Vuoden 2023 alusta alkaen sovelluksen ei tarvitse olla testattavissa tuotantopalvelimella. Riittää, että sen saa käynnistettyä paikallisesti.
Lisätietoja <a href="/materiaali/aikataulu#huomio-flyiosta">täällä</a>.</mark>

Käymme läpi seuraavaksi esimerkin, jossa siirrämme äsken luodun kävijäsovelluksen Fly.ioon. Jotta voit käyttää Fly.ioa, sinun täytyy luoda ensin tunnus palveluun. Tunnuksen luominen on ilmaista, mutta huomaa, että Fly.io tarjoaa myös maksullisia palveluja. Voit myös kirjautua Github-tunnuksillasi.

Flyn ilmaisversiossa on tiettyjä rajoituksia erityisesti suorituskykyyn liittyen. Tämän kurssin puitteisiin ilmaisversion tarjoamat ominaisuudet kuitenkin riittävät hyvin. Voit lukea palvelun rajoituksista tarkemmin [täältä](https://fly.io/docs/about/pricing/) sekä ilmaisten Postgres-tietokantojen rajoituksista [täältä](https://fly.io/docs/postgres/#about-free-postgres-on-fly-io).

Fly.iossa olevaa sovellusta voidaan hallinnoida kahdella tavalla: nettiselaimella Fly.ion sivuston [hallintapaneelin](https://fly.io/dashboard) kautta tai omalle koneelle asennettavan [komentorivityökalun](https://fly.io/docs/hands-on/install-flyctl/) avulla. Huomaa asennuksen lopussa tuleva ohjeistus lisätä flyctl `PATH`-ympäristömuuttujaan. Pääset muokkaamaan oikeaa tiedostoa esimerkiksi komennolla `gedit ~/.bashrc`. Lisää annetut rivit tiedoston loppuun. Seuraava ohje näyttää, miten komentorivityökalu toimii.

### Komentorivityökalu

Komentorivityökalun käyttö alkaa kirjautumalla sisään:

```prompt
$ fly auth login
```

Komento avaa nettiselaimen, jonka kautta pystyy kirjautumaan. Kirjautumisen jälkeen komentorivityökalu on käyttökunnossa.

Komento `fly help` näyttää listan komentorivityökalun komennoista. Vastaavasti voi myös pyytää neuvoa tietyn komennon käyttämisestä: esimerkiksi `fly apps help` kertoo, miten komentoa `fly apps` käytetään.

### Sovelluksen luonti

Komento `fly launch` luo uuden Fly.io-sovelluksen:

```prompt
$ fly launch
Creating app in /home/user/tsoha-visitors
Scanning source code
Detected a Python app
Using the following build configuration:
	Builder: paketobuildpacks/builder:base
? App Name (leave blank to use an auto-generated name): tsoha-visitors
Automatically selected personal organization: user
? Select regions:  [Use arrows to move, type to filter]
  Amsterdam, Netherlands (ams)
  ...
> Frankfurt, Germany (fra)
  São Paulo (gru)
  ...
  Miami, Florida (US) (mia)
? Select region: fra (Frankfurt, Germany)
Created app tsoha-visitors in organization personal
Wrote config file fly.toml
? Would you like to set up a Postgresql database now? No
We have generated a simple Procfile for you. Modify it to fit your needs and run "fly deploy" to deploy your application.

```

Komento pyytää käyttäjältä sovelluksen nimeä sekä palvelimen sijaintia. Palvelimen sijainniksi kannattaa valita Euroopan alueella sijaitseva palvelin, esimerkiksi Frankfurt.

Jokaisella Fly.iossa olevalla sovelluksella tulee olla yksilöllinen nimi. Tämän materiaalin kirjoitushetkellä kukaan ei ollut luonut sovellusta nimellä `tsoha-visitors`, joten sovelluksen luonti onnistui. Kuitenkaan et voi itse luoda tämän nimistä sovellusta, koska se on jo olemassa. Jos et anna sovellukselle nimeä, sille tulee automaattisesti satunnainen nimi. Jos teet sovelluksen vain kokeilua tai tätä kurssia varten, satunnainen nimi riittää hyvin.

Komento myös kysyy, luodaanko samalla projektille Postgres-tietokanta. Älä kuitenkaan luo tietokantaa vielä, tai saatat joutua ongelmiin tietokantaan yhdistämisen kanssa.

Komento luo automaattisesti kaksi tiedostoa, joita Fly.io käyttää sovelluksen hallintaan palvelimella.

Ensimmäinen tiedosto on `fly.toml`, jota Fly.io käyttää projektin konfigurointiin. Tiedostoon generoituu automaattisesti tarvittavat tiedot. Vaihdetaan kuitenkin sovelluksen portti vastaamaan Flaskin oletuksena käyttämää porttia `5000`. Muutetaan kohdat

```
[env]
  PORT ="8080"

[[services]]
  internal_port = 8080
```

muotoon

```
[env]
  PORT = "5000"

[[services]]
  internal_port = 5000
```

Toinen tiedosto on nimeltään `Procfile`, jota käytetään sovelluksen käynnistämiseen. Joudumme muokkaamaan sitäkin hieman. Tiedoston sisältö on aluksi seuraava:

```
# Modify this Procfile to fit your needs
web: gunicorn server:app
```

Muutetaan se muotoon

```
web: gunicorn app:app
```

Tiedostossa oleva komento `gunicorn app:app` on vastuussa sovelluksen käynnistämisestä tuotantopalvelimella. Tähän asti olemme paikallisesti käyttäneet tähän komentoa `flask run`, mutta sitä ei suositella käytettäväksi tuotannossa, joten käytetään siihen tuotantoversiossa gunicornia. Määrittelimme nyt, että tyyppiä "web" oleva sovellus käynnistetään komennolla `gunicorn app:app`. Tässä ensimmäinen `app` viittaa moduulin nimeen `app.py` ja toinen `app` viittaa koodissa luotavan Flask-olion nimeen.

Tätä varten asennetaan projektiin vielä `gunicorn`:

```prompt
(venv) $ pip install gunicorn
```

Tämän jälkeen tiedosto `requirements.txt` tulee saattaa ajan tasalle:

```prompt
(venv) $ pip freeze > requirements.txt
```

Tässä vaiheessa on hyvä laittaa muutokset talteen versionhallintaan:

```prompt
$ git add fly.toml
$ git add requirements.txt
$ git add Procfile
$ git commit -m "Add Fly.io config"
$ git push
```

### Tietokanta ja ympäristömuuttujat

Luodaan seuraavaksi sovellukselle tietokanta komennolla `fly postgres create`. Komento kysyy sovellukselle nimeä (tietokanta on erillinen Fly.io-sovelluksensa), sijaintia sekä kuinka tehokkaan tietokannan haluaa luoda. Alueeksi kannattaa valita sama, jossa varsinainen sovelluksesi sijaitsee.

```prompt
$ fly postgres create
? Choose an app name (leave blank to generate one): tsoha-visitors-db
? Select regions:  [Use arrows to move, type to filter]
  Amsterdam, Netherlands (ams)
  ...
> Frankfurt, Germany (fra)
  São Paulo (gru)
  ...
  Miami, Florida (US) (mia)
? Select regions: Frankfurt, Germany (fra)
? Select configuration:  [Use arrows to move, type to filter]
> Development - Single node, 1x shared CPU, 256MB RAM, 1GB disk
  Production - Highly available, 2x shared CPUs, 4GB RAM, 40GB disk
  Production - Highly available, 4x shared CPUs, 8GB RAM, 80GB disk
  Specify custom configuration
? Select configuration: Development - Single node, 1x shared CPU, 256MB RAM, 1GB disk
Creating postgres cluster tsoha-test1-db in organization personal
Creating app...
Setting secrets...
```

Tietokanta täytyy vielä erikseen yhdistää sovellukseemme:

```prompt
$ fly postgres attach --app tsoha-visitors tsoha-visitors-db --database-name postgres
? Database "postgres" already exists. Continue with the attachment process? Yes
```

Jos komento ei onnistu heti tietokannan luomisen jälkeen, odota muutama minuutti ja yritä uudelleen.

Huomaa, että määritämme käytettävän tietokannan nimeksi `postgres`, sillä muuten komento luo uuden tietokannan, jonka nimeksi tulisi sovelluksen nimi. Emme kuitenkaan halua tällaista tilannetta, sillä kohta tarvitsemamme komento `fly postgres connect` käyttää automaattisesti tietokantaa nimeltä `postgres`.

Nyt voimme yhdistää tietokantaan näin ja luoda sinne taulun `visitors`:

```prompt
$ fly postgres connect -a tsoha-visitors-db
postgres=# CREATE TABLE visitors (id SERIAL PRIMARY KEY, time TIMESTAMP);
postgres=# \q
```

Olisimme myös voineet luoda taulun näin ohjaamalla sinne tiedoston `schema.sql` komennot:

```prompt
$ fly postgres connect -a tsoha-visitors-db < schema.sql
```

Kun Fly.io luo tietokannan, se asettaa samalla ympäristömuuttujan `DATABASE_URL`, minkä ansiosta sovellus toimii suoraan myös tuotannossa, jos se käyttää tätä ympäristömuuttujaa. Voimme tarkastaa sovelluksen ympäristömuuttujat näin:

```prompt
$ fly secrets list
NAME        	DIGEST          	CREATED AT
DATABASE_URL	e26ed699c4d898b8	1h29m ago
```

Fly.io ei paljasta ympäristömuuttujien sisältöä, vaan näet vain, minkä nimisiä muuttujia projektissa on.

Voimme myös asettaa ympäristömuuttujia tarvittaessa itse. Esimerkiksi istuntojen käyttäminen vaatii muuttujan `SECRET_KEY` asettamista, mikä onnistuu näin:

```prompt
$ fly secrets set SECRET_KEY=(avain tähän)
```

### Sovelluksen julkaiseminen

Nyt kaikki alkaa olla valmista ja voimme julkaista sovelluksen:

```prompt
$ fly deploy
```

Fly.io tekee automaattisesti _health checkin_ projektille jokaisen julkaisun yhteydessä. Jos nämä testit eivät mene läpi, sovelluksen uuden version julkaisu perutaan ja palataan aiempaan versioon. Vastaasi tulee todennäköisesti seuraavanlainen virheviesti:

```prompt
2022-10-19T21:46:49Z   [info]    raise exc.NoSuchModuleError(
2022-10-19T21:46:49Z   [info]sqlalchemy.exc.NoSuchModuleError: Can't load plugin: sqlalchemy.dialects:postgres
```

Tämä johtuu `SQLAlchemy`-kirjastossa version 1.3.23 jälkeen tapahtuneesta muutoksesta tietokantaosoitteen käsittelyssä. Kun se ennen hyväksyi sekä `postgresql://`- että `postgres://`-alkuiset osoitteet, sen uusimmat versiot hyväksyvät vain `postgresql://`-alkuiset osoitteet. Fly.io antaa tietokannan osoitteen ''väärässä'' muodossa, joten helppo korjaus tälle on määrittää tietokannan osoite koodissa seuraavanlaisesti ja tehdä uusi julkaisu.

```python
app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL").replace("://", "ql://", 1)
```

Toinen vaihtoehto olisi päivittää SQLAlchemyn versio `requirements.txt`-tiedostossa versioon 1.3.23, mutta tämä tarkoittaisi myös Flask-SQLAlchemy-kirjaston version päivittämistä versioon 2.x.x.

Kun sovellus on julkaistu, voimme avata sen selaimeen

```prompt
$ fly open
```

Jos kaikki meni hyvin, tuloksena on:

<img class="screenshot" src="../assets/osa-3/fly.png">
