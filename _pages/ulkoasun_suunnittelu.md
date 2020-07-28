---
title: Ulkoasun suunnittelu
hidden: true
---

# Sivun ulkoasun suunnittelu ja toteutus

Tässä osiossa käydään läpi verkkosivun ulkoasun suunnittelun vaiheita. Materiaalin ei ole tarkoitus olla valmiiksi käytettävä pohja, vaan se kertoo ulkoasun suunnittelun vaiheista ja siitä, kuinka ulkoasu rekentuu pala kerrallaan.

Verkkosivun ulkoasua muokataan käyttämällä CSS-koodia ja oletuksena on, että se on lukijalle tuttua.

## 1. Vaihe - Yksinkertainen layout

Jotta sivun voi muotoilla sopivasti, täytyy ensin miettiä sivun rakennetta.

Tehdään yksinkertainen verkkosivu, jossa on viisi komponenttia. Sivun otsikko on `<h1>`-elementin sisällä, navigaatio eli valikko on `<nav>`-elementissä, kirjautumislomake `<form>`-elementissä ja sivun sisältö rakentuu toisen tason otsikosta `<h2>`-elementin sisällä, sekä tekstistä `<p>`-elementissä. Huomion arvoinen on myös dokumentin alusta löytyvä `<meta name='viewport' content='width=device-width, initial-scale=1'>` rivi, joka tekee sivusta responsiivisen erikokoisille näytöille. Tällöin sivun sisältö skaalauttuu käyttäjän näytön koon perusteella. 

<!--_Mitä tuo meta-tagi tekee siis? Miten se vaikuttaa sivun näkymiseen? Voisiko sen esitellä myöhemmin niin, että ensin näkee miten sivu toimii ilman sitä huonosti ja sen lisäämisen jälkeen toimii hyvin?_ 💭 Meta tägi siis vaikuttaa sivun näkymiseen mobiililaitteessa. En näe syytä miksi se pitäisi esitellä myöhimmin, sillä todennäköisesti lukijalla ei ole tarvetta testata sivua mobiililaitteella, jolloin hän ei huomaa sivun huonosti toimivuutta. Tämä on enemmän rivi, jonka olen tottunut laittamaan sivulle, jotta se toimii varmasti myös mobiilissa. 👽 Se sopii tähän, kun siitä mainitaan. Olisi kuitenkin parempi olla lainausmerkit sen attribuuteissa kuten muissakin tageissa.-->

```html
<!DOCTYPE html>
<link rel="stylesheet" href="assets/main.css">
<meta name='viewport' content='width=device-width, initial-scale=1'>

<body>
  <h1>Tsoha App</h1>
  <nav>
    <ul>
      <li><a href="#">Sivu 1</a></li>
      <li><a href="#">Sivu 2</a></li>
      <li><a href="#">Sivu 3</a></li>
    </ul>
  </nav>

  <form action="" method="POST">
    <label for="username">Tunnus:</label>
    <input type="text" name="username"><br>
    <label for="password">Salasana:</label>
    <input type="password" name="password"><br>
    <input type="submit" value="Kirjaudu">
  </form>

  <h2>Tsoha App on esimerkkisivusto siitä, miten yksinkertainen verkkosivu on muotoiltu.</h2>

  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit libero non urna facilisis, quis
	eleifend enim ullamcorper. Vivamus bibendum ex dolor. Maecenas a felis non odio pellentesque aliquet.
	Curabitur nibh velit, vehicula et semper in, ultricies et ipsum. Morbi efficitur, purus eget fringilla
	mollis, lacus arcu dignissim ante, ut mollis arcu ex eget tortor. Donec non massa sit amet arcu varius
	elementum eu id lorem. Morbi varius nulla at dui suscipit porta. Maecenas volutpat euismod leo, sit amet
	venenatis sapien rutrum sit amet.

```
<!-- Kommentti materiialista: -->
<!--_Googlen tyyliohje (https://google.github.io/styleguide/htmlcssguide.html) suosittelee, että turhat tagit (kuten html ja head) jätetään pois ja sisennyksen leveys on 2 merkkiä._ 💭 Kiitos hyödyllisesta linkistä, en tiennytkään että tällainen on olemassa. 👽 Myös body-tagit voi poistaa ja li-lopputagit? 💭 li loppu tägiä ei voi poistaa. Jos li-elementissä on paddingia tai marginaalia niin se ei toimi reunoissa muuten (testasin tätä).-->

<!-- Kommentti materiialista: -->
<!--_Miksi linkit tehdään listan avulla (voisi luulla että listan on allekkain)? Miksi ol eikä ul?_ 💭 Tässä ei ole väliä kumpaa käyttää. Itse käytän ol-listaa sillä valikon linkit ovat järjestyksessa, joten ordered list (ol) tuntuu luonnollisemmalta valinnalta kuin unordered list (ul) 👽 Hmm, toisaalta myös ul-listan kohdilla on tietty sivun tekijän määrittämä järjestys, erona vain on että ei näy numerointia. Lisäys: Googlailun perusteella ul on parempi tapa, myös saavutettavuuden kannalta. -->

Kun miettii miten nämä viisi komponenttia halutaan esittää sivulla on otettava huomioon, miten käyttäjä käyttää sivua. Mitä käyttäjä näkee kun hän avaa sivun ensimmäisen kerran? Onko valikko helppo löytää? Tunnistaako käyttäjä millä sivulla on? 

Ulkoasun _layout:a_ eli yleisilmettä ja komponenttien sijoittamista kannattaa miettiä esimerkiksi piirtämällä paperille.

<!-- TODO piirrä parempi kuva
Piirtämällä paperille sivun rakenteen on helppoa lähteä sijoittamaan asioita oikeisiin kohtiin. Tämän sivun layout-suunnitelma on kuvan mukainen.

-->

<!-- Kommentti materiialista: -->
<!--_On hyvä että on kuva suunnitelmasta, mutta siitä ei näe nyt kovin hyvin, missä on mitäkin (esim. missä on valikko)._ 💭 Tähän pitää tehdä parempi kuva, jossa näkyy myös kirjautumislomake.-->

Kun suunnitelma on valmis, voidaan aloittaa sivun tyylin toteuttaminen. Suunnitelman perusteella halutaan sivun sisällön olevan keskellä sivua. Tehdään tämä selektorilla `body`, joka muokkaa sivun jokaista elementtiä. Asetetaan `body`:n marginaaliksi `auto`, joka keskittää sisällön. Marginaali tulee voimaan, kun sisällön _maksimi leveys_ määritetään. Kun sisältö on pienempää, kuin ikkunan leveys, niin marginaali keskittää sen. Aseteaan myös miellyttävämpi fontti sivulle.

```css
body {
    margin: auto;
    max-width: 45em;
    font-family: 'Helvetica', 'Arial', sans-serif;
}
``` 

<!-- Kommentti materiialista: -->
<!--_Mitä margin tekee tässä? (ok tulee myöhemmin, voisi kuitenkin lyhyesti mainita mikä on margin ja mikä on padding, vai tulisiko tämä HTML-oppaaseen?)_ 💭 Paddingista ja mariginsta on jo lapiossa, niin en kertonut tässä siitä. Sen voisi lisätä oppaaseen tai sitten linkata lapion sivulle. 👽 Tämä tosiaan sopii paremmin oppaaseen (ja siellä on jo jotain mutta pitää täydentää).-->

Järjestetään seuraavaksi valikon linkit riviin käyttämällä `display: inline-block` määrettä. `padding`-attribuutille annettaan kaksi parametria, joista ensimmäinen kertoo pystysuoran tilan ja toinen kertoo vaakasuoran tilan elementin sisällä. Parametrien määrällä kerrotaan, mihin tilaa lisätään. Esimerkiksi edellisessä `body`-selektorin muotoilussa yksi parametri `margin`-attribuutille kertoi, että muotoilu lisättiin jokaiseen reunaan.

```css
nav li {
    display: inline-block;
    padding: 0 .5em;
}
```

Käyttäjän huomio halutaan kiinnittää sivun otsikkoon, jotta käyttäjä tunnistaa helposti, millä sivulla hän on. Tehdään otsikolle oma `div`-elementti, joka helpottaa sen muotoilua.

```html
<div class="header">
  <h1>Tsoha App</h1>
</div>
```

<!-- Kommentti materiaalista: -->
<!--_Miksi ei voi muotoilla suoraan h1-elementtiä? Miksi luokka vaikka on vain yksi otsikko?_ 💭 Konventiona layouteissa on eriyttää kuvaavat kokonaisuudet omiksi luokikseen. ID:tä käytetään yleensä vain jos on jotain todella erityista. Headeriin voi laittaa myös muutakin kuin vain värin. Siihen voisi laittaa myös kuvan taustalle tai lisää tekstiä esimerkiksi h2-tason otsikkoon tai ihan vain tekstielementiin. Ei kannata muotoilla suoraa h1-elementtiä, sillä h1-tason otsikkoa voidaan käyttää myös tekstin seassa, jos sisällön tuottaja tai seuraava devaaja ole tietoinen, että h1 tason otsikko on vain header otiskko, jolloin layout, menee rikki. 👽 OK, hyviä perusteluja. Mikä on jotain todella erityistä?-->
<!-- Erityistä voisi olla vaikka jokin kerran käytetty. Id:llä voidaan myös viitata jäsästä.-->

Kiinnitetään käyttäjän huomio otsikkoon asettamalla taustaväri värikkääksi, kasvattamalla sille varattua aluetta ja määrittelemällä otsikon fontti suuremmaksi.

```css
.header {
    background: sandybrown;
    font-weight: bold;
    padding: 2em 1em;
    font-size: 2em;
}
```

Siirretään kirjautumislomake sille suunniteltuun paikkaan sisällön vasempaan yläreunaan käyttämällä `float` attribuuttia. Koska sivulla ei ole tällä hetkellä muita lomakkeita kuin kirjautuminen, niin voidaan valita universaalilla selektorilla kaikki mahdolliset `form`-elementit. Jos sivulla olisi kuitenkin muitakin lomakkeita, olisi lomakkeelle hyvä asettaa luokka tai id-tunnus ja muotoilla se tällä perusteella. 

```css
form {
    display: block;
    float: right;
}
```

Nyt pohjan komponentin ovat niillä paikoilla, joihin ne haluttiinkin asettaa. Silti lopputuloksessa on muutamia asioita, jotka eivät näytä hyvältä. Ensinnäkin valikon vasen reuna ei ole samassa kohtaa kuin muut komponentit ja toisen tason `h2`-otsikko ei ole samassa tasossa kirjautumislomakkeen suhteen.

Aloitetaan ensimmäisestä ongelmasta eli valikon sijainnista. Kun valikkoa klikkaa hiiren oikealla painikkeella ja valitsee avautuvasta valikosta vaihtoehdon 'Inspect Element', aukeaa automaattisesti selaimen konsoli ja sen 'Inspector' välilehti ja tutkittu elementti värjäytyy hetkeksi värikkääksi. 

<!-- TODO: Tähän kuva selaimesta kun konsoli on auki.-->

Selaimen konsolista voidaan huomata, että navigaation sisällä oleva `<ul>' listalle on tullut automaattisesti `padding`-arvoa. Otetaan tämä pois.

```css
nav ul {
    padding: 0;
}
```

<!--- Kommentti materiaalista-->
<!--- Tämä on se mitä mitä olen tottunut tekemään. En ole varma toimiiko tämä jokaisella selaimella näin. Voisi myös selittää, miten avataan suoraa selaimen konsoli ja tarkastellan sieltä elementtejä (ilman siis tuota alun klikkausta, joka saattaa hämmnetää.) -->

Valikko ei vieläkään ole aivan tasassa muiden komponenttien kanssa, mutta kuitenkin parempi. Jätetään se nyt tähän tilaan.

Korjataan seuraavaksi materiaalin ja kirjautumislomakkeen välinen epätasaisuus. Tutkimalla sivua jälleen selaimen konsolilla nähdään, että `<h2>` otsikolla on marginaalia enemmän kuin kirjautumislomakkeella. Ratkaistaan ongelma poistamalla otsikon yläosan marginaali.

```css
h2 {
    margin-top: 0;
}
```

Lisätään kirjautumislomakkeen `padding` arvoa, jotta se ei ole aivan kiinni itse tekstissä.

```css
form {
    display: block;
    float: right;
    padding: .5em;
}
```

Nyt pohja on valmiina ja voi alkaa ideoimaan ulkoasua tunnistettavammaksi. Ensimmäisessä vaiheessa toteutettiin runko, jonka ulkoasua lähdetään seuraavaksi muokkaamaan.

## 2. vaihe

Sivu jäi hyvin yksinkertaiseksi. Lähdetään tekemään ulkoasusta tunnistettavampaa. Aloitetaan lisäämällä taustaväri sivulle `body`-selektoriin.

```css
body {
    margin: auto;
    max-width: 45em;
    font-family: 'Helvetica', 'Arial', sans-serif;
    background: gray;
}
```

Vaihdetaan valikon ja sisällön väri valkoiseksi, jotta ne erottuvat taustasta. Aloitetaan valikosta. Muutetaan myös valikon `padding` yksi parametriseksi.

```css
nav li {
    display: inline-block;
    padding: .5em;
    background: white;
}
```

Seuraavaksi vaihdetaan sisällön taustan väri. Erotetaan sisältö muusta sivusta asettamalla se `div`-elementin sisään, jolle annetaan luokka `content`. Koska halutaan, että kirjautumislomake on sisällön sisällä vasemmassa yläreunassa laitetaan myös kirjautumislomake tämän `div`-elementin sisälle.

```html
...
  </nav>
  <div class="content">
  <form action="" method="POST">
    <label for="username">Tunnus:</label>
    <input type="text" name="username"><br>
    <label for="password">Salasana:</label>
    <input type="password" name="password"><br>
    <input type="submit" value="Kirjaudu">
  </form>
  <h2>Tsoha App on esimerkkisivusto siitä, miten yksinkertainen verkkosivu on muotoiltu.</h2>

  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit libero non urna facilisis, quis
	eleifend enim ullamcorper. Vivamus bibendum ex dolor. Maecenas a felis non odio pellentesque aliquet.
	Curabitur nibh velit, vehicula et semper in, ultricies et ipsum. Morbi efficitur, purus eget fringilla
	mollis, lacus arcu dignissim ante, ut mollis arcu ex eget tortor. Donec non massa sit amet arcu varius
	elementum eu id lorem. Morbi varius nulla at dui suscipit porta. Maecenas volutpat euismod leo, sit amet
	venenatis sapien rutrum sit amet.
</div>
```

Vaihdetaan `content` luokan taustaväri. Lisätään myös `padding` kentän arvoa, jottei sisältö oli aivan kiinni taustavärin reunoissa.

```css
.content {
   background: white;
   padding: 1.5em 2em;
}
```

Asetetaan kirjautumislomakkeelle oma taustaväri, jotta se erottuu tekstistä.

```css
form {
    display: block;
    float: right;
    padding: .5em;
    background: blanchedalmond;
}
```

Sivun värien lisääminen ja päättäminen on haastavaa, sillä värit jakavat mielipiteitä. Hyvän väriskaalan voi saada esimerkiksi käyttämällä yhtä pääväriä ja sen erisävyjä. Valitsemalla päävärin lisäksi korostusvärin, joka kiinnittää käyttäjän huomion saadaan aikaiseksi miellyttävä kokonaisuus.

## 3. vaihe

Väritetyn sivuston ilme on hieman kulmikas. Lähdetään rakentamaan ilmettä hieman pehmeämmäksi. Aloitetaan pyöristämällä sisällön kulmat. 

```css
.content {
   background: white;
   padding: 1em;
   border-radius: .5em
}
```

Nyt näyttää oudolta, että vain sisällön reunat on pyöristetyjä, joten pyöristetään myös otsikon kulmat ja otetaan sitä irti yläreunasta lisäämällä marginaalia.

```css
.header {
    background: sandybrown;
    font-weight: bold;
    padding: 2em 1em;
    font-size: 2em;
    border-radius: .5em;
    margin-top: .5em;
}
```

Parannetaan seuraavaksi valikon ulkoasua ja käyttökokemusta. Tehdään valikon painikkeista pyöristetyt sekä kasvatetaan niiden `padding` ja `margin` arvoja, jotta ne olisivat hieman kauempana toisistaan.

```css
nav li {
    display: inline-block;
    padding: .5em 1em;
    background: white;
    border-radius: .5em;
    margin: .2em;
}
```

Asetetaan valikon linkit keskelle sivua muokkaamalla itse listaa, jolla linkit ovat. Lisätään sille myös hieman marginaalia, jottei lista olisi aivan kiinni otsikossa ja sisällössä. Listan marginaalin lisääminen ei kasvata listan linkkejen etäisyyttä toisistaan.

```css
nav ul {
    padding: 0;
    margin: .5em;
    text-align: center;
}
```

Tehdään valikon linkeistä enemmän painikkeiden näköisiä. Otetaan valikon linkeistä alleviivaus pois ja määritetään linkin väri mustaksi.

```css
nav li a {
    text-decoration: none;
    color: #000;
}
```

Lisätään ominaisuus, jossa valikon linkin taustaväri tummenee, kun hiiri viedään sen päälle. Tällöin käyttäjälle tulee vaikutelma painikkeesta.

```css
nav li:hover {
    background-color: rgb(226, 226, 226);
}
```

Pyöristetaan vielä kirajutumislomakkeen kulmat.

```css
form {
    display: block;
    float: right;
    padding: .5em;
    background: blanchedalmond;
    border-radius: .5em;
}
```

Sivulla on nyt tunnistettava ulkoasu. Sivun lopullinen ilme näyttää [tältä](https://millakortelainen.github.io/tsoha-app/) ja sen koodi on nähtävissä [github repossa](https://github.com/millakortelainen/tsoha-app).

Lopulliseen ulkoasuun päädyttiin, kun haluttiin tuoda pehmeyttä sivulle. Keksittiin siis juoni, jota haluttiin lähteä toteuttamaan. Keskittymällä johonkin toiseen ominaisuuteen tai vaihtamalla komponenttien sijoittelua olisi ulkoasu voinut päätyä erilaiseksi.

<!-- Kommentti materiialista: -->
<!--_Ehkä tuolla sivulla voisi olla vielä yksinkertainen lomake (sisäänkirjautuminen)? Tulisi houkuttelevan ja aidon näköinen esimerkki, kun on palvelu odottamassa kirjautujaa._ 💭 Lisätty kirjautumislomake 👽 Hyvä idea nuo label-elementit, pitäisi ehkä mainita muuallakin materiaalissa.-->

Tällä sivulla ei ollut tarvetta taulukolle, lomakkeelle tai kuvalle, mutta niiden lisääminen sivulle aiheuttaa lisää tarvetta ulkoasun suunnittelulle ja muokkaamiselle. Kun tarve muiden komponenttien suunnitelulle ilmenee apuna on [Mozillan dokumentaatio CSS:stä](https://developer.mozilla.org/fi/docs/Web/CSS). On myös kätevää hakea suoraan Googlesta tiettyä elementtiä tai CSS-ominaisuutta ja lisätä haun loppuun kirjaimet `mdn`, jolloin hakutuloksista löytyy Mozillan dokumentaatio.
