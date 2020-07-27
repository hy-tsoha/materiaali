---
hidden: true
title: TODO
---

# TODO

## Sekalaista:

✔️ Github Actions workflow on lisätty repoon. Aina kun pushaa masteriin, niin gh-pages branchiin buildataan uusi käännetty versio, joka julkaistaan. Vaihdoin kaikki palintext koodilaatikot prompt koodilaatikoiksi. 

* Jos koodilaatikkoja on useita peräkkäin ja niihin on asetettu tiedoston nimi, jälkimmäisessä tiedoston nimi näkyy oudossa paikassa.
✔️ Tiedoston nimi on korjattu oikeaan paikkaan.

* Onko tapaa määrittää sivujen järjestys sivupalkin yläosiossa? Nyt meni sattumalta hyvin mutta aakkosten mukaan järjestäminen ei ole aina toimiva tapa.

* Sivusto ei toimi vielä kovin hyvin mobiililaitteella (valikon kanssa ongelmia ja miten kuvien leveys pitäisi merkitä?)
✔️ Valikko toimii paremmin mobiilissa. Kuvien leveys on asetettu pieneksi mobiilissa. Se on asetettu `_content.scss` tiedostossa ja sielä on määritelty, kun näytön leveys on alle 500px niin käytetään pienempiä kuvia
```css
@media screen and (max-width: 500px) {
    .page-content {
        margin-left: 3em;
    }

    img {
        max-width: 300px;
    }
}
```
Nyt toimii mobiilissa, voisi vielä harkita että taustakuvaa ei näytetä mobiilissa (ei näy kovin hyvin ja voi kestää aikaa ladata se).

Ulkoasun suunnitelua käsitteleva osa on [täällä](ulkoasun_suunnittelu.html)

## Materiaaliin liittyvää

* Koodiesimerkkien tyyliin tulisi kiinnittää huomiota: miten toteuttaa asioita tyylikkäästi Pythonilla? Esim. vertailut kun on `None` tai jotain tyhjää. Mitä Pythonin tyyliohjetta seurataan ja miten tarkasti?

* Esimerkeissä haetaan nyt tietoa tietokannasta tupleina mutta voisi käyttää myös pistenotaatiota ja se olisi parempi suunta.

## Taulukoista 

Tavallinen taulukko ja tietokantataulu on erinäköisiä. Tietokanta taulua merkitään luokalla `db-table`. Markdownilla voi hyvin kirjoittaa tavallisia taulukoita ja tietokantatauluja, joilla ei ole otsikkoa. Jos tekee tietokantataulun markdownilla, niin taululle annetaan luokka `db-table` merkitsemällä se aaltosulkeisiin ennen taulukkoa.

```markdown
{:.db-table}
| id | nimi | hinta |
|-|-|-|
| 1 | lanttu | 7 |
| 2 | selleri | 4 |
| 3 | nauris | 8 |
| 4 | retiisi | 5 |
```
Tietokantataulu, jolla on otsikko tehdään käyttämällä HTML-taulukkoa. Tällöin otsikko solulle annetaan `colspan`-arvoksi sarakkeiden määrä ja otsikko solun id:ksi asetetaan `table-title`.

```html
<table class="db-table">
<thead>
  <tr>
    <th colspan="3" id="table-title">vihannekset</th>
  </tr>
  <tr>
    <th>id</th>
    <th>nimi</th>
    <th>hinta</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>1</td>
    ...
</tbody>
</table>
```

Sarakkeen leveytta ja taulukon muuta ulkonäköa voi muotoilla HTML-taulukossa antamalla `style`-attribuutille arvoja.

```html
<table class="db-table">
<thead>
  <tr>
    <th style="width: 100px;">id</th>
    <th>nimi</th>
    ...
</tbody>
</table>
```

Yhden solun leveyden muuttamimnen vaikuttaa koko sarakkeen leveyteen.
## Taulukko

| syötteen koko _n_ | suoritusaika |
|-|-|
| 10<sup>3</sup> | 0.12 s |
| 10<sup>4</sup> | 0.33 s |
| 10<sup>5</sup> | 0.79 s |
| 10<sup>6</sup> | 2.12 s |
| 10<sup>7</sup> | 5.91 s |

| id | nimi | hinta |
|-|-|-|
| 1 | lanttu | 7 |
| 2 | selleri | 4 |
| 3 | nauris | 8 |
| 4 | retiisi | 5 |

{:.db-table}
| id | nimi | hinta |
|-|-|-|
| 1 | lanttu | 7 |
| 2 | selleri | 4 |
| 3 | nauris | 8 |
| 4 | retiisi | 5 |

<table class="db-table">
<thead>
  <tr>
    <th colspan="3" id="table-title">vihannekset</th>
  </tr>
  <tr>
    <th style="width: 100px;">id</th>
    <th>nimi</th>
    <th>hinta</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>1</td>
    <td>lanttu</td>
    <td> 7</td>
  </tr>
  <tr>
    <td>2</td>
    <td>selleri</td>
    <td> 4</td>
  </tr>
  <tr>
    <td>3</td>
    <td>nauris</td>
    <td> 8</td>
  </tr>
  <tr>
    <td>4</td>
    <td>retiisi</td>
    <td>5</td>
    </tr>
</tbody>
</table>

<table class="db-table">
<thead>
  <tr>
    <th style="border: none;">id</th>
    <th style="border: none;">nimi</th>
    <th style="border: none;">hinta</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>1</td>
    <td>lanttu</td>
    <td> 7</td>
  </tr>
  <tr>
    <td>2</td>
    <td>selleri</td>
    <td> 4</td>
  </tr>
  <tr>
    <td>3</td>
    <td>nauris</td>
    <td> 8</td>
  </tr>
  <tr>
    <td>4</td>
    <td>retiisi</td>
    <td>5</td>
  </tr>
  <tr>
  <td colspan='3'>Tässä taulussa on &shy; testattu erilaista muotoilua.</td>
  </tr>
</tbody>
</table>

{:.db-table}
| id | nimi | hinta |
|-|-|-|
| 1 | lanttu | 7 |
| 2 | selleri | 4 |
| 3 | nauris | 8 |
| 4 | retiisi | 5 |

{:.db-table}
| id | nimi | hinta |
|-|-|-|
| 1 | lanttu | 7 |
| 2 | selleri | 4 |
| 3 | nauris | 8 |
| 4 | retiisi | 5 |

{:.db-table}
| id | nimi | hinta |
|-|-|-|
| 1 | lanttu | 7 |
| 2 | selleri | 4 |
| 3 | nauris | 8 |
| 4 | retiisi | 5 |

{:.db-table}
| id | nimi | hinta |
|-|-|-|
| 1 | lanttu | 7 |
| 2 | selleri | 4 |
| 3 | nauris | 8 |
| 4 | retiisi | 5 |

## Koodin näyttäminen

<p class="code-title">index.py</p>
```python
for i in range(10):
    print("lol")
```
<p class="code-title">index.py</p>
```python
for i in range(10):
    print("lol")
```

```sql
SELECT * FROM Tuotteet WHERE nimi='lanttu';
```

Syntaksiväritykset [täältä](https://spsarolkar.github.io/rouge-theme-preview/), nyt käytössä 'github'

## Konsolin näyttäminen

```prompt
$ cp apina.txt banaani.txt
$ ./testi
Hello world
$ rm apina.txt
```

Omat pluginit eivät toimi github-pagesin kanssa automaattisesti. Syntaksi 'plaintext' näyttää nyt konsolilta ilman mitään syntaksia.

```plaintext
$ cp apina.txt banaani.txt
$ ./testi
Hello world
$ rm apina.txt
```

## LaTeX-merkinnät

Tulos saadaan kaavalla $$a+\log b$$.

\\[ 1 + 2 + \dots + n = \frac{n(n+1)}{2} \\]
