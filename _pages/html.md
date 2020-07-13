---
layout: chapter
title: HTML-opas
---

# HTML-opas

## HTML:n perusteet

HTML-sivu muodostuu tageista, jotka määrittelevät sivun sisällön. Esimerkiksi sivun otsikko tulee tagien `<title>` ja `</title>` sisään ja tagi `<img>` näyttää kuvan.

Tässä on esimerkkisivu `testi.html`, joka esittelee tavallisia HTML:n ominaisuuksia:

```html
<!DOCTYPE html>
<title>Testisivu</title>
<h1>Tervetuloa!</h1>
<p>
Tekstin <b>muotoilu</b> toimii <i>näin</i>.
Kohta mennään <br> uudelle riville.
<!-- Tämä kommentti ei näy sivun käyttäjälle -->
<p>
<img src="exactum.jpg" alt="Exactum-rakennus Kumpulassa">
<p>
Tästä voit mennä <a href="https://cs.helsinki.fi/">toiseen paikkaan</a>.
<h2>Kaverilista</h2>
<ul>
  <li> Maija
  <li> Liisa
  <li> Kaaleppi
</ul>
<h2>Sanasto</h2>
<table>
  <tr><th>suomi</th><th>englanti</th></tr>
  <tr><td>apina</td><td>monkey</td></tr>
  <tr><td>banaani</td><td>banana</td></tr>
  <tr><td>cembalo</td><td>harpsichord</td></tr>
</table>
<hr>
Sivu päättyy tähän.
```

Sivu voi näyttää selaimessa seuraavalta:

TODO: Kuva tähän

Katsotaan seuraavaksi tarkemmin joitakin HTML-koodin osia.

### Dokumenttityyppi

Sivun alussa oleva dokumenttityyppi ilmaisee, että kyseessä on HTML-sivu:

```html
<!DOCTYPE html>
```

Itse asiassa tämä rivi on turha: jos rivin poistaa, sivu näkyy yhtä hyvin kuin ennenkin. Rivi kuitenkin vaaditaan, jotta sivu on _validi_ eli HTML-kielen standardin mukainen.

Toisin kuin ohjelmointikielissä, HTML:ää voi kirjoittaa huolettomasti ja selaimet koettavat näyttää sivun jotenkin järkevästi, vaikka koodissa olisi virheitä. Toisaalta on hyvä tavoite toimivuuden kannalta pyrkiä siihen, että sivu on ainakin lähellä validia.

Helppo tapa selvittää sivun validius on käyttää [validaattoria](https://validator.w3.org/).

### Tyhjä tila ja rivitys

HTML:ssä ylimääräinen tyhjä tila ja rivinvaihdot eivät vaikuta siihen, miten sivu näkyy selaimessa. Esimerkiksi seuraavat koodit tuottavat täysin saman tuloksen:

```html
apina banaani cembalo
```

```html
apina
    banaani
cembalo
```

Tekstiin saa uuden kappaleen tagilla `<p>` ja rivinvaihdon tagilla `<br>`.

### Kuvien näyttäminen

Tagissa `img` attribuutti `src` antaa osoitteen kuvatiedostoon ja tagi `alt` määrittää tekstin, joka voidaan näyttää kuvan sijasta:

```html
<img src="exactum.jpg" alt="Exactum-rakennus Kumpulassa">
```

Esimerkiksi jos sivua katsoo Lynx-tekstiselaimella, kuvan sijasta näkyy teksti:

TODO: Kuva tähän

Vaihtoehtoinen teksti on myös hyödyllinen näkövammaisille käyttäjille, koska se voidaan lukea ääneen kuvan näyttämisen sijasta.

## Lomakkeet

Lomake on HTML-sivun osa, jonka avulla käyttäjä pystyy lähettämään tietoa web-sovellukselle. Esimerkiksi seuraava lomake sallii käyttäjän lähettää viestin:

```html
<form action="/send" method="POST">
Otsikko: <input type="text" name="title"> <br>
Viesti: <br>
<textarea name="message" rows="5" cols="40">
</textarea> <br>
<input type="submit" value="Lähetä">
</form>
```

<div style="border-style:solid;border-width:1px;padding:10px">
<form action="/send" method="POST">
Otsikko: <input type="text" name="title"> <br>
Viesti: <br>
<textarea name="message" rows="5" cols="40">
</textarea> <br>
<input type="submit" value="Lähetä">
</form>
</div>

Tutustumme seuraavaksi tavallisimpiin lomakkeen elementteihin.

### Tekstikenttä

Tekstikentän avulla voi kysyä yhden rivin tietoa käyttäjältä. Attribuutti `value` antaa kentän oletusarvon ja `size` määrittää kentän leveyden.

```html
Nimi: <input type="text" name="name" value="Mikki Hiiri" size="20">
```

<div style="border-style:solid;border-width:1px;padding:10px">
Nimi: <input type="text" name="name" value="Mikki Hiiri" size="20">
</div>

### Salasanakenttä

Salasanakenttä on tekstikenttä, joka on tarkoitettu salasanan kysymiseen. Kun käyttäjä kirjoittaa salasanan kenttään, se näkyy piilotettuna.

```html
Salasana: <input type="text" name="password" size="20">
```

<div style="border-style:solid;border-width:1px;padding:10px">
Salasana: <input type="password" name="password" size="20">
</div>

### Tekstilaatikko

Tekstilaatikon avulla käyttäjä voi syöttää pitkän tekstin, jossa voi olla useita rivejä. Attribuutit `rows` ja `cols` määrittävät laatikon koon. Laatikon oletussisältö kirjoitetaan tagien väliin.

```html
Viesti: <br>
<textarea name="message" rows="5" cols="40">
Ensimmäinen rivi
Toinen rivi
Kolmas rivi
</textarea>
```

<div style="border-style:solid;border-width:1px;padding:10px">
Viesti: <br>
<textarea name="message" rows="5" cols="40">
Ensimmäinen rivi
Toinen rivi
Kolmas rivi
</textarea>
</div>

### Valintanappi

Valintanapin avulla käyttäjä voi valita yhden vaihtoehdon useasta mahdollisesta. Attribuutti `value` määrittää valintaa vastaavan arvon, joka välitetään lomakkeen käsittelijälle.

Kun valintanapeilla on yhteinen nimi, niistä pystyy valitsemaan vain yhden. Attribuutti `checked` ilmaisee, mikä valinta on tehty oletuksena.

```html
Kieli: <br>
<input type="radio" name="lang" value="fi" checked> suomi
<input type="radio" name="lang" value="sv"> ruotsi
<input type="radio" name="lang" value="en"> englanti
```

<div style="border-style:solid;border-width:1px;padding:10px">
Kieli: <br>
<input type="radio" name="lang" value="fi" checked> suomi
<input type="radio" name="lang" value="sv"> ruotsi
<input type="radio" name="lang" value="en"> englanti
</div>

### Valintaruutu

Valintaruutu muistuttaa valintanappia, mutta käyttäjä voi tehdä minkä tahansa määrän valintoja (ja myös olla valitsematta mitään).

```html
Käyttöjärjestelmä: <br>
<input type="checkbox" name="os" value="1" checked> Linux
<input type="checkbox" name="os" value="2"> Mac
<input type="checkbox" name="os" value="3" checked> Windows
```

<div style="border-style:solid;border-width:1px;padding:10px">
Käyttöjärjestelmä: <br>
<input type="checkbox" name="os" value="1" checked> Linux
<input type="checkbox" name="os" value="2"> Mac
<input type="checkbox" name="os" value="3" checked> Windows
</div>

### Valintalista

Valintalista on toinen tapa antaa käyttäjän tehdä valinta. Valintalista on kätevä silloin, kun vaihtoehtoja on paljon, koska ne eivät vie tilaa sivulta.

Valintalistassa attribuutti `selected` ilmaisee oletuksena tehdyn valinnan.

```html
Kieli:
<select name="lang">
<option value="fi" selected> suomi
<option value="sv"> ruotsi
<option value="en"> englanti
</select>
```

<div style="border-style:solid;border-width:1px;padding:10px">
Kieli:
<select name="lang">
<option value="fi" selected> suomi</option>
<option value="sv"> ruotsi</option>
<option value="en"> englanti</option>
</select>
</div>

### Piilokenttä

Piilokenttä on lomakkeen osana oleva kenttä, joka ei näy sivun käyttäjälle mutta jonka arvo välitetään lomakkeen käsittäjälle. Esimerkiksi seuraava kenttä lähettää lomakkeen käsittäjälle tiedon, että kentän `id` arvona on `123`.

```html
<input type="hidden" name="id" value="123">
```

Huomaa, että vaikka käyttäjä ei näe piilokenttää sivulla, kenttä kuitenkin näkyy sivun lähdekoodissa eli piilokentässä ei voi olla salaista tietoa.



## CSS

## JavaScript