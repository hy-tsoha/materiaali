---
layout: default
title: TODO
---

# TODO

## Sekalaista:

* Konsolin väritys ei toimi vielä hyvin, osassa 1 testiaineistoa. Edit: nyt toimii paljon paremmin, mutta vielä jotkin sanat ovat häiritsevästi lihavoituina. Lisäksi $ olisi ehkä hyvä olla väritettynä.
* Otsikon ja tekstin välissä olevasta raosta näkyvä taustakuva on lievästi häiritsevä (otsikon ja tekstin laatikko ovat myös eri levyiset). Vastaava rako on myös tekstin ja alalaidan hy-laatikon välissä. Voisiko nämä kaikki yhdistää niin että ne ovat yhtenäisenä alueena? (Ja tuo harmaa on myös aika rumasti yleisestä väriskaalasta poikkeava)
* Pages-sivuilla (etusivu, aikataulu) sivupalkki peittää tekstin jos käyttäjä kasvattaa fonttikokoa riittävästi. Varsinkin vanhempien opiskelijoiden joukossa osa opiskelijoista tekee tätä. (Näin käy myös silloin kun selainikkuna on kapea.)
* Jos koodilaatikossa on tiedoston nimi, koodin kopiointi on hankalaa

## Taulukot:

* Mikä olisi tyylikäs muotoilu taulukoille? Miten otsikkorivi merkitään?
* Jos taulukkoja on peräkkäin, niin niiden välissä tulisi olla tyhjä rivi
* Entä miten tietokantataulut muotoillaan?
  - Riittää keskittyä tapaukseen, jossa esitetään taulussa olevat rivit
    (eli otsikkorivillä ovat taulun sarakkeiden nimet)
  - Tauluja tulisi pystyä olemaan vierekkäin ja tulisi pystyä asettamaan
    (tarvittaessa) itse sarakkeen leveys, jotta ne saa yhdenmukaisesti
  - Esimerkki asettelusta: https://tikape-ke20.mooc.fi/luku-1/3

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

<p class="code-title-bash">index.py</p>
```bash
$ cp apina.txt banaani.txt
$ ./testi
Hello world
$ rm apina.txt
```

## LaTeX-merkinnät

Tulos saadaan kaavalla $$a+\log b$$.

\\[ 1 + 2 + \dots + n = \frac{n(n+1)}{2} \\]
