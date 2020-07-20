---
hidden: true
---


## Ulkoasu ja tyylit

Usein, jos aikaa tyylittelyyn on rajoitetusti, kannattaa harkita jonkin valmiin CSS-sovelluskehyksen käyttöä. Näistä varmaankin eniten käytetty on [Bootstrap](https://getbootstrap.com/), mutta hyviä vaihtoehtoja on useita.

Bootstrap tarjoaa valmiina suuren joukon erilaisia komponentteja ulkoasun rakentamiseen. Bootstrapin käyttöönotossa ja käytössä kannattaa tutustua Bootstrapin [dokumentaatioon](https://getbootstrap.com/docs/4.5/getting-started/introduction/).

### Esimerkki

Helpoiten Bootstrapin saa käyttöön sisällyttämällä sivupohjaan sisällönjakeluverkon (CDN) kautta jaossa olevan Bootstrapin version. Tehdään nyt esimerkiksi pieni sivu jossa käytetään jonkin verran Bootstrap-componentteja.

Jos Bootstrapia käyttää sellaisenaan ilman mitään muokkausta, sivustosta tulee helposti saman näköinen muiden (muokkaamattomalla) Bootstrapilla tehtyjen sivustojen kanssa. Tästä voi tulla huono vaikutelma, joten on hyvä hieman muokata sovelluksen ulkoasua.

Luomme alla sivun johon otamme mukaan bootstrapcdn:n kautta tulevan Bootstrapin tyylitiedoston, ja tämän jälkeen lisäämme omat määrittelyt. Lisäämme sivulle [navbar](https://getbootstrap.com/docs/4.5/components/navbar/)-komponentin helpottamaan sivustolla liikkumista. Lisätään myös hieman tekstiä, ja lopuksi lisätään vielä kaksi [nappia](https://getbootstrap.com/docs/4.5/components/buttons/). Huomaa että toinen lisätyistä napeista on itseasiassa lomakkeissa käytetty submit-nappi ja toinen on linkki. Nappien värit ovat erilaiset koska napeilla on eri luokat.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="stylesheet" href="custom.css">

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
      </ul>
    </nav>

    <div class="container">
      <h1>Esimerkki</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec 
blandit massa at augue fringilla, eget semper tellus sollicitudin. Nam 
vestibulum felis vitae efficitur ultrices. Quisque mattis ligula nec 
congue tristique. Vivamus luctus blandit mi, in fringilla odio laoreet 
eleifend.

      <input class="btn btn-primary" type="submit" value="Nappi A" />
      <a href="#" class="btn btn-secondary">Nappi B</a>
    </div>

  </body>
</html>
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

Jos omien tyyliesi kanssa on ongelmia, voit lukea aiheesta esimerkiksi [tämän](https://uxplanet.org/how-to-customize-bootstrap-b8078a011203).



Jotkin Bootstrapin komponentit käyttävät javascriptiä. Esimerkissä yllä ei sitä tarvita. Jos tarvitset sitä, lisää html-koodiin:

```html
    ...
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
  </body>
</html>
```
