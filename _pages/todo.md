---
hidden: true
title: TODO
---

# TODO

* Esimerkeissä tulisi käsitellä `None`-arvot Python-tyylisesti
* Esimerkeissä haetaan nyt tietoa tietokannasta tupleina, mutta voisi käyttää myös pistenotaatiota ja se olisi parempi suunta.
* Ensimmäisessä tietokantaesimerkissä haetaan erikseen rivien määrä ja rivien sisältö. Tämä ei ole hyvä tapa.
* Tiedoston `requirements.txt` roolista pitäisi kertoa enemmän. Olisiko parempi muokata sitä käsin niin, että mukana on vain tarvittava?
* Materiaali voisi selventää, ovatko id-numerot 1, 2, 3, ... jne kelvollisia linkeissä vai pitäisikö käyttää satunnaisia? Todellisissa palveluissa (kuten YouTubessa) on satunnaiset.
  * Kuten olikin jo hieman keskustelua, myös Youtube käyttää id:tä linkissä, mutta järjestelmän hajauttamisen johdosta niissä id:issä on hankala käyttää juoksevaa numerointia, joten Youtube generoi sen muulla tavoin. Youtube tarjoaa kanavien osoitteiksi vaihtoehtoisesti myös kustomoitua urlia (mutta ei kaikille kanaville) tai käyttäjätunnukseen perustuvaa osoitetta (riippuen kanavan luontiajasta, legacy)
  * Myös videoiden urlit perustuvat videoiden id-tunnukseen vastaavasti kuin normaalit kanavien tunnukset (kuulemma Youtube käyttää hieman muunnettua base64:sta)
  * Tässä voi tietysti puhua myös tietoturvasta ja tunnusten käymisestä läpi järjestyksessä, mutta mielestäni tsohassa olisi ensisijaista toteuttaa pääsynhallinta oikein, sen sijaan että luotetaan siihen että kun osoite on piilossa kukaan asiaton ei löydä sinne.
* Materiaalin linkit toimivat ilman .html, se olisi parempi tapa tehdä linkit
* Jinjan rooli on epäselvä (missä se suoritetaan, mitä sillä kannattaa tehdä)
* Esimerkissä `visible`-sarake on `INTEGER`, parempi olisi `BOOLEAN`
* Pitäisi kertoa tarkemmin, miten SQL-komentojen parametrit toimivat. Termin "parametrisoitu kysely" mainitsemista voi harkita.
* Materiaalissa olevassa esimerkissä uuden tunnuksen luonnissa kysytään salasana vain kerran, mikä on huono malli.
* Lähes kaikissa Bootstrapia käyttävissä sovelluksissa sivu on liian leveä ja etenkin lomakkeet näyttävät huonoilta.
* Materiaali ei kerro `flash`-funktiosta, se voisi olla hyödyllinen tietää
* Herokussa kellonaika on pielessä (ymmärrettävästi) Suomeen verrattuna, mitähän sille kannattaisi tehdä
  * Herokun dynot, samoin kuin suurin osa maailman palvelimista, on UTC-ajassa. Oikea ratkaisu on tallettaa ero sovellukseen ja muuntaa ajat ennen kuin ne lähetetään käyttäjälle, mutta Heroku sallii myös aikavyöhykkeen vaihtamisen https://help.heroku.com/JZKJJ4NC/how-do-i-set-the-timezone-on-my-dyno
* HTML:n komponentit päivämäärän ja ajan kysymiseen ovat ongelmallisia (tätä ei ole käsitelty materiaalissa)
* Kuinka tyhjentää istunnon avain, jos sitä ei ole välttämättä olemassa? Avaimen tarkastus tai `pop` ovat ratkaisuja.
* PRG-mallin (Post/Redirect/Get) selitys puuttuu materiaalista
* HTML:n moderneista ominaisuuksista lomakkeissa pitäisi kertoa (uusia kenttätyyppejä, required, pattern, yms.)
* Olisi hyvä korostaa, että viittaus tyyliin "static/..." ei toimi kunnolla vaan pitäisi olla "/static/..."
* Kurssin materiaali ilmeisesti ei näy hyvin Safari-selaimella

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
