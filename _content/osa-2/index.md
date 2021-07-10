---
nav-title: Osa 2
permalink: /osa-2/
sub-sections:
      - sub-section-title: Tietokannan käyttäminen
      - sub-section-title: "Esimerkki: Kyselyt"
      - sub-section-title: Istunnot ja kirjautuminen
      - sub-section-title: Hakutoiminto
      - sub-section-title: Tiedon poistaminen
---
# Osa 2

Käytämme kurssilla [PostgreSQL](https://www.postgresql.org/)-tietokantaa, joka on suosittu avoimen lähdekoodin tietokantajärjestelmä. Tämä osa käsittelee tietokannan käyttöönottoa sekä SQL-komentojen suorittamista web-sovelluksessa.

PostgreSQL on erilainen tietokanta kuin kurssilla _Tietokantojen perusteet_ käytetty tietokanta SQLite. Tämän kurssin kannalta erot ovat kuitenkin pieniä. Taustamateriaalissa on vertailu [SQLite vs. PostgreSQL]({% link _pages/sqlite_postgre.md %}), joka antaa yhteenvedon tietokantojen eroista.

{% include_relative tietokanta.md %}
{% include_relative esimerkki.md %}
{% include_relative istunnot.md %}
{% include_relative hakutoiminto.md %}
{% include_relative poistaminen.md %}
