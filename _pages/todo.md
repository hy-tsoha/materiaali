---
layout: default
title: TODO
---

# TODO

## Sekalaista:

* Koodilaatikossa saisi olla vähän vähemmän paddingia
    - vähennetty. pitäisikö koodi laatikon olla oikeasta reunasta kapeampi? tarkoitettiinko tässä koodilaatikon ulkopuolella olevaa tilaa. pienensin nyt laatikon sisällä olevaa tilaa :D

* Jos peräkkäin on kaksi koodilaatikkoa, niin niiden välissä tulisi olla rivi tyhjää niin,
  että ne eivät ole kiinni toisissaan
* LaTeX-fontin tulisi olla vähän pienempi
* Tekstin sisällä oleva `koodi` tulisi olla vähän pienemmällä fontilla
* Olisiko etusivulla toimiva niin että läpinäkyvyyden sijasta otsikko olisi erillisessä
  valkoisessa laatikossa ja taustaa näkyy sen eri puolilla kuitenkin?
* Sivun otsikon (title-tagi) tulisi tulla automaattisesti sivun perusteella
    - sivun otsikon saa automaattisesti title tägin perusteella käyttämällä {{ page.title }}, mutta titleä ei saa automaattisesti sivun perusteella. titleä ei tällä hetkellä käytetä mihinkään, joten otin sen pois.

Tiivistin sivuhakemiston niin, että siihen ei tarvita muuta kuin alaosioiden otsikot

```
---
...
sub-sections:
      - sub-section-title: Johdatus web-sovelluksiin
      - sub-section-title: Tietokannan käyttäminen
      - sub-section-title: Sovellus tuotantoon
---
```

## Taulukot:

* Mikä olisi tyylikäs muotoilu taulukoille? Miten otsikkorivi merkitään?
* Entä miten tietokantataulut muotoillaan?
* Jos taulukkoja on peräkkäin, niin niiden välissä tulisi olla tyhjä rivi

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

## Koodin näyttäminen

```python
for i in range(10):
    print("lol")
```

```sql
SELECT * FROM Tuotteet WHERE nimi='lanttu';
```

Syntaksiväritykset [täältä](https://spsarolkar.github.io/rouge-theme-preview/), nyt käytössä 'github'

## Konsolin näyttäminen

```bash
$ cp apina.txt banaani.txt
$ ./testi
Hello world
$ rm apina.txt
```

## LaTeX-merkinnät

Tulos saadaan kaavalla $$a+\log b$$.

\\[ 1 + 2 + \dots + n = \frac{n(n+1)}{2} \\]
