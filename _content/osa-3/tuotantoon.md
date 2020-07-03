## Sovellus tuotantoon

Sovelluksen laittaminen _tuotantoon_ tarkoittaa, että sovellus julkaistaan käyttäjille. Tällä kurssilla harjoittelemme tuotantoon laittamista [Heroku](https://heroku.com/)-palvelun avulla. Heroku tarjoaa ilmaiseksi palvelintilaa, jonne voi sijoittaa muun muassa Flaskilla toteutetun web-sovelluksen.

Käymme läpi seuraavaksi esimerkin, jossa siirrämme äsken luodun kävijäsovelluksen Herokuun. Jotta voit käyttää Herokua, sinun täytyy luoda ensin tunnus palveluun. Tunnuksen luominen on ilmaista, mutta huomaa, että Heroku tarjoaa myös maksullisia palveluja.

Herokun ilmaisversiossa on joitakin merkittäviä rajoituksia: sovellus saa käyttää rajoitetun määrän palvelimen aikaa kuukaudessa, tietokanta ei saa olla suuri ja sovelluksen käynnistämisessä on odotusvaihe. Tämän vuoksi Herokun ilmaisversio ei sovellu todellisten sovellusten alustaksi, mutta sen avulla voi harjoitella web-sovelluksen julkaisemista.

Herokussa olevaa sovellusta voidaan hallinnoida kahdella tavalla: nettiselaimella Herokun sivuston [hallintapaneelin](https://dashboard.heroku.com/) kautta tai komentorivityökalulla (Heroku CLI). Käytämme tässä ohjeessa komentorivityökalua, jonka asentamiseen löydät ohjeet [tästä](https://devcenter.heroku.com/articles/heroku-cli).

### Sovelluksen luonti

Komentorivityökalun käyttäminen alkaa kirjautumalla sisään:

```bash
$ heroku login
heroku: Press any key to open up the browser to login or q to exit:
```

Komento avaa nettiselaimen, jonka kautta pystyy kirjautumaan Herokuun. Kirjautumisen jälkeen komentorivityökalu on käyttökunnossa.

Seuraava komento luo uuden sovelluksen nimellä `tsoha-visitors`:

```bash
$ heroku apps:create tsoha-visitors
Creating ⬢ tsoha-visitors... done
https://tsoha-visitors.herokuapp.com/ | https://git.heroku.com/tsoha-visitors.git
```

Jokaisella Herokussa olevalla sovelluksella tulee olla eri nimi. Tämän materiaalin kirjoitushetkellä kukaan ei ollut luonut sovellusta nimellä `tsoha-visitors`, joten sovelluksen luonti onnistui. Komento kertoo myös nettiosoitteen, jonne sovellus tulee ilmestymään. Jos et anna sovellukselle nimeä, Heroku määrittää sovellukselle automaattisesti nimen. Jos aiot käyttää sovellustasi vain lyhyttä kokeilua tai tätä kurssia varten, Herokun määrittämä nimi on aivan riittävä, eikä varaa turhaan yksilöllisempää nimeä.

Tavallinen tapa käyttää Herokua on kytkeä paikallinen Git-repositorio Herokuun, tai vaihtoehtoisesti voit kytkeä [Herokun Github-integraation](https://devcenter.heroku.com/articles/github-integration) sovellukseesi.

Paikallisen Git-repositorion kautta käyttäminen tapahtuu seuraavalla komennolla, kun olemme sovelluksen hakemistossa:

```bash
$ heroku git:remote -a tsoha-visitors
```

Tämä komento lisää uuden kohteen, jonne voimme lähettää repositorion sisällön. Voimme tarkastella tilannetta komennolla `git remote`:

```bash
$ git remote -v
heroku	https://git.heroku.com/tsoha-visitors.git (fetch)
heroku	https://git.heroku.com/tsoha-visitors.git (push)
origin	https://github.com/pllk/tsoha-visitors.git (fetch)
origin	https://github.com/pllk/tsoha-visitors.git (push)
```

Tästä näkee, että oletuskohde `origin` osoittaa edelleen GitHubiin, mutta uutena on kohde `heroku`, joka lähettää sovelluksen Herokuun. Lähetys tapahtuisi näin:

```bash
$ git push heroku master
```

Emme voi kuitenkaan lähettää sovellusta vielä, koska se ei ole Heroku-yhteensopiva, vaan sovellukseen täytyy tehdä ensin joitakin muutoksia.

### Sovelluksen valmistelu

Tähän asti olemme käynnistäneet sovelluksen komennolla `flask run`, mutta tämä tapa ei sovellu tuotantokäyttöön. Asennamme Herokua varten Gunicorn-palvelimen:

```bash
$ pip install gunicorn
```

Tämän jälkeen tiedosto `requirements.txt` tulee saattaa ajan tasalle:

```bash
$ pip freeze > requirements.txt
```

Lisäksi luomme sovelluksen päähakemistoon uuden tiedoston `Procfile`, joka kertoo Herokulle, miten sovellus käynnistetään:

```
web: gunicorn app:app
```

Tämä tarkoittaa, että sovellus käynnistetään komennolla `gunicorn app:app`. Voimme testata tätä myös paikallisesti näin:

```bash
$ export DATABASE_URL=postgresql:///pllk
$ gunicorn app:app
```

Huomaa, että Gunicornia käytettäessä tiedostossa `.env` olevat ympäristömuuttujat eivät toimi, minkä vuoksi määritämme tietokannan osoitteen antavan ympäristömuuttujan `export`-komennolla ennen palvelimen käynnistämistä.

### Tietokanta Herokussa

Seuraava komento luo Heroku-sovellukselle tietokannan:

```bash
$ heroku addons:create heroku-postgresql
```

Tämän jälkeen voimme yhdistää tietokantaan näin ja luoda sinne taulun `visitors`:

```bash
$ heroku psql
tsoha-visitors::DATABASE=> CREATE TABLE visitors (id SERIAL PRIMARY KEY, time TIMESTAMP);
tsoha-visitors::DATABASE=> \q
```

Olisimme myös voineet luoda taulun näin ohjaamalla sinne tiedoston `schema.sql` komennot:

```bash
$ heroku psql < schema.sql
```

Huomaa, että Herokun ilmaisversion tietokanta on tarkoitettu harjoitteluun ja siinä on merkittävä rajoitus: tietokannan tauluissa saa olla yhteensä enintään 10000 riviä. Niinpä Herokussa ei voi pitää ilmaiseksi sovellusta, jossa on suuri tietokanta.

### Sovelluksen lähetys

Nyt kaikki alkaa olla valmista ja voimme koettaa lähettää sovelluksen Herokuun:

```bash
$ git push heroku master
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

Jotain meni kuitenkin pieleen: tiedostossa `requirements.txt` oleva riippuvuus `pkg-resources` ei kelpaa Herokulle. Tässä tapauksessa toimiva korjaus on poistaa kyseinen rivi tiedostosta ja yrittää uudestaan:

```bash
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

Tällä kertaa prosessi saatiin vietyä loppuun ja voimme mennä katsomaan sovellusta osoitteessa `https://tsoha-visitors.herokuapp.com/`. Jos kaikki meni hyvin, tuloksena on:

TODO: Kuva tähän
