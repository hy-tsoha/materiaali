---
hidden: true
---

# Sivun ulkoasun suunnittelu ja toteutus

Tässä osiossa käydään läpi verkkosivun ulkoasun suunnittelun vaiheita. Materiaalin ei ole tarkoitus olla valmiiksi käytettävä pohja, vaan se kertoo ulkoasun suunnittelun vaiheista ja siitä, kuinka ulkoasu rekentuu pala kerrallaan.

Verkkosivun ulkoasua muokataan käyttämällä CSS-koodia ja oletuksena on, että se on lukijalle tuttua.

## 1. Vaihe - Yksinkertainen layout

Jotta sivun voi muotoilla sopivasti, täytyy ensin miettiä sivun rakennetta.

Tehdään yksinkertainen verkkosivu, jossa on kolme komponenttia. Navigaatio eli valikko on `<nav>`-elementin sisällä, sivun otsikko on `<h1>`-elementin sisällä ja sivun sisältö on kirjoitettu otsikon alle `<div>`-elementin sisälle. Huomion arvoinen on myös `<head>`-elementin sisältä löytyvä `<meta name='viewport' content='width=device-width, initial-scale=1'>` rivi, joka tekee sivusta responsiivisen erikokoisille näytöille.

_Mitä nav-elementti tekee?_

_Mitä tarkoittaa responsiivisuus?_

_Mitä tuo meta-tagi tekee siis? Miten se vaikuttaa sivun näkymiseen? Voisiko sen esitellä myöhemmin niin, että ensin näkee miten sivu toimii ilman sitä huonosti ja sen lisäämisen jälkeen toimii hyvin?_

```html
<html>
    <head>
        <link rel="stylesheet" href="assets/main.css">
        <meta name='viewport' content='width=device-width, initial-scale=1'>
    </head>
    <body>
        <nav>
            <ol>
                <li><a href="#">Sivu 1</a></li>
                <li><a href="#">Sivu 2</a></li>
                <li><a href="#">Sivu 3</a></li>
            </ol>
        </nav>
        <h1>Tsoha App</h1>
        <div>
            Tsoha App on esimerkkisivusto siitä, miten yksinkertainen verkkosivu on muotoiltu.
        </div>
    </body>
</html>
```

_Googlen tyyliohje (https://google.github.io/styleguide/htmlcssguide.html) suosittelee, että turhat tagit (kuten html ja head) jätetään pois ja sisennyksen leveys on 2 merkkiä._

_Miksi linkit tehdään listan avulla (voisi luulla että listan on allekkain)? Miksi ol eikä ul?_

Kun miettii miten nämä kolme komponenttia halutaan esittää sivulla on otettava huomioon, miten käyttäjä käyttää sivua. Mitä käyttäjä näkee kun hän avaa sivun ensimmäisen kerran? Onko valikko helppo löytää? Tunnistaako käyttäjä millä sivulla on? 

Piirtämällä paperille sivun rakenteen on helppoa lähteä sijoittamaan asioita oikeisiin kohtiin. Tämän sivun layout-suunnitelma on kuvan mukainen.

![suunnitelma]({{ '/assets/img/tsoha-app1.jpg' | relative_url }})

_On hyvä että on kuva suunnitelmasta, mutta siitä ei näe nyt kovin hyvin, missä on mitäkin (esim. missä on valikko)._

Kun suunnitelma on valmis, voidaan aloittaa sivun tyylin toteuttaminen. Muotoillaan ensin valikko. Valikko on jo valmiina `nav`-tagien sisällä, joten riittää, että muotoillaan tämä alue.

```css
nav {
    border-bottom: 1px solid black;
    margin: 0;
    text-align: center;
    width: 100%;
}
```

_Mitä margin tekee tässä? (ok tulee myöhemmin, voisi kuitenkin lyhyesti mainita mikä on margin ja mikä on padding, vai tulisiko tämä HTML-oppaaseen?)_

Valikko sijoitetaan sivun yläosaan ja se on koko sivun levyinen. Järjestetään vielä valikon linkit riviin. `padding`-attribuutille on annettaan kaksi parametria, josta ensimmäinen kertoo, pystysuoran tilan elementin sisällä ja toinen kertoo vaakasuoran tilan elementin ympärillä. Parametrien määrällä pystyy kertomaan, mihin tilaa lisätään. Esimerkiksi edellisessä `nav`-elementin muotoilussa yksi parametri `margin`-attribuutille kertoi, että muotoilu lisättiin jokaiseen reunaan.

```css
nav li{
    display: inline-block;
    color: #000;
    padding: 0 0.5em;
}
```

_Tässä siis inline-block muuttaa merkittävästi listan näyttämistapaa?_

Muotoilun jälkeen voidaan havaita katsomalla sivua selaimessa, että navigaation alle piirretty viiva ei mene sivun päästä päähän, vaan reunoihin jää pieni rako. Avaamalla selaimen konsoli painamalla `F12` näppäintä ja tutkimalla `Inspector`-välilehdessä sivun rakennetta kohdasta `Box Model`, nähdään että `body`-elementille tulee automaattisesti marginaalia jokaiseen reunaan 8 pikseliä.

![tsoha-app]({{ '/assets/img/tsoha-app2.png' | relative_url }})

Poistetaan `body`-elementin marginaali asettamalla sen arvoksi 0. Samalla voidaan asettaa miellyttävämpi fontti sivulle.

```css
body {
    margin: 0;
    font-family: 'Helvetica', 'Arial', sans-serif;
}
```

Käyttäjän huomio halutaan kiinnittää sivun otsikkoon, sillä niin käyttäjä tunnistaa helposti, millä sivulla hän on. Tehdään otsikolle oma `div`-elementti, joka helpottaa sen muotoilua.

```html
<div class="header">
<h1>Tsoha App</h1>
</div>
```

_Miksi ei voi muotoilla suoraan h1-elementtiä? Miksi luokka vaikka on vain yksi otsikko?_

Kiinnitetään käyttäjän huomio otsikkoon laittamalla sille värikäs taustaväri suurempaan laatikkoon ja määrittelemällä otsikon fontti näkyväksi.

_Näkyväksi?_

```css
.header{
    background-color: sandybrown;
    font-weight: bold;
    padding: 2em 1em;
    font-size: 2em;
}
```

Suunnitelman perusteella haluamme keskittää sivun sisällön näytöllä. Tehdään siis `div`-elementti `page-wrapper`, jonka sisälle asetetaan otsikko ja sivun sisältö eli

```html
<html>
...
        <div class="page-wrapper">
            <div class="header">
                <h1>Tsoha App</h1>
            </div>
            <div>
            Tsoha App on esimerkkisivusto siitä, miten yksinkertainen verkkosivu on muotoiltu.
            </div>
        </div>
    </body>
</html>
```

Muotoillaan `div`-elementti siten, että se on keskellä sivua.

```css
.page-wrapper {
    max-width: 45rem;
    margin: auto;   
}
```

_Miksi nyt on rem, kun äsken oli em? Mitä margin:auto tekee? Sisältö menee maagisesti keskelle sen seurauksena?_

Nyt sivusto näyttää suurin piirtein siltä, mitä suunniteltiinkin. Teksti on kuitenkin epämiellyttävän lähellä otsikkoa, joten annetaan sille luokka `content` ja muotoillaan se kauemmas otsikosta.

```html
<html>
...
            <div class="header">
                <h1>Tsoha App</h1>
            </div>
            <div class="content">
            Tsoha App on esimerkkisivusto siitä, miten yksinkertainen verkkosivu on muotoiltu.
            </div>
...
```

_Myös tässä: miksi tehdään luokka kun kyse on yksittäisen elementin muotoilusta?_

Asetetaan sisällölle tilaa ylhäälle.

```css
.content {
    padding-top: 2em;
}
```

Nyt pohja on valmiina ja voi alkaa ideoimaan ulkoasua tunnistettavammaksi. Ensimmäisessä vaiheessa on hyvä eriyttää sivulta yhtenevät kokonaisuudet ja antaa niille omat kuvaavat luokat, joiden perusteella kokonaisuuksien ulkoasua lähdetään muokkaamaan.

## 2. vaihe

Sivu jäi hyvin yksinkertaiseksi ja simppeliksi. Lähdetään tekemään ulkoasusta tunnistettavampaa. Aloitetaan lisäämällä taustaväri sivulle.

```css
html {
    background-color: grey;
}
```

_Miksi html-elementissä? Pitäisikö olla body-elementissä? Miksi background-color eikä background?_

Taustaväri tulee myös sisällölle ja valikolle, joten vaihdetaan niiden taustaväri valkoiseksi lisäämällä `nav` ja `.content` kentille attribuutit `background-color: rgb(226, 226, 226);`.

_Mistä tämä 226 taiottiin? Eikö valkoinen ole 255?_

Tämä aiheuttaa sen, että valikon yläreunaan jää harmaa viiva. Tutkimalla valikkoa selaimen konsolilla nähdään, että `ol`-tägi on aiheuttanut automaattista marginaalia sivun yläreunaan. Asetetaan valikon `ol` elementin marginaaliksi 0, mutta lisätään siihen paddingia sisäpuolelle, jotta valikko ei kapene liikaa.

```css
nav ol {
    margin: 0;
    padding: 1em 0;
}
```

Sivun sisällön ulkoasu näyttää myös ikävältä, sillä se on aivan kiinni alareunassa laatikkonsa alareunassa. Muutetaan `.content`-elementin `padding` arvoa niin, ettei teksti ole aivan taustan reunoissa kiinni. Kolme arvoa `padding`-kentässä määrittävät järjestyksessä yläreunan, vaakasuoran ja alareunan tilan.

```css
.content {
    background-color: rgb(226, 226, 226);
    padding: 2em 1em 2em;
}
```

Sivun värien lisääminen ja päättäminen on haastavaa, sillä värit jakavat mielipiteitä paljon. Hyvän väriskaalan voi saada esimerkiksi käyttämällä yhtä pääväriä ja sen erisävyjä. Valitsemalla päävärin lisäksi korostusvärin, joka kiinnittää käyttäjän huomion saadaan aikaiseksi miellyttävä kokonaisuus.

## 3. vaihe

Väritettynäkin sivuston ilme on hieman kulmikas vielä. Lähdetään rakentamaan ilmettä hieman pehmeämmäksi. Aloitetaan pyöristämällä sisällön kulmat. 

```css
.content {
    background-color: rgb(226, 226, 226);
    padding: 2em 1em 2em;
    border-radius: 0.5em;
}
```

Nyt näyttää oudolta, että vain sisällön reunat on pyöristetyjä, joten pyöristetään myös otsikon kulmat

```css
.header {
    background-color: sandybrown;
    font-weight: bold;
    padding: 2em 1em;
    font-size: 2em;
    border-radius: 0.5em;
}
```

_Mistä sandybrown keksittiin?_

Otsikko ja sisältö ovat liian lähellä toisiaan, joten lisätään marginaalia sisällölle.

```css
.content {
    background-color: rgb(226, 226, 226);
    padding: 2em 1em 2em;
    border-radius: 0.5em;
    margin: 2em 0 2em;
}
```

Valikko ei sovi enää ollenkaan sivun tyyliin, joten muokataan sitä. Visioidaan, että navigaatioonkin halutaan lisätä pehmeyttä. Aloitetaan poistamalla valikon laatikkomaisuus.

_Miten tässä poistuu laatikkomaisuus?_

```css
nav {
    margin: 0;
    text-align: center;
    width: 100%;
}
```

Ja tehdään linkeistä enemmän erillisten painikkeiden näköisiä.

```css
nav li{
    display: inline-block;
    color: #000;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    background-color: rgb(226, 226, 226);
}
```

Otetaan valikon linkeistä alleviivaus pois ja määritetään linkin väri.

```css
nav li a {
    text-decoration: none;
    color: #000;
}
```

Kun lisätään ominaisuus, että valikon objekti tummenee, kun hiiri viedään päälle, niin käyttäjälle tulee vaikutelma painikkeesta.

_Mikä on valikon objekti?_

```css
nav li:hover {
    background-color: rgb(226, 226, 226);
}
```

Listan `padding` vaikuttaa nyt turhalta, sillä valikon sisällä ei ole enää mitään, mitä pitäisi suurentaa. Otetaan se siis pois. Lisätään kuitenkin tilaa valikkoon marginaalilla.

```css
nav {
    margin: 0.5em 0 1em 0;
    text-align: center;
    width: 100%;
}
```

Sivulla on nyt tunnistettava ulkoasu. Sivun lopullinen ilme näyttää [tältä](https://millakortelainen.github.io/tsoha-app/).

_Valikko ei ole nyt ihan keskellä, siellä on jotain outoa marginaalia (?) vasemmalla. Tsoha App -alue tuntuu selkeästi liian korkealta näytölläni._

Lopulliseen ulkoasuun päädyttiin, kun haluttiin tuoda pehmeyttä sivulle. Keksittiin siis juoni, jota haluttiin lähteä toteuttamaan. Keskittymällä johonkin toiseen ominaisuuteen tai vaihtamalla komponenttien sijoittelua olisi ulkoasu voinut päätyä erilaiseksi.

_Ehkä tuolla sivulla voisi olla vielä yksinkertainen lomake (sisäänkirjautuminen)? Tulisi houkuttelevan ja aidon näköinen esimerkki, kun on palvelu odottamassa kirjautujaa._

Tällä sivulla ei ollut tarvetta taulukolle, lomakkeelle tai kuvalle, mutta niiden lisääminen sivulle aiheuttaa lisää tarvetta ulkoasun suunnittelulle ja muokkaamiselle. Kun tarve muiden komponenttien suunnitelulle ilmenee apuna on [Mozillan dokumentaatio CSS:stä](https://developer.mozilla.org/fi/docs/Web/CSS). On myös kätevää hakea suoraan Googlesta tiettyä elementtiä tai CSS-ominaisuutta ja lisätä haun loppuun kirjaimet `mdn`, jolloin hakutuloksista löytyy Mozillan dokumentaatio.
