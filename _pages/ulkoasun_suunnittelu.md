---
hidden: true
---

# Sivun ulkoasun suunnittelu ja toteutus

<!--- TODO mieti miten form muotoillaan sivulla. --->

Tässä osiossa käydään läpi verkkosivun ulkoasun suunnittelun vaiheita. Materiaalin ei ole tarkoitus olla valmiiksi käytettävä pohja, vaan se kertoo ulkoasun suunnittelun vaiheista ja siitä, kuinka ulkoasu rekentuu pala kerrallaan.

Verkkosivun ulkoasua muokataan käyttämällä CSS-koodia ja oletuksena on, että se on lukijalle tuttua.

## 1. Vaihe - Yksinkertainen layout

Jotta sivun voi muotoilla sopivasti, täytyy ensin miettiä sivun rakennetta.

Tehdään yksinkertainen verkkosivu, jossa on neljä komponenttia. Navigaatio eli valikko on `<nav>`-elementin sisällä, sivun otsikko on `<h1>`-elementin sisällä, kirautumislomake `<form>`-elementissä ja sivun sisältö on kirjoitettu otsikon alle `<div>`-elementin sisälle. Huomion arvoinen on myös dokumentin alusta löytyvä `<meta name='viewport' content='width=device-width, initial-scale=1'>` rivi, joka tekee sivusta responsiivisen erikokoisille näytöille. Tällöin sivun sisältö skaalauttuu käyttäjän näytön koon perusteella. 

_Mitä nav-elementti tekee?_ 💭 Elementti ei tee mitään itsessään. Se on konventio merkitä navigaatiota. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav

_Mitä tarkoittaa responsiivisuus?_ 💭 Lisätty  tekstiin responsiivisuudesta

_Mitä tuo meta-tagi tekee siis? Miten se vaikuttaa sivun näkymiseen? Voisiko sen esitellä myöhemmin niin, että ensin näkee miten sivu toimii ilman sitä huonosti ja sen lisäämisen jälkeen toimii hyvin?_ 💭 Meta tägi siis vaikuttaa sivun näkymiseen mobiililaitteessa. En näe syytä miksi se pitäisi esitellä myöhimmin, sillä todennäköisesti lukijalla ei ole tarvetta testata sivua mobiililaitteella, jolloin hän ei huomaa sivun huonosti toimivuutta. Tämä on enemmän rivi, jonka olen tottunut laittamaan sivulle, jotta se toimii varmasti myös mobiilissa.

```html
<!DOCTYPE html>
<link rel="stylesheet" href="assets/main.css">
<meta name='viewport' content='width=device-width, initial-scale=1'>
<body>
  <nav>
    <ol>
      <li><a href="#">Sivu 1</a></li>
      <li><a href="#">Sivu 2</a></li>
      <li><a href="#">Sivu 3</a></li>
	</ol>
  </nav>
  <h1>Tsoha App</h1>
  <form action="" method="POST">
    <label for="username">Tunnus:</label>
    <input type="text" name="username">
	<label for="password">Salasana:</label>
	<input type="password" name="password">
	<input type="submit" value="Kirjaudu">
  </form>
  <div>
    Tsoha App on esimerkkisivusto siitä, miten yksinkertainen verkkosivu on muotoiltu.
  </div>
</body>
```

_Googlen tyyliohje (https://google.github.io/styleguide/htmlcssguide.html) suosittelee, että turhat tagit (kuten html ja head) jätetään pois ja sisennyksen leveys on 2 merkkiä._ 💭 Kiitos hyödyllisesta linkistä, en tiennytkään että tällainen on olemassa.

_Miksi linkit tehdään listan avulla (voisi luulla että listan on allekkain)? Miksi ol eikä ul?_ 💭 Tässä ei ole väliä kumpaa käyttää. Itse käytän ol-listaa sillä valikon linkit ovat järjestyksessa, joten ordered list (ol) tuntuu luonnollisemmalta valinnalta kuin unordered list (ul)

Kun miettii miten nämä neljä komponenttia halutaan esittää sivulla on otettava huomioon, miten käyttäjä käyttää sivua. Mitä käyttäjä näkee kun hän avaa sivun ensimmäisen kerran? Onko valikko helppo löytää? Tunnistaako käyttäjä millä sivulla on? 

Ulkoasun _layout:a_ eli yleisilmettä ja komponenttien sijoittamista kannattaa miettiä esimerkiksi piirtämällä paperille.
<!--- TODO piirrä parempi kuva
Piirtämällä paperille sivun rakenteen on helppoa lähteä sijoittamaan asioita oikeisiin kohtiin. Tämän sivun layout-suunnitelma on kuvan mukainen.

![suunnitelma]({{ '/assets/img/tsoha-app1.jpg' | relative_url }})
-->
_On hyvä että on kuva suunnitelmasta, mutta siitä ei näe nyt kovin hyvin, missä on mitäkin (esim. missä on valikko)._ 💭 Tähän pitää tehdä parempi kuva, jossa näkyy myös kirjautumislomake.

Kun suunnitelma on valmis, voidaan aloittaa sivun tyylin toteuttaminen. Muotoillaan ensin valikko. Valikko on jo valmiina `nav`-tagien sisällä, joten riittää, että muotoillaan tämä alue. Valikko sijoitetaan sivun yläosaan ja se on koko sivun levyinen.

```css
nav {
    border-bottom: 1px solid black;
    margin: 0;
    text-align: center;
    width: 100%;
}
```

_Mitä margin tekee tässä? (ok tulee myöhemmin, voisi kuitenkin lyhyesti mainita mikä on margin ja mikä on padding, vai tulisiko tämä HTML-oppaaseen?)_ 💭 Paddingista ja mariginsta on jo lapiossa, niin en kertonut tässä siitä. Sen voisi lisätä oppaaseen tai sitten linkata lapion sivulle.

Järjestetään vielä valikon linkit riviin käyttämällä `display: inline-block` määrettä. `padding`-attribuutille annettaan kaksi parametria, joista ensimmäinen kertoo pystysuoran tilan ja toinen kertoo vaakasuoran tilan elementin sisällä. Parametrien määrällä kerrotaan, mihin tilaa lisätään. Esimerkiksi edellisessä `nav`-elementin muotoilussa yksi parametri `margin`-attribuutille kertoi, että muotoilu lisättiin jokaiseen reunaan.

```css
nav li{
    display: inline-block;
    color: #000;
    padding: 0 .5em;
}
```

_Tässä siis inline-block muuttaa merkittävästi listan näyttämistapaa?_ 💭 Lisätty tekstiin, että määreellä asetetaan valikon linkin riviin

Muotoilun jälkeen voidaan havaita katsomalla sivua selaimessa, että navigaation alle piirretty viiva ei mene sivun päästä päähän, vaan reunoihin jää pieni rako. Avaamalla selaimen konsoli painamalla `F12` näppäintä ja tutkimalla `Inspector`-välilehdessä sivun rakennetta kohdasta `Box Model`, nähdään että `body`-elementille tulee automaattisesti marginaalia jokaiseen reunaan 8 pikseliä.

![tsoha-app]({{ '/assets/img/tsoha-app2.png' | relative_url }})

Poistetaan `body`-elementin marginaali asettamalla sen arvoksi 0. Samalla voidaan asettaa miellyttävämpi fontti sivulle.

```css
body {
    margin: 0;
    font-family: 'Helvetica', 'Arial', sans-serif;
}
```

Käyttäjän huomio halutaan kiinnittää sivun otsikkoon, jotta käyttäjä tunnistaa helposti, millä sivulla hän on. Tehdään otsikolle oma `div`-elementti, joka helpottaa sen muotoilua.

```html
<div class="header">
  <h1>Tsoha App</h1>
</div>
```

_Miksi ei voi muotoilla suoraan h1-elementtiä? Miksi luokka vaikka on vain yksi otsikko?_ 💭 Konventiona layouteissa on eriyttää kuvaavat kokonaisuudet omiksi luokikseen. ID:tä käytetään yleensä vain jos on jotain todella erityista. Headeriin voi laittaa myös muutakin kuin vain värin. Siihen voisi laittaa myös kuvan taustalle tai lisää tekstiä esimerkiksi h2-tason otsikkoon tai ihan vain tekstielementiin. Ei kannata muotoilla suoraa h1-elementtiä, sillä h1-tason otsikkoa voidaan käyttää myös tekstin seassa, jos sisällön tuottaja tai seuraava devaaja ole tietoinen, että h1 tason otsikko on vain header otiskko, jolloin layout, menee rikki.

Kiinnitetään käyttäjän huomio otsikkoon laittamalla sille värikäs taustaväri, kasvattamalla sille varattua aluetta ja määrittelemällä otsikon fontti suuremmaksi.

_Näkyväksi?_ 💭 Muutettu selkeämmäksi.

```css
.header {
    background-color: sandybrown;
    font-weight: bold;
    padding: 2em 1em;
    font-size: 2em;
}
```

Suunnitelman perusteella haluamme keskittää sivun sisällön näytöllä. Tehdään siis `div`-elementti `page-wrapper`, jonka sisälle asetetaan otsikko, kirjautuminen ja sivun sisältö.

```html
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
```

Muotoillaan `div`-elementti siten, että se on keskellä sivua.

```css
.page-wrapper {
    max-width: 45rem;
    margin: auto;   
}
```

_Miksi nyt on rem, kun äsken oli em? Mitä margin:auto tekee? Sisältö menee maagisesti keskelle sen seurauksena?_ 💭 em ja rem on suhteellisia kokoja, jotka määräytyy sivun fontin koon perusteella. rem ottaa kokonsa juuri elementtinsä fonttikoosta ja em ottaa kokonsa parent elementtinsä koosta. Tässä tapauksessa ei ole väliä kumpaa käyttää. margin: auto tekee juuri tämän. Se keskittää elementin.

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

_Myös tässä: miksi tehdään luokka kun kyse on yksittäisen elementin muotoilusta?_ 💭 Sama vastaus kun edellä, layoutissa paketoidaan loogiset kokonaisuudet luokkiin. Content-luokassa vielä korostuu se, että niitä voi olla tarve laittaa sivulle useita.

Asetetaan sisällölle tilaa ylhäälle.

```css
.content {
    padding-top: 2em;
}
```

Nyt pohja on valmiina ja voi alkaa ideoimaan ulkoasua tunnistettavammaksi. Ensimmäisessä vaiheessa on hyvä eriyttää sivulta yhtenevät kokonaisuudet ja antaa niille omat kuvaavat luokat, joiden perusteella kokonaisuuksien ulkoasua lähdetään muokkaamaan.

## 2. vaihe

Sivu jäi hyvin yksinkertaiseksi. Lähdetään tekemään ulkoasusta tunnistettavampaa. Aloitetaan lisäämällä taustaväri sivulle.

```css
html {
    background: grey;
}
```

_Miksi html-elementissä? Pitäisikö olla body-elementissä? Miksi background-color eikä background?_ 💭 vaihdettu background:ksi. html on aina koko sivu, joten sen voi ajatella koko sivun taustaväriksi

Taustaväri tulee myös sisällölle ja valikolle, joten vaihdetaan niiden taustaväri valkoiseksi lisäämällä `nav` ja `.content` kentille attribuutit `background: white;`.

_Mistä tämä 226 taiottiin? Eikö valkoinen ole 255?_ 💭 vaihdettu valkoiseksi

Tämä aiheuttaa sen, että valikon yläreunaan jää harmaa viiva. Tutkimalla valikkoa selaimen konsolilla nähdään, että `ol`-tägi on aiheuttanut automaattista marginaalia sivun yläreunaan. Asetetaan valikon `ol` elementin marginaaliksi 0, mutta lisätään siihen paddingia sisäpuolelle, jotta valikko ei kapene liikaa.

```css
nav ol {
    margin: 0;
    padding: 1em 0;
}
```

Sivun sisällön muotoilu näyttää myös ikävältä, sillä se on aivan kiinni alareunassa laatikkonsa alareunassa. Muutetaan `.content`-elementin `padding` arvoa niin, ettei teksti ole aivan taustan reunoissa kiinni. Kolme arvoa `padding`-kentässä määrittävät järjestyksessä yläreunan, vaakasuoran ja alareunan tilan.

```css
.content {
    background: white;
    padding: 2em 1em 2em;
}
```

Sivun värien lisääminen ja päättäminen on haastavaa, sillä värit jakavat mielipiteitä paljon. Hyvän väriskaalan voi saada esimerkiksi käyttämällä yhtä pääväriä ja sen erisävyjä. Valitsemalla päävärin lisäksi korostusvärin, joka kiinnittää käyttäjän huomion saadaan aikaiseksi miellyttävä kokonaisuus.

## 3. vaihe

Väritetyn sivuston ilme on hieman kulmikas vielä. Lähdetään rakentamaan ilmettä hieman pehmeämmäksi. Aloitetaan pyöristämällä sisällön kulmat. 

```css
.content {
    background: white;
    padding: 2em 1em 2em;
    border-radius: .5em;
}
```

Nyt näyttää oudolta, että vain sisällön reunat on pyöristetyjä, joten pyöristetään myös otsikon kulmat

```css
.header {
    background: sandybrown;
    font-weight: bold;
    padding: 2em 1em;
    font-size: 2em;
    border-radius: .5em;
}
```

_Mistä sandybrown keksittiin?_ 💭 Header väri asetettiin jo ensimmäisessä osassa. Se on väri joka näytti hyvältä ja kiinnittää huomion.

Otsikko ja sisältö ovat liian lähellä toisiaan, joten lisätään marginaalia sisällölle.

```css
.content {
    background: white;
    padding: 2em 1em 2em;
    border-radius: 0.5em;
    margin: 2em 0 2em;
}
```

Valikko ei sovi enää ollenkaan sivun tyyliin, joten muokataan sitä. Visioidaan, että navigaatioonkin halutaan lisätä pehmeyttä. Aloitetaan poistamalla valikon laatikkomaisuutta ottamalla alaviiva ja taustaväri pois.

_Miten tässä poistuu laatikkomaisuus?_ 💭 tekstiä muokattu

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
    padding: .5em 1em;
    border-radius: .5em;
    background: white;
}
```

Otetaan valikon linkeistä alleviivaus pois ja määritetään linkin väri.

```css
nav li a {
    text-decoration: none;
    color: #000;
}
```

Lisätään ominaisuus valikon linkin taustaväri tummenee, kun hiiri viedään päälle, niin käyttäjälle tulee vaikutelma painikkeesta.

_Mikä on valikon objekti?_ 💭 muutettu tekstiä

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

Poistetaan myös itse listan `padding`, jotta valikko asettuu keskelle sivua.

```css
nav ol {
    margin: 0;
    padding: 0;
}
```

Sivulla on nyt tunnistettava ulkoasu. Sivun lopullinen ilme näyttää [tältä](https://millakortelainen.github.io/tsoha-app/) ja sen koodi on nähtävissä [github repossa](https://github.com/millakortelainen/tsoha-app).

_Valikko ei ole nyt ihan keskellä, siellä on jotain outoa marginaalia (?) vasemmalla. Tsoha App -alue tuntuu selkeästi liian korkealta näytölläni._ 💭 Marginaali on otettu pois. Header alue, josta puhut on tarkoituksella korkea, jotta se kiinnittää huomion. Tällainen tyyliseikka on suunnittelijan ratkaisu tehdä sivusta näyttävämpi.

Lopulliseen ulkoasuun päädyttiin, kun haluttiin tuoda pehmeyttä sivulle. Keksittiin siis juoni, jota haluttiin lähteä toteuttamaan. Keskittymällä johonkin toiseen ominaisuuteen tai vaihtamalla komponenttien sijoittelua olisi ulkoasu voinut päätyä erilaiseksi.

_Ehkä tuolla sivulla voisi olla vielä yksinkertainen lomake (sisäänkirjautuminen)? Tulisi houkuttelevan ja aidon näköinen esimerkki, kun on palvelu odottamassa kirjautujaa._ 💭 Lisätty kirjautumislomake

Tällä sivulla ei ollut tarvetta taulukolle, lomakkeelle tai kuvalle, mutta niiden lisääminen sivulle aiheuttaa lisää tarvetta ulkoasun suunnittelulle ja muokkaamiselle. Kun tarve muiden komponenttien suunnitelulle ilmenee apuna on [Mozillan dokumentaatio CSS:stä](https://developer.mozilla.org/fi/docs/Web/CSS). On myös kätevää hakea suoraan Googlesta tiettyä elementtiä tai CSS-ominaisuutta ja lisätä haun loppuun kirjaimet `mdn`, jolloin hakutuloksista löytyy Mozillan dokumentaatio.
