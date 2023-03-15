---
title: Arvostelu
---

# Arvostelu

Tälle sivulle on koottu asiat, jotka kurssin ohjaaja käy läpi työsi arvostelussa. Kurssi arvostellaan asteikolla 1–5 sen mukaan, miten hyvin vaatimukset toteutuvat sovelluksessasi.

Tutustu myös [tekniseen tarkastuslistaan]({% link _pages/tekninen_tarkastuslista.md %}), johon on koottu yhteen ohjeita versionhallinnasta, ohjelmointityylistä, tietokanta-asioista ja tietoturvasta.

### Perusvaatimukset

* On toteutettu web-sovellus Pythonilla/Flaskilla
* Sovelluksen aihe on sopiva kurssille (ks. [aiheen valinta]({% link _pages/aiheen_valinta.md %}))
* Sovelluksen koodi on saatavilla versionhallinnassa
* Sovellus on testattavissa tuotantopalvelimella
* Sovelluksessa on tietokanta, jossa on noin 5–10 taulua
* Tietokantaa käsitellään monipuolisesti SQL-komennoilla

<mark>HUOM! Vuoden 2023 alusta alkaen sovelluksen ei tarvitse olla testattavissa tuotantopalvelimella. Riittää, että sen saa käynnistettyä paikallisesti.
Lisätietoja <a href="/materiaali/aikataulu#huomio-flyiosta">täällä</a>.</mark>

### Toimivuus ja käytettävyys

* Sovellus toimii, kun käyttäjä testaa sitä
* Sovellusta on miellyttävää käyttää
* Käyttäjälle on selvää, mitä sovelluksen toiminnot tekevät
* Jos käyttäjä antaa väärää tietoa, tästä tulee selkeä ilmoitus
* Sovelluksen käyttöliittymä ja ulkoasu ovat viimeisteltyjä

### Versionhallinta

* Commitit ovat hyviä kokonaisuuksia ja niissä on hyvät viestit
* Commit-viestit on kirjoitettu englanniksi
* Versionhallinnassa ei ole sinne kuulumattomia tiedostoja
* Tiedosto `README.md` antaa hyvän kuvan sovelluksesta

### Ohjelmointityyli

* Koodin muotoilu seuraa Pythonin tyyliohjetta
* Koodi on kirjoitettu englanniksi
* Koodi on selkeää, suoraviivaista ja tiivistä
* Koodi on jaettu järkevästi osiin moduuleiksi ja funktioiksi
* Koodi on yhdenmukaista sovelluksen eri osissa

### Tietokanta-asiat

* Tietokanta on suunniteltu järkevästi
* Taulut ja sarakkeet on nimetty englanniksi
* Taulut ja sarakkeet on nimetty kuvaavasti ja yhdenmukaisesti
* Tauluissa on käytetty viiteavaimia ja tarvittaessa muita määreitä
* Koodissa ei tehdä asioita, jotka voi mielekkäästi tehdä SQL:ssä

### Tietoturva

* Versionhallinnassa ei ole salaista tietoa
* Salasanat tallennetaan tietokantaan asianmukaisesti
* Käyttäjän syötteet tarkastetaan ennen tietokantaan tallentamista
* Käyttäjä ei pääse käsiksi tietoon, johon hänellä ei ole oikeutta
* Sovelluksessa ei ole SQL-injektiota eikä XSS- ja CSRF-haavoittuvuuksia

### Palaute

* Opiskelija antoi hyödyllistä vertaispalautetta muille opiskelijalle
* Opiskelija antoi kurssin lopussa kurssipalautteen
* Tämä osio ei ole mukana itsenäisen suorituksen arvioinnissa
