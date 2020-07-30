---
title: Ulkoasun suunnittelu
hidden: true
---

# Ulkoasun suunnittelu

Tässä osiossa käydään läpi verkkosivun ulkoasun suunnittelun vaiheita. Materiaalin ei ole tarkoitus olla valmiiksi käytettävä pohja, vaan se kertoo ulkoasun suunnittelun vaiheista ja siitä, kuinka ulkoasu rakentuu pala kerrallaan.

Materiaali olettaa, että lukija tuntee ennestään CSS-kielen perusteet.

## Vaihe 1: sivun rakenne

Tehdään yksinkertainen verkkosivu, jossa on viisi komponenttia: otsikko (`h1`-elementti), navigaatio eli valikko (`nav`-elementti), kirjautumislomake (`form`-elementti) sekä varsinainen sivun sisältö (`h2`-elementti ja `p`-elementti).

Huomaa sivun alussa rivi `<meta name="viewport" content="width=device-width, initial-scale=1">`, joka tekee sivusta _responsiivisen_ erikokoisille näytöille eli sivun sisältö skaalauttuu käyttäjän näytön koon perusteella. 

<!--_Mitä tuo meta-tagi tekee siis? Miten se vaikuttaa sivun näkymiseen? Voisiko sen esitellä myöhemmin niin, että ensin näkee miten sivu toimii ilman sitä huonosti ja sen lisäämisen jälkeen toimii hyvin?_ 💭 Meta tägi siis vaikuttaa sivun näkymiseen mobiililaitteessa. En näe syytä miksi se pitäisi esitellä myöhimmin, sillä todennäköisesti lukijalla ei ole tarvetta testata sivua mobiililaitteella, jolloin hän ei huomaa sivun huonosti toimivuutta. Tämä on enemmän rivi, jonka olen tottunut laittamaan sivulle, jotta se toimii varmasti myös mobiilissa. 👽 Se sopii tähän, kun siitä mainitaan. Olisi kuitenkin parempi olla lainausmerkit sen attribuuteissa kuten muissakin tageissa.-->

```html
<!DOCTYPE html>
<link rel="stylesheet" href="assets/main.css">
<meta name="viewport" content="width=device-width, initial-scale=1">

<body>
  <h1>Tsoha App</h1>
  <nav>
    <ul>
      <li><a href="#">Sivu 1</a></li>
      <li><a href="#">Sivu 2</a></li>
      <li><a href="#">Sivu 3</a></li>
    </ul>
  </nav>

  <form action="/login" method="POST">
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

Kun miettii, miten nämä viisi komponenttia halutaan esittää sivulla, on otettava huomioon, miten käyttäjä käyttää sivua. Mitä käyttäjä näkee, kun hän avaa sivun ensimmäisen kerran? Onko valikko helppo löytää? Tunnistaako käyttäjä, millä sivulla on? 

Ulkoasun _layoutia_ eli yleisilmettä ja komponenttien sijoittamista kannattaa miettiä esimerkiksi piirtämällä paperille.

<!-- TODO piirrä parempi kuva
Piirtämällä paperille sivun rakenteen on helppoa lähteä sijoittamaan asioita oikeisiin kohtiin. Tämän sivun layout-suunnitelma on kuvan mukainen.
-->

Kun suunnitelma on valmis, voidaan aloittaa sivun tyylin toteuttaminen. Suunnitelman perusteella halutaan sivun sisällön olevan keskellä sivua. Tämä onnistuu asettamalla `body`-elementin marginaaliksi `auto`, joka keskittää sisällön. Marginaali tulee voimaan, kun sisällön _maksimileveys_ määritetään. Kun sisältö on pienempää kuin ikkunan leveys, marginaali keskittää sen. Asetetaan myös miellyttävämpi fontti sivulle.

```css
body {
    margin: auto;
    max-width: 45em;
    font-family: 'Helvetica', 'Arial', sans-serif;
}
``` 

Järjestetään seuraavaksi valikon linkit riviin käyttämällä `display: inline-block` -määrettä. Ominaisuudelle `padding` annetaan kaksi parametria, joista ensimmäinen kertoo pystysuoran tilan ja toinen kertoo vaakasuoran tilan elementin sisällä. Parametrien määrällä kerrotaan, mihin tilaa lisätään. Esimerkiksi edellisessä `body`-elementin muotoilussa yksi parametri `margin`-attribuutille kertoi, että muotoilu lisättiin jokaiseen reunaan.

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

Kiinnitetään käyttäjän huomio otsikkoon asettamalla taustaväri värikkääksi, kasvattamalla sille varattua aluetta ja määrittelemällä otsikon fontti suuremmaksi.

```css
.header {
    background: sandybrown;
    font-weight: bold;
    padding: 2em 1em;
    font-size: 2em;
}
```

Siirretään kirjautumislomake sille suunniteltuun paikkaan sisällön vasempaan yläreunaan käyttämällä `float`-ominaisuutta. Koska sivulla ei ole tällä hetkellä muita lomakkeita kuin kirjautuminen, niin voidaan valita universaalilla selektorilla kaikki mahdolliset `form`-elementit. Jos sivulla olisi kuitenkin muitakin lomakkeita, olisi lomakkeelle hyvä asettaa luokka tai id-tunnus ja muotoilla se tällä perusteella. 

```css
form {
    display: block;
    float: right;
}
```

Nyt pohjan komponentin ovat niillä paikoilla, joihin ne haluttiinkin asettaa. Silti lopputuloksessa on muutamia asioita, jotka eivät näytä hyvältä. Ensinnäkin valikon vasen reuna ei ole samassa kohdassa kuin muissa komponenteissa, ja lisäksi toisen tason `h2`-otsikko ei ole samassa tasossa kirjautumislomakkeen suhteen.

Aloitetaan ensimmäisestä ongelmasta eli valikon sijainnista. Kun valikkoa klikkaa hiiren oikealla painikkeella ja valitsee avautuvasta valikosta vaihtoehdon _Inspect Element_, aukeaa selaimen konsoli ja sen _Inspector_-välilehti ja tutkittu elementti värittyy hetkeksi. 

<!-- TODO: Tähän kuva selaimesta kun konsoli on auki.-->

Selaimen konsolista voidaan huomata, että navigaation sisällä olevalle `ul`-listalle on tullut automaattisesti `padding`-arvoa. Otetaan tämä pois.

```css
nav ul {
    padding: 0;
}
```

<!--- Kommentti materiaalista-->
<!--- Tämä on se mitä mitä olen tottunut tekemään. En ole varma toimiiko tämä jokaisella selaimella näin. Voisi myös selittää, miten avataan suoraa selaimen konsoli ja tarkastellan sieltä elementtejä (ilman siis tuota alun klikkausta, joka saattaa hämmnetää.) -->

Valikko ei vieläkään ole aivan tasassa muiden komponenttien kanssa, mutta kuitenkin parempi. Jätetään se nyt tähän tilaan.

Korjataan seuraavaksi materiaalin ja kirjautumislomakkeen välinen epätasaisuus. Tutkimalla sivua jälleen selaimen konsolilla nähdään, että `h2`-otsikolla on marginaalia enemmän kuin kirjautumislomakkeella. Ratkaistaan ongelma poistamalla otsikon yläosan marginaali.

```css
h2 {
    margin-top: 0;
}
```

Lisätään vielä kirjautumislomakkeen `padding`-arvoa, jotta se ei ole aivan kiinni itse tekstissä.

```css
form {
    display: block;
    float: right;
    padding: .5em;
}
```

Nyt pohja on valmiina ja voi alkaa ideoimaan ulkoasua tunnistettavammaksi. Ensimmäisessä vaiheessa toteutettiin runko, jonka ulkoasua lähdetään seuraavaksi muokkaamaan.

## Vaihe 2: tunnistettava ulkoasu

Sivu jäi hyvin yksinkertaiseksi. Lähdetään tekemään ulkoasusta tunnistettavampaa. Aloitetaan lisäämällä taustaväri sivulle `body`-selektoriin.

```css
body {
    margin: auto;
    max-width: 45em;
    font-family: 'Helvetica', 'Arial', sans-serif;
    background: gray;
}
```

Vaihdetaan valikon ja sisällön väri valkoiseksi, jotta ne erottuvat taustasta. Aloitetaan valikosta. Muutetaan myös valikon `padding` yksiparametriseksi.

```css
nav li {
    display: inline-block;
    padding: .5em;
    background: white;
}
```

Seuraavaksi vaihdetaan sisällön taustan väri. Erotetaan sisältö muusta sivusta asettamalla se `div`-elementin sisään, jolle annetaan luokka `content`. Koska halutaan, että kirjautumislomake on sisällön sisällä oikeassa yläreunassa, laitetaan myös kirjautumislomake tämän `div`-elementin sisälle.

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

Vaihdetaan `content`-luokan taustaväri. Kasvatetaan myös `padding`-arvoa, jottei sisältö oli aivan kiinni taustavärin reunoissa.

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

Sivun värien lisääminen ja päättäminen on haastavaa, sillä värit jakavat mielipiteitä. Hyvän väriskaalan voi saada esimerkiksi käyttämällä yhtä pääväriä ja sen eri sävyjä. Valitsemalla päävärin lisäksi korostusvärin, joka kiinnittää käyttäjän huomion, saadaan aikaiseksi miellyttävä kokonaisuus.

## Vaihe 3: viimeistely

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

Parannetaan seuraavaksi valikon ulkoasua ja käyttökokemusta. Tehdään valikon painikkeista pyöristetyt sekä kasvatetaan niiden `padding`- ja `margin`-arvoja, jotta ne olisivat hieman kauempana toisistaan.

```css
nav li {
    display: inline-block;
    padding: .5em 1em;
    background: white;
    border-radius: .5em;
    margin: .2em;
}
```

Asetetaan valikon linkit keskelle sivua muokkaamalla itse listaa, jolla linkit ovat. Lisätään sille myös hieman marginaalia, jottei lista olisi aivan kiinni otsikossa ja sisällössä. Listan marginaalin lisääminen ei kasvata listan linkkien etäisyyttä toisistaan.

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

Pyöristetaan vielä kirjautumislomakkeen kulmat.

```css
form {
    display: block;
    float: right;
    padding: .5em;
    background: blanchedalmond;
    border-radius: .5em;
}
```

Sivulla on nyt tunnistettava ulkoasu. Sivun lopullinen ilme näyttää [tältä](https://millakortelainen.github.io/tsoha-app/) ja sen koodi on nähtävissä [GitHub-repositoriossa](https://github.com/millakortelainen/tsoha-app).

Lopulliseen ulkoasuun päädyttiin, kun haluttiin tuoda pehmeyttä sivulle. Keksittiin siis juoni, jota haluttiin lähteä toteuttamaan. Keskittymällä johonkin toiseen ominaisuuteen tai vaihtamalla komponenttien sijoittelua olisi ulkoasu voinut päätyä erilaiseksi.

Tällä sivulla ei ollut tarvetta taulukoille tai kuville, mutta niiden lisääminen sivulle aiheuttaa lisää tarvetta ulkoasun suunnittelulle ja muokkaamiselle. Kun tarve muiden komponenttien suunnitelulle ilmenee, hyvä lähde on [Mozillan CSS-dokumentaatio](https://developer.mozilla.org/fi/docs/Web/CSS). On myös kätevää hakea suoraan Googlesta tiettyä elementtiä tai CSS-ominaisuutta ja lisätä haun loppuun kirjaimet `mdn`, jolloin hakutuloksista löytyy Mozillan dokumentaatio.
