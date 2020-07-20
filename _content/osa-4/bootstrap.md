---
hidden: true
---


## Ulkoasu ja tyylit

Kurssin taustamateriaalista löydät ohjeita ulkoasua varten, kannattaa perehtyä näihin ensin jos et ole vielä sitä tehnyt.

Usein, jos aikaa tyylittelyyn on rajoitetusti, kannattaa harkita jonkin valmiin CSS-sovelluskehyksen käyttöä. Näistä varmaankin eniten käytetty on [Bootstrap](https://getbootstrap.com/), mutta hyviä vaihtoehtoja on useita. Voit etsiä vaihtoehtoja hakusanoilla "CSS framework".

Bootstrapin hyötyjä:

- Bootstrap tarjoaa valmiina suuren joukon erilaisia komponentteja ulkoasun rakentamiseen.
- Bootstrap pyrkii olemaan mahdollisimman konsistentti eri selainten ja näyttökokojen välillä
- Bootstrapin dokumentaatiossa on usein mietitty myös jonkin verran saavutettavuutta (accessibility) ja [sen toteuttamista Bootstrapin yhteydessä](https://getbootstrap.com/docs/4.5/getting-started/accessibility/).
- On hyvin todennäköistä että Bootstrapin yleinen CDN-versio on jo valmiina käyttäjän selaimen välimuistissa, tällöin käyttäjä saa tyylittelyt käyttöönsä hyvin nopeasti tullessaan sivulle.

Bootstrapin haittoina on puolestaan mm:

- Jos sovelluksen ulkoasua ei kustomoi, sovellus näyttää helposti kopiolta jostain toisesta vastaavasta sovelluksesta
- Suuri koko (mutta katso huomio välimuistista yllä ja kohta koon minimoinnista alempana) verrattuna käsin kirjoitettuun tyylitiedostoon.


### Bootstrapin käyttö

#### Bootstrapin käyttöönotto

Bootstrapin käyttöönotossa ja käytössä kannattaa tutustua Bootstrapin [dokumentaatioon](https://getbootstrap.com/docs/4.5/getting-started/introduction/).

Helpoiten Bootstrapin saa käyttöön sisällyttämällä sivupohjaan sisällönjakeluverkon (CDN) kautta jaossa olevan Bootstrapin version. (Jos käytät sovelluksen mukana talletettua paikallista Bootstrap-kopiota, joudut muuttamaan esimerkin linkkejä.)

```html
<!doctype html>
<html lang="en">
  <head>
    ...
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <title>Bootstrap-esimerkki</title>
  </head>
  <body>

  ...
```

Bootstrap käyttää myös paikoitellen javascriptiä. Tämän käyttö ei ole välttämätöntä, mutta kaikki toiminnallisuudet eivät tällöin toimi, tarkista aina dokumentaatiosta tarvitsevatko käyttämäsi komponentit sitä.

```html
    ...
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
  </body>
</html>
```

#### Bootstrapin käyttö

Bootstrapia opetellessa kannattaa ensin selata Bootstrapin dokumentaation kohdat Layout ja Content läpi. Näissä käsitellään käytön perusteita Bootstrapin kannalta, ja näiden kohtien sisältö lieneekin jo osittain tuttua taustamateriaalin html-oppaan perusteella.

Bootstrap jakaa sivun ruudukkoon sisällön asettelua varten (katso selitys dokumentaation Layout-osassa). Jos tämä tuntuu vaikealta ymmärtää dokumentaation perusteella, voit tutustua myös muihin sivuihin, esimerkiksi [tähän](https://uxplanet.org/how-the-bootstrap-4-grid-works-a1b04703a3b7).

Tehdään nyt esimerkiksi pieni sivu jossa käytetään jonkin verran Bootstrap-componentteja:

Luomme ensin sivun pohjan johon otamme mukaan bootstrapcdn:n kautta tulevan Bootstrapin tyylitiedoston.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <title>Bootstrap-esimerkki</title>
  </head>
  <body>

  </body>
</html>
```


Lisätään sivulle [navbar](https://getbootstrap.com/docs/4.5/components/navbar/) helpottamaan sivustolla liikkumista. Lisätään myös hieman tekstiä.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <title>Bootstrap-esimerkki</title>
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">Esimerkkisivusto</a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link A</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link B</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link C</a>
        </li>
      </ul>
    </nav>

    <div class="container">
      <h1>Esimerkki</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec 
blandit massa at augue fringilla, eget semper tellus sollicitudin. Nam 
vestibulum felis vitae efficitur ultrices. Quisque mattis ligula nec 
congue tristique. Vivamus luctus blandit mi, in fringilla odio laoreet 
eleifend. Donec bibendum risus vel lorem rutrum, quis pellentesque nunc 
sagittis. Pellentesque sollicitudin elit a faucibus finibus. Suspendisse 
iaculis rutrum lacus id tempus. Praesent ornare vel sapien eget vulputate. 
Aenean at purus quis nisl tristique laoreet.</p>
    </div>
  </body>
</html>
```

Lisätään kaksi [nappia](https://getbootstrap.com/docs/4.5/components/buttons/).

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <title>Bootstrap-esimerkki</title>
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">Esimerkkisivusto</a>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link A</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link B</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link C</a>
        </li>
      </ul>
    </nav>

    <div class="container">
      <h1>Esimerkki</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec 
blandit massa at augue fringilla, eget semper tellus sollicitudin. Nam 
vestibulum felis vitae efficitur ultrices. Quisque mattis ligula nec 
congue tristique. Vivamus luctus blandit mi, in fringilla odio laoreet 
eleifend. Donec bibendum risus vel lorem rutrum, quis pellentesque nunc 
sagittis. Pellentesque sollicitudin elit a faucibus finibus. Suspendisse 
iaculis rutrum lacus id tempus. Praesent ornare vel sapien eget vulputate. 
Aenean at purus quis nisl tristique laoreet.</p>

      <input class="btn btn-primary" type="submit" value="Nappi A" />
      <a href="#" class="btn btn-secondary">Nappi B</a>
    </div>

  </body>
</html>
```

Huomaa että toinen lisätyistä napeista on itseasiassa lomakkeissa käytetty submit-nappi ja toinen on linkki. Nappien värit ovat erilaiset koska napeilla on eri luokat.



### Bootstrapin kustomointi

Jos Bootstrapia käyttää sellaisenaan ilman mitään muokkausta, sivustosta tulee helposti saman näköinen muiden (muokkaamattomalla) Bootstrapilla tehtyjen sivustojen kanssa. Usein tälläisissä sivustoissa ei ole juurikaan kiinnitetty huomiota ulkoasuun, tai sivut ovat jonkinlaisia prototyyppejä, joten tästä voi tulla huono vaikutelma. Tästä syystä on hyvä hieman muokata sovelluksen ulkoasua.

Bootstrapia käyttävän sovelluksen ulkoasua voi muokata usealla eri tavalla:
- CSS:n voi kirjoittaa kyseisen elementin yhteyteen (lähinnä käyttökelpoinen yksittäisissä paikoissa).
- Bootstrapin CSS:n lataamisen jälkeen ladataan oma CSS-tiedosto joka muokkaa Bootstrapin käyttämiä arvoja.
- Bootstrapin lähdekoodia voi muokata ja rakentaa siten kustomoidun Bootstrap-version.

#### Oman tyylitiedoston lisääminen 

Omaan tyylitiedostoon lisättyjä muotoiluja voi käyttää myös sisällönjakoverkon kautta käytetyn Bootstrapin kanssa. Lisätään tässä ylläolevaan esimerkkiin omia muokkauksia tyyleihin tiedostoon custom.css.

```html
<!doctype html>
<html lang="en">
  <head>
    ...
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="stylesheet" href="custom.css">

    <title>Bootstrap-esimerkki muokattuna</title>
  </head>
  <body>

  ...
```

Tämän lisäksi tarvitsemme tietysti tiedoston johon viittaamme (custom.css). Tässä esimerkkinä määritämme taustavärin ja teemme nappien kulmista suoria.

```css
body {
  background-color: lightblue;
}

.btn {
  border-radius: 0;
}
```


#### Bootstrapin lähdekoodin muokkaus

Johtuen Bootstrapin monimutkaisuudesta, kaikki mahdolliset muutokset tyyleihin eivät välttämättä ole helppoja tai onnistu määrittelemällä ne omassa erillisessä tyylitiedostossa. Tällöin voi tulla tarpeelliseksi muokata Bootstrapin Sass-lähdekoodia ja luoda koko css itse sen pohjalta. Tällöin voit itse muokata Bootstrapia miten haluat ja valita mukaan otettavat osat. Tätä varten kuitenkin tarvitset ylimääräisiä työkaluja, joten tässä ei menne sen tarkemmin tähän tapaan.
Jos asia tulee ajankohtaiseksi työllesi tai jos omien tyyliesi kanssa on ongelmia, voit lukea aiheesta esimerkiksi [tämän](https://uxplanet.org/how-to-customize-bootstrap-b8078a011203).


### Valmiin css:n minimointi

Jos sovelluksen ulkoasun tyylittelyyn käyttää valmista CSS-tiedostoa (kuten esim Bootstrapin perusversio), tyylittelyihin todennäköisesti sisältyy paljon asioita joita sovellus ei itseasiassa käytä. Käyttämättömien osien karsimiseen (ja siten ladattavan tyylitiedoston koon pienentämiseen) on olemassa työkaluja kuten esimerkiksi [purgecss](https://purgecss.com/) tai [minimalcss](https://github.com/peterbe/minimalcss/). Tämä karsittu css ei tietenkään vastaa yleisessä jaossa olevaa perusversiota, joten se pitää jakaa itse (esim static-hakemistosta sovelluksen mukana).
