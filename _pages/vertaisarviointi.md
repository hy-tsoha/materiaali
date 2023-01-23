---
title: Vertaisarviointi
hidden: true
---

# Vertaisarviointi

Vertaisarvioinnissa tutustut toisen kurssin opiskelijan työhön ja annat siitä palautetta. Vastavuoroisesti saat omasta työstäsi palautetta toiselta opiskelijalta.

Vertaisarvioinnin ohje:

1. Löydät linkin arvioitavan työn GitHub-sivulle Labtoolista.
2. Tutustu ensin sovellukseen käyttämällä sitä tuotannossa eli Fly.iossa olevassa versiossa. Kiinnitä huomiota siihen, miten sovellus toimii ja onko sitä mukava käyttää. Jos vertaisarvioitava sovellus ei ole Fly.iossa, kloonaa arviotava repositorio omalle koneellesi ja käynnistä se ohjeiden mukaan itse.
3. Tämän jälkeen käy läpi sovelluksen koodi ja tietokannan rakenne. Mieti, mitä asioita sovelluksen toteutuksessa voisi parantaa.
4. Lisää arvioitavan työn GitHub-sivulle issue, jossa raportoit kohdissa 2 ja 3 huomaamasi asiat. Koeta kirjoittaa raportti niin, että se auttaa työn tekijää.
5. Lisää URL-osoite (linkki) kirjoittamaasi issueen Labtooliin. Varmista linkkiä lisätessäsi, että linkin alussa on protokollan määrittely `https`.

Huomaa, että "Hyvältä näyttää" tms. ei ole riittävä raportti. Jos työ on jo hyvässä vaiheessa, voit huomauttaa myös pienemmistä asioista. Älä kuitenkaan kirjoita mitään raporttiin vain sen takia, että siihen tulisi enemmän pituutta.

Kun saat palautteen työstäsi toiselta opiskelijalta, mieti, miten voisit parantaa työtä palautteen avulla. Usein ulkopuolinen huomaa asioita, joihin ei ole kiinnittänyt itse huomiota. Kuitenkin voi olla myös, että ei kannata noudattaa palautteen neuvoja.

Jos yrität käynnistää vertaisarviotavaa sovellusta paikallisesti, ota huomioon, että vertaisarviotavassa sovelluksessa saattaa olla samannimisiä tietokantatauluja kuin omassa sovelluksessasi. Tämä voi aiheuttaa ongelmia, kun yrität määrittää vertaisarviotavan projektin tietokantaskeemaa. Voit luoda vertaisarviointia varten Postgresiin oman tietokannan seuraavasti:

```prompt
$ psql
user=# CREATE DATABASE <tietokannan-nimi>;
```

Voit nyt määrittää vertaisarvioitavan projektin tietokantaskeeman omasta tietokannastasi erilliseen tietokantaan komennolla

```prompt
$ psql -d <tietokannan-nimi> < schema.sql
```

Määritä vielä tietokannan osoite projektille siten, että osoite päättyy luomasi tietokannan nimeen.
Esimerkiksi, jos omalla sovelluksellasi osoite on muotoa `postgresql:///user` ja loit vertaisarviontia varten tietokannan nimeltä `testi`,
tulisi uudeksi tietokannan osoitteeksi `postgresql:///testi`.
