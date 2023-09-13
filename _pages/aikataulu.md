---
title: Aikataulu ja ohjeet
---

# Aikataulu ja ohjeet

Syksyn 2023 ryhmän aikataulu on seuraava:

| ti 5.9.2023 | Aloitusluento 16:15 alkaen ([Luentotallenne](https://www.helsinki.fi/fi/unitube/video/7c0b6d8b-c807-40b1-857b-d4e8f1aa238a)) |
| su 10.9.2023 | Välipalautus 1 |
| su 24.9.2023 | Välipalautus 2 |
| pe 29.9.2023 | Vertaisarvioinnin deadline |
| su 8.10.2023 | Välipalautus 3 |
| pe 13.10.2023 | Vertaisarvioinnin deadline |
| su 22.10.2023 | Lopullinen palautus |

Ryhmän ohjaajat ovat Joonatan Huang, Markus Kaihola ja Sani Kemppainen.

Kurssin ohjausta järjestetään kurssin Telegram-ryhmässä, jossa on paikalla kurssin ohjaajia ja opiskelijoita.

Löydät [arvostelusivulta]({% link _pages/arvostelu.md %}) tietoa siitä, mitä vaatimuksia kurssilla on ja miten työsi arvostellaan.

## Kurssin eteneminen

Kurssiin kuuluu kolme välipalautusta ja lopullinen palautus. Kaikkien palautusten deadline on klo 23:59 sunnuntaina.

### Välipalautus 1

* Luo GitHubiin julkinen repositorio harjoitustyötä varten. Nimeä repositoriosi kuvaavasti.
* Valitse projektille aihe ja kirjoita `README.md`-tiedostoon kuvaus, joka esittelee sovelluksen keskeiset toiminnot. [Kuinka valita aihe?]({% link _pages/aiheen_valinta.md %}) Mitä paremmin kuvailet aihettasi, sitä paremmin ohjaaja ymmärtää aiheesi ja voi kommentoida sitä.
* Kirjaudu [Labtooliin](https://study.cs.helsinki.fi/labtool/courses/TKT20019.2023.S.K.2) ja ilmoita siellä projektisi GitHub-osoite.
* Saat seuraavan viikon alussa ohjaajalta palautteen aiheesta Labtooliin.

### Välipalautus 2

* Tavoitteena on, että sovelluksella on toimiva pohja ja keskeiset toiminnot ovat hyvässä vaiheessa.
* `README.md`-tiedoston tulee kuvata, mikä on sovelluksen nykyinen tilanne ja miten sitä pystyy testaamaan tuotannossa.
* Saat seuraavan viikon alussa ohjaajalta palautteen sovelluksesta Labtooliin.

### Välipalautus 3

* Tavoitteena on, että sovellus on viimeistelyä vaille valmis.
* `README.md`-tiedoston tulee kuvata, mikä on sovelluksen nykyinen tilanne ja miten sitä pystyy testaamaan tuotannossa.
* Saat seuraavan viikon alussa ohjaajalta palautteen sovelluksesta Labtooliin.

### Vertaisarviointi

Kurssiin kuuluu kaksi vertaisarviointia, joissa annetaan palautetta toisen opiskelijan työstä. Saat ohjeet vertaisarviointiin sähköpostitse välipalautusten 2 ja 3 jälkeen.
Linkin katselmoitavaan repositorioon löydät Labtoolista. [Vertaisarvioinnin ohje]({% link _pages/vertaisarviointi.md %})

### Lopullinen palautus

* Kurssi arvostellaan tämän sovelluksen version perusteella.
* `README.md`-tiedoston tulee kuvata, millainen lopullinen sovellus on ja miten sitä pystyy testaamaan tuotannossa.
* Ohjaaja arvostelee työn ja antaa palautetta Labtooliin. Ohjaaja ilmoittaa kurssin arvosanan kuukauden kuluessa.
* Anna lisäksi [kurssipalaute](https://norppa.helsinki.fi/targets/72437208) palautuksen deadlineen mennessä.

## Huomio Fly.iosta

Koska Fly.io vaatii ilmaisiinkin sovelluksiin maksutietojen syöttämisen palveluun, kurssilla ei toistaiseksi vaadita sovelluksen viemistä tuotantoon.
Halutessasi voit viedä sovelluksesi Fly.ioon materiaalin osan 3 [ohjeiden](/materiaali/osa-3) mukaan.

Jos sovelluksesi ei ole testattavissa Fly.iossa, mainitsehan asiasta `README.md`-tiedostossa ja lisäät ohjeet sovelluksen käynnistämiseen paikallisesti, jotta ohjaajat ja vertaisarvioijat pystyvät testaamaan sovellustasi. Alla on esimerkki ohjeista sovelluksen paikalliseen käyttöön.

### Esimerkki käynnistysohjeista

Kloonaa tämä repositorio omalle koneellesi ja siirry sen juurikansioon. Luo kansioon `.env`-tiedosto ja määritä sen sisältö seuraavanlaiseksi:

```
DATABASE_URL=<tietokannan-paikallinen-osoite>
SECRET_KEY=<salainen-avain>
```

Seuraavaksi aktivoi virtuaaliympäristö ja asenna sovelluksen riippuvuudet komennoilla

```prompt
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -r ./requirements.txt
```

Määritä vielä tietokannan skeema komennolla

```prompt
$ psql < schema.sql
```

Nyt voit käynnistää sovelluksen komennolla

```prompt
$ flask run
```

## Ohjeita

* Ennen sovelluksen toteuttamisen aloittamista sinun kannattaa tutustua huolellisesti kurssisivuston materiaaliin ja tehdä pieniä kokeiluja, jotta saat harjoiteltua kurssilla käytettyjä tekniikoita.
* Neuvoja tietokannan suunnitteluun löydät kurssin _Tietokantojen perusteet_ materiaalista. Erityisesti kurssin materiaalin [luku 6](https://tikape.mooc.fi/syksy-2023/content/osa-6/) on hyödyllinen.
* Sovellus ja tietokanta rakentuvat pikkuhiljaa ja niihin tulee muutoksia. Kannattaa aloittaa yksinkertaisesta ja muuttaa rakennetta tarvittaessa myöhemmin.
* Palautuksissa ohjaaja tutustuu projektiisi GitHubin ja Fly.io:n kautta. Pidä huoli siitä, että sovelluksen ajantasainen versio on saatavilla näissä paikoissa.
* Sovelluksen dokumentaatio luodaan tiedostoon `README.md`, joka näkyy GitHubissa projektin etusivulla. Kirjoita dokumentaatio sellaista henkilöä varten, joka haluaa saada käsityksen sovelluksesta ja mahdollisesti ottaa sen käyttöön itse tai kehittää sovellusta.
* Oleellinen asia kurssilla on sovelluksen toimivuus: millainen käyttökokemus tulee testaajalle, joka käyttää sovellusta tuotannossa. Jos sovellus ei toimi, muut osa-alueet eivät voi pelastaa sitä.
* Jos jokin asia kurssilla on epäselvä, niin otathan yhteyttä ohjaajaan tai kurssin vastuuhenkilöön.
