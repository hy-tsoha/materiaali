---
---

# Sivun ulkoasu

Kun tehdään web-sovellusta tai täysin staattista verkkosivua, niin sivun ulkoasu on se mikä käyttäjälle jää mieleen. Sivun ulkoasu vaikuttaa myös sivun käytettävyyteen. Näppärimmälläkin verkonselaajalla menee hermo, jos hän ei pysty löytämään tietoa sivulta helposti. Selkeällä ulkoasulla voimme vähentää sivun käyttäjien päänvaivaa huomattavasti. 

Verkkosivun ulkoasua muokataan käyttämällä CSS:ssää. Usein sivun ulkoasun saa paremmaksi lyhyelläkin CSS-tiedostolla.

Jotta sivun voi muotoilla sopivasti, täytyy ensin miettiä sivun rakennetta. Usein sivulla on jonkinlainen valikko, jolla pystyy navigoimaan sivuston sivujen välillä ja lisäksi vähintään itse sisältö, minkä sivusto näyttää. Lisäksi sivulla on useimmiten jokin otsikko tai nimi, josta sivun tunnistaa ja joka kertoo käyttäjälle mistä sivusta on kyse. Tämä otsikko tai nimi voi olla esimerkiksi yrityksen nimi, kurssin nimi tai sovelluksen nimi. Oletetaan siis, että sivulla on seuraava rakenne
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
        <div>
        <h1>Tsoha App</h1>
        
            Tsoha App on esimerkkisivusto siitä, miten yksinkertainen verkkosivu on muotoiltu.
        </div>
    </body>
</html>
```

Kun miettii miten nämä kolme komponenttia halutaan esittää sivulla on otettava huomioon, miten käyttäjä käyttää sivua. Mitä käyttäjä näkee kun hän avaa sivun ensimmäisen kerran? Onko valikko helppo löytää? Tunnistaako käyttäjä millä sivulla on? Myös esimerkiksi paperille voi hahmotella, miltä sivun haluaa näyttävän. Tämän sivun layout-suunnitelma on seuraava

![suunnitelma]({{ '/assets/img/tsoha-app1.jpg' | relative_url }})

Muotoillaan ensin valikko. Valikko on jo valmiina `nav`-tagien sisällä, joten riittää, että muotoillaan tämä alue. 

```css
nav {
    border-bottom: 1px solid black;
    margin: 0;
    text-align: center;
    width: 100%;
}
```

Suunnittelu kuvasta ei välttämättä välitys, mutta valikko tulee sivun yläosaan ja se on koko sivun levyinen. Järjestetään vielä linkit riviin.

```css
nav li{
    display: inline-block;
    color: #000;
    padding: 0 0.5em;
}
```

Tämän jälkeen voidaan havaita, että navigaation alle piirretty viiva ei mene sivun päästä päähän, vaan sinne jää pieni rako. Avaamalla selaimen konsoli painamalla `F12` näppäintä ja tutkimalla `Inspector`-välilehdessä sivun rakennetta oikealla näkyvästä kohdasta `Box Model`, voidaan huomata, että `body`:lle tulee automaattisesti marginaalia jokaiseen reunaan 8 pikseliä.

![tsoha-app]({{ '/assets/img/tsoha-app2.png' | relative_url }})

Asetetaan `body`:n marginaaliksi `0`. Samalla voidaan asettaa miellyttävämpi fontti sivulle.

```css
body {
    margin: 0;
    font-family: 'Helvetica', 'Arial', sans-serif;
}
```

Käyttäjän huomio halutaan kiinnittää sivun otsikkoon. Tehdään tämä niin, että otsikko laitetaan keskitetysti värikkään laatikon sisään. Laitetaan otsikko oman `div`-tagin sisään ja annetaan luokaksi `header`.

```html
<div class="header">
<h1>Tsoha App</h1>
</div>
```

Nyt voidaan muotoilla otsikon sisältö.

```css
.header{
    background-color: sandybrown;
    font-weight: bold;
    padding: 2em 1em;
    font-size: 2em;
}
```

Annetaan vielä koko sivun paketoivalle `div`-elementille luokka `page-wrapper`, jotta saamme sisällön keskitettyä.

```html
<html>
...
        <div class="page-wrapper">
            <div class="header">
                <h1>Tsoha App</h1>
            </div>
            Tsoha App on esimerkkisivusto siitä, miten yksinkertainen verkkosivu on muotoiltu.
        </div>
    </body>
</html>
```

Annetaan luokalle `page-wrapper` tyyli

```css
.page-wrapper {
    max-width: 45rem;
    margin: auto;   
}
```
Nyt sivusto näyttää kuta kuinkin siltä, mitä suunniteltiinkin. Teksti on kuitenkin epämiellyttävän lähellä otsikkoa, joten laitetaan se omaan `div`-elementtiin ja lisätään sille tilaa ympärille `padding`:lla.

```html
<html>
...
        <div class="page-wrapper">
            <div class="header">
                <h1>Tsoha App</h1>
            </div>
            <div class="content">
            Tsoha App on esimerkkisivusto siitä, miten yksinkertainen verkkosivu on muotoiltu.
            </div>
        </div>
    </body>
</html>
```

```css
.content {
    padding-top: 2em;
}
```

Yksinkertaisuudessaan tämä on hyvä pohja lähteä liikkeelle sivun ulkoasussa. Sivun laajetessa ulkoasu lähtee vasta kehittymään, kune herää tarve muotoilla esimerkiksi taulukot tai syötekentät halutun näköiseksi. Tarpeena voi olla yksin sekin, että sivustosta halutaan tietyn näköinen.



## 2. vaihe

Sivu jäi hyvin yksinkertaiseksi ja simppeliksi. Lähdetään tekemään ulkoasusta tunnistettavampaa. Aloitetaan lisäämällä taustaväri sivulle.

```css
html {
    background-color: grey;
}
```

Taustaväri ikään kuin syö navigaation ja itse sivun sisällön, joten vaihdetaan niiden väri.

Lisätään css-selektoreille nav ja .content attribuutti `background-color: rgb(226, 226, 226);`. Tämä aiheuttaa sen, että navigaatio menee rikki. Tutkimalla navigaatiota jälleen selaimen konsolilla nähdään, että `ol`-tägi on aiheuttanut automaattista marginaalia sivun yläreunaan. Asetetaan navigaation ol-listan marginaaliksi 0, mutta lisätään siihen paddingia sisäpuolelle.

```css
nav ol {
    margin: 0;
    padding: 1em 0;
}
```

Myös siältö näyttää hieman aneemiselta, sillä se on aivan kiinni alareunassa. Tämäkin korjaantuu lisäämällä paddingia.

Tässä kappaleessa lisäsimme värit sivulle. Värien lisääminen on aina tyyli kysymys ja hyvien vaihtoehtojen löytäminen voi viedä aikaa. Hyvän väriskaalan voi saada esimerkiksi käyttämällä yhtä pääväriä ja käyttämällä sen erisävyjä. Tähän voidaan sitten lisätä jokin korostusväri, joka voidaan lisätä kiinnittämään käyttäjän huomio. 

## 3. vaihe

Lähdetään rakentamaan sivulle vielä uniikimpaa ilmettä. 

Tuodaan pehmeyttä sivulle pyöristämällä sisällön kulmat. 

```css
.content {
    background-color: rgb(226, 226, 226);
    padding: 2em 1em 2em;
    border-radius: 1em;
}
```

Nyt näyttää oudolta, että vain siällön reunat on pyöristetyjä, joten pyöristetään myös otsikon kulmat

```css
.header{
    background-color: sandybrown;
    font-weight: bold;
    padding: 2em 1em;
    font-size: 2em;
    border-radius: 0.5em;
}
```

Lisätään marginaalia sisällölle, koska näyttää ahtaalta, että otsikko ja sisältö ovat vierekkäin.

```css
.content {
    background-color: rgb(226, 226, 226);
    padding: 2em 1em 2em;
    border-radius: 0.5em;
    margin: 2em 0 2em;
}
```

Nyt navigaatio ei sovi enää ollenkaa sivun tyylliin, joten muokataan sitä. Visioidaan, että navigaatiosta tehdään saman näköinen kuin sivun muotoilusta. Aloitetaan poistamalla valikon laatikkomaisuus.

```css
nav {
    margin: 0;
    text-align: center;
    width: 100%;
}
```

Ja tehdään linkeistä enemmän painikkeen tapaisia.

```css
nav li{
    display: inline-block;
    color: #000;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    background-color: rgb(226, 226, 226);
}
```

Otetaan linkeistä alleviivaus pois ja määritetään linkin väri. Tekstin värin voi ottaa pois nav li selektorista.

```css
nav li a {
    text-decoration: none;
    color: #000;
}
```

Kun lisätään ominaisuu, että linkki tummenee, kun hiiri viedään päälle, niin käyttäjälle tulee ilmi että kyseessä on linkki.

```css
nav li:hover {
    background-color: rgb(226, 226, 226);
}
```

Itse listan padding vaikuttaa nyt turhalta,joten otetaan se pois. Lisätään kuitenkin tilaa navigaatioon.

```css
nav {
    margin: 0.5em 0 1em 0;
    text-align: center;
    width: 100%;
}
```

Sivulla on nyt tunnistettava ulkoasu. 

Ulkoasun lopullinen tyyli saavutettiin, kun haluttiin tuoda pehmeyttä sivulle pyöristämällä sisällön reunat. Siitä idea lähti laajentumaan ja oikeastaan kaikesta tuli pyöristettyä. Tämä ei ole ainoa mahdollinen lopputulos ulkoasulle ja myös värit tuovat sivulle tietyn ilmeen.

Kokeileminen on usein paras tapa lähteä toteuttamaan ulkoasua. Voi myös miettiä, minkälaista tyyliä haluaa lähteä toteuttamaan. Sivun ulkonäöstä tuskin koskaan voi olla yksimielinen, esimerkiksi jo väri valinnat voivat aiheuttaa eriäviä mielipiteitä. Tärkeintä ulkoasua suunniteltaessa on se, että sivuston tärkeimmät asiat on helposti löydettävissä ja sivusto toimii itsessään.

Useimmiten et voi myös verkkosivua tehdessäsi suunnitella mitään, mitä ei voisi toteuttaa. Toiset suunnitelman vaativat enemmän aikaa kuin toiset, joten kannattaa lähteä liikkeelle yksinkertaisesta ja laajentaa sitä. Ei ole ollut vielä ideaa, jota ei olisi voinut toteuttaa rohkealla googlaamisella.