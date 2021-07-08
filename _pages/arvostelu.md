---
title: Arvostelu
---

# Arvostelu

Tälle sivulle on koottu asiat, jotka kurssin ohjaaja käy läpi työsi arvostelussa. Kurssi arvostellaan asteikolla 1–5 sen mukaan, miten hyvin tämän sivun vaatimukset täyttyvät sovelluksessasi.

Sinun kannattaa myös tutustua [tekniseen tarkastuslistaan]({% link _pages/tekninen_tarkastuslista.md %}), johon on koottu yhteen ohjeita versionhallinnasta, ohjelmointityylistä, tietokanta-asioista ja tietoturvasta.

### Perusvaatimukset

* On toteutettu tietokantaa käyttävä web-sovellus
* Sovelluksen koodi on saatavilla versionhallinnassa
* Sovellus on testattavissa tuotantopalvelimella
* Sovelluksessa on tietokanta, jossa on noin 5–10 taulua
* Tietokantaa käsitellään monipuolisesti SQL-komennoilla

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
* Koodi on jaettu järkevästi osiin tiedostoiksi ja funktioiksi
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
* Sovelluksessa ei ole XSS- ja CSRF-haavoittuvuuksia eikä SQL-injektiota

### Palaute

* Annoit hyödyllistä vertaispalautetta muille opiskelijalle
* Annoit kurssin lopussa kurssipalautteen
