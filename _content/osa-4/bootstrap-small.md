---
hidden: true
---


## Ulkoasu ja tyylit

Usein, jos aikaa tyylittelyyn on rajoitetusti, kannattaa harkita jonkin valmiin CSS-sovelluskehyksen käyttöä. Näistä varmaankin eniten käytetty on [Bootstrap](https://getbootstrap.com/), mutta hyviä vaihtoehtoja on useita.

Bootstrap tarjoaa valmiina suuren joukon erilaisia komponentteja ulkoasun rakentamiseen. Bootstrapin käyttöönotossa ja käytössä kannattaa tutustua Bootstrapin [dokumentaatioon](https://getbootstrap.com/docs/4.5/getting-started/introduction/).

### Esimerkki

Helpoiten Bootstrapin saa käyttöön sisällyttämällä sivupohjaan sisällönjakeluverkon (CDN) kautta jaossa olevan Bootstrapin version. Tässä on myös hyvänä puolena että tällöin todennäköisesti Bootstrap on jo valmiina käyttäjän selaimen välimuistissa.

Jos Bootstrapia käyttää sellaisenaan ilman mitään muokkausta, sivustosta tulee helposti saman näköinen muiden (muokkaamattomalla) Bootstrapilla tehtyjen sivustojen kanssa. Tästä voi tulla huono vaikutelma, joten on hyvä hieman muokata sovelluksen ulkoasua.

Tehdään seuraavaksi pieni esimerkiksi jossa käytetään jonkin verran Bootstrap-componentteja:
- Luomme sivun johon otamme mukaan bootstrapcdn:n kautta tulevan Bootstrapin tyylitiedoston, ja tämän jälkeen lisäämme omat määrittelyt. 
- Lisäämme sivulle [navbar](https://getbootstrap.com/docs/4.5/components/navbar/)-komponentin helpottamaan sivustolla liikkumista. 
- Lisätään myös hieman tekstiä [kahteen sarakkeeseen](https://uxplanet.org/how-the-bootstrap-4-grid-works-a1b04703a3b7), ja lopuksi lisätään vielä kaksi [nappia](https://getbootstrap.com/docs/4.5/components/buttons/). Huomaa että toinen lisätyistä napeista on itseasiassa lomakkeissa käytetty submit-nappi ja toinen on linkki.

```html
<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
<link rel="stylesheet" href="custom.css">
<title>Bootstrap-esimerkki</title>

<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <a class="navbar-brand" href="/">Esimerkkisivusto</a>
  <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
      <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
    <li class="nav-item">
      <a class="nav-link" href="#">Link A</a>
    <li class="nav-item">
      <a class="nav-link" href="#">Link B</a>
  </ul>
</nav>

<div class="container">
  <h1 class="text-center">Esimerkki</h1>

  <div class="row">
    <div class="col">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit massa at augue fringilla, eget semper tellus sollicitudin. Nam vestibulum felis vitae efficitur ultrices. Quisque mattis ligula nec congue tristique. Vivamus luctus blandit mi, in fringilla odio laoreet eleifend.
    </div>
    <div class="col">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a magna iaculis, pulvinar sem id, convallis turpis. Vestibulum rhoncus ex vestibulum imperdiet fermentum. Integer ultricies tristique nunc, ut fringilla tortor.
    </div>
  </div> 

  <input class="btn btn-primary" type="submit" value="Nappi A" />
  <a href="#" class="btn btn-primary">Nappi B</a>
</div>
```

Tämän lisäksi tarvitsemme tietysti tiedoston johon viittaamme (custom.css). Tässä esimerkkinä määritämme taustavärin, teemme nappien kulmista suoria ja määritämme container-elementin maksimileveyden hieman kapeammaksi.

```css
body {
  background-color: lightblue;
}

.btn {
  border-radius: 0;
}

.container {
  max-width: 700px;
}
```

Jos omien tyyliesi kanssa on ongelmia, voit lukea aiheesta esimerkiksi [tämän](https://uxplanet.org/how-to-customize-bootstrap-b8078a011203).



Jotkin Bootstrapin komponentit käyttävät javascriptiä. Esimerkissä yllä ei sitä tarvita. Jos tarvitset sitä, tarkista dokumentaatiosta miten se lisätään sivulle.

