---
layout: chapter
title: Osa 1
nav-title: Osa 1
sub-sections:
    - link-url: johdatus
      sub-section-title: Johdatus web-sovelluksiin
    - link-url: tietokanta
      sub-section-title: Tietokannan käyttäminen
    - link-url: tuotantoon
      sub-section-title: Sovellus tuotantoon
---
# Osa 1

Tässä osassa tutustumme kurssilla käytettäviin työkaluihin:

* Flask on suosittu Python-kirjasto, jonka avulla voimme luoda web-sovelluksia.
  Flask soveltuu sekä web-ohjelmoinnin opetteluun että todellisten sovellusten alustaksi.
* PostgreSQL on avoimen lähdekoodin tietokantajärjestelmä, joka on tavallinen
  valinta web-sovelluksen taustalla olevaksi tietokannaksi.
* Heroku on pilvipalvelu, jonka avulla pystymme harjoittelemaan ilmaiseksi
  web-sovelluksen siirtämistä julkisesti nettiin kaikkien käytettäväksi.

Kurssin materiaali olettaa, että osaat perusasiat Python-ohjelmointikielestä.
Jos et tunne kieltä ennestään, sinun kannattaa ensin käydä pikakurssi [tästä](TODO).


{% include_relative johdatus.md %}
{% include_relative tietokanta.md %}
{% include_relative tuotantoon.md %}
