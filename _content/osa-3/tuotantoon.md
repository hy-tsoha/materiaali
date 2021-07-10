## Sovellus tuotantoon

Sovelluksen laittaminen _tuotantoon_ tarkoittaa, että sovellus julkaistaan käyttäjille. Tällä kurssilla harjoittelemme tuotantoon laittamista [Heroku](https://heroku.com/)-palvelun avulla. Heroku tarjoaa ilmaiseksi palvelintilaa, jonne voi sijoittaa muun muassa Flaskilla toteutetun web-sovelluksen.

Käymme läpi seuraavaksi esimerkin, jossa siirrämme äsken luodun kävijäsovelluksen Herokuun. Jotta voit käyttää Herokua, sinun täytyy luoda ensin tunnus palveluun. Tunnuksen luominen on ilmaista, mutta huomaa, että Heroku tarjoaa myös maksullisia palveluja.

Herokun ilmaisversiossa on joitakin merkittäviä rajoituksia. Sovellus saa käyttää rajoitetun määrän palvelimen aikaa kuukaudessa, ja jos sovellusta ei käytetä hetkeen, se sulkeutuu ja seuraavan käyttäjän saapuessa vie jonkin verran aikaa, ennen kuin sovellus käynnistyy uudestaan. Lisäksi tietokannan kokoa on rajoitettu niin, että tauluissa saa olla yhteensä enintään 10000 riviä. Näiden rajoitusten vuoksi Herokun ilmaisversio ei sovellu todellisten sovellusten alustaksi, mutta sen avulla voi harjoitella web-sovelluksen julkaisemista.

Herokussa olevaa sovellusta voidaan hallinnoida kahdella tavalla: nettiselaimella Herokun sivuston [hallintapaneelin](https://dashboard.heroku.com/) kautta tai omalle koneelle asennettavan [komentorivityökalun](https://devcenter.heroku.com/articles/heroku-cli) avulla. Seuraava ohje näyttää, miten komentorivityökalu toimii.

### Komentorivityökalu

Komentorivityökalun käyttö alkaa kirjautumalla sisään:

```prompt
$ heroku login
heroku: Press any key to open up the browser to login or q to exit:
```

Komento avaa nettiselaimen, jonka kautta pystyy kirjautumaan Herokuun. Kirjautumisen jälkeen komentorivityökalu on käyttökunnossa.

Komento `heroku help` (tai pelkkä `heroku`) näyttää listan komentorivityökalun komennoista. Vastaavasti voi myös pyytää neuvoa tietyn komennon käyttämisestä: esimerkiksi `heroku apps help` kertoo, miten komentoa `heroku apps` käytetään.

### Sovelluksen luonti

Seuraava komento luo uuden Heroku-sovelluksen nimellä `tsoha-visitors`:

```prompt
$ heroku apps:create tsoha-visitors
Creating ⬢ tsoha-visitors... done
https://tsoha-visitors.herokuapp.com/ | https://git.heroku.com/tsoha-visitors.git
```

Jokaisella Herokussa olevalla sovelluksella tulee olla yksilöllinen nimi. Tämän materiaalin kirjoitushetkellä kukaan ei ollut luonut sovellusta nimellä `tsoha-visitors`, joten sovelluksen luonti onnistui. Kuitenkaan et voi itse luoda tämän nimistä sovellusta, koska se on jo olemassa. Jos et anna sovellukselle nimeä, sille tulee automaattisesti satunnainen nimi. Jos teet sovelluksen vain kokeilua tai tätä kurssia varten, satunnainen nimi riittää hyvin.

Sovellus julkaistaan Herokussa lähettämällä haluttu sovelluksen versio Herokun git-repositorioon. Tämän voi tehdä kytkemällä paikallisen repositorion Herokuun, kuten teemme tässä ohjeessa, tai vaihtoehtoisesti Herokun GitHub-integraation kautta.

Voimme kytkeä paikallisen repositorion Herokuun näin:

```prompt
$ heroku git:remote -a tsoha-visitors
```

Tämä komento määrittää, että tässä hakemistossa olevan sovelluksen repositorio kytketään Herokun sovelluksen `tsoha-visitors` repositorioon. Voimme tarkastella komennon vaikutusta seuraavasti:

```prompt
$ git remote -v
heroku	https://git.heroku.com/tsoha-visitors.git (fetch)
heroku	https://git.heroku.com/tsoha-visitors.git (push)
origin	https://github.com/user/tsoha-visitors.git (fetch)
origin	https://github.com/user/tsoha-visitors.git (push)
```

Tästä näkee, että oletuskohde `origin` osoittaa edelleen GitHubiin, mutta uutena on kohde `heroku`, joka lähettää sovelluksen Herokuun. Lähetys tapahtuisi näin:

```prompt
$ git push heroku main
```

Emme voi kuitenkaan lähettää sovellusta vielä, koska se ei ole Heroku-yhteensopiva, vaan sovellukseen täytyy tehdä ensin joitakin muutoksia.

### Palvelimen määrittely

Tähän asti olemme käynnistäneet sovelluksen komennolla `flask run`, mutta tätä tapaa ei suositella tuotantokäyttöön. Tämän vuoksi asennamme Herokua varten erillisen Gunicorn-palvelimen:

```prompt
(venv) $ pip install gunicorn
```

Tämän jälkeen tiedosto `requirements.txt` tulee saattaa ajan tasalle:

```prompt
(venv) $ pip freeze > requirements.txt
```

Lisäksi luomme sovelluksen päähakemistoon uuden tiedoston `Procfile`, joka kertoo Herokulle, miten sovellus käynnistetään:

```
web: gunicorn app:app
```

Tämä kertoo Herokulle, että tyyppiä "web" oleva sovellus käynnistetään komennolla `gunicorn app:app`. Tässä ensimmäinen `app` viittaa moduulin nimeen `app.py` ja toinen `app` viittaa koodissa luotavan Flask-olion nimeen.

Tässä vaiheessa on hyvä laittaa muutokset talteen versionhallintaan:

```prompt
$ git add requirements.txt
$ git add Procfile
$ git commit -m "Add Heroku config"
$ git push
```

### Tietokanta ja ympäristömuuttujat

Seuraava komento luo Heroku-sovellukselle tietokannan:

```prompt
$ heroku addons:create heroku-postgresql
```

Tämän jälkeen voimme yhdistää tietokantaan näin ja luoda sinne taulun `visitors`:

```prompt
$ heroku psql
tsoha-visitors::DATABASE=> CREATE TABLE visitors (id SERIAL PRIMARY KEY, time TIMESTAMP);
tsoha-visitors::DATABASE=> \q
```

Olisimme myös voineet luoda taulun näin ohjaamalla sinne tiedoston `schema.sql` komennot:

```prompt
$ heroku psql < schema.sql
```

Kun Heroku luo tietokannan, se asettaa samalla ympäristömuuttujan `DATABASE_URL`, minkä ansiosta sovellus toimii suoraan myös Herokussa, jos se käyttää tätä ympäristömuuttujaa. Voimme tarkastaa sovelluksen ympäristömuuttujat näin:

```prompt
$ heroku config
=== tsoha-visitors Config Vars
DATABASE_URL: postgres://(tietokannan osoite näkyy tässä)
```

Huomaa, että tietämällä Herokun tietokannan osoitteen siihen pääsee yhdistämään myös sovelluksen ulkopuolelta, joten tietokannan osoite on salassa pidettävää tietoa.

Voimme myös asettaa ympäristömuuttujia tarvittaessa itse. Esimerkiksi istuntojen käyttäminen vaatii muuttujan `SECRET_KEY` asettamista, mikä onnistuu näin:

```prompt
$ heroku config:set SECRET_KEY=(avain tähän)
```

### Sovelluksen lähetys

Nyt kaikki alkaa olla valmista ja voimme koettaa lähettää sovelluksen Herokuun:

```prompt
$ git push heroku main
remote: Compressing source files... done.
remote: Building source:
remote: 
remote: -----> Python app detected
remote: -----> Requirements file has been changed, clearing cached dependencies
remote: -----> Installing python-3.6.10
remote: -----> Installing pip
remote: -----> Installing SQLite3
remote: -----> Installing requirements with pip
remote:        ERROR: Invalid requirement: 'pkg-resources=0.0.0' (from line 8 of /tmp/build_b6f49f8f28a88afca0c79ce857e4849b/requirements.txt)
```

Jotain meni kuitenkin pieleen: tiedostossa `requirements.txt` oleva riippuvuus `pkg-resources` ei kelpaa Herokulle. Tämä on tunnettu ongelma, ja tässä tapauksessa toimiva korjaus on poistaa kyseinen rivi tiedostosta, päivittää muutos versionhallintaan ja yrittää uudestaan:

```prompt
$ git push heroku main
remote: Compressing source files... done.
remote: Building source:
remote: 
remote: -----> Python app detected
remote: -----> No change in requirements detected, installing from cache
remote: -----> Installing SQLite3
remote: -----> Installing requirements with pip
remote: -----> Discovering process types
remote:        Procfile declares types -> web
remote: 
remote: -----> Compressing...
remote:        Done: 48.2M
remote: -----> Launching...
remote:        Released v8
remote:        https://tsoha-visitors.herokuapp.com/ deployed to Heroku
```

Tällä kertaa prosessi saatiin vietyä loppuun ja voimme mennä katsomaan sovellusta osoitteessa [https://tsoha-visitors.herokuapp.com/](https://tsoha-visitors.herokuapp.com/). Jos kaikki meni hyvin, tuloksena on:

<img class="screenshot" src="../assets/osa-3/heroku.png">

Entä jos sovellus ei toimikaan? Tällä hetkellä Herokussa aiheuttaa ongelmia SQLAlchemyn versio 1.4 tai uudempi, jossa ei toimi Herokun muodostama tietokannan osoite. Helppo tapa korjata asia on vaihtaa tiedostoon `requirements.txt` aiempi SQLAlchemyn versio, kuten ylempänä näkyvä versio 1.3.23. Lisätietoa ja vaihtoehtoinen korjaustapa on [Herokun ohjeissa](https://help.heroku.com/ZKNTJQSK/why-is-sqlalchemy-1-4-x-not-connecting-to-heroku-postgres).
