---
layout: default
title: TODO
---

# TODO

## Sekalaista:

* Jos peräkkäin on kaksi koodilaatikkoa, niin niiden välissä tulisi olla rivi tyhjää niin,
  että ne eivät ole kiinni toisissaan
    - Vähän enemmän tilaa voisi olla vielä
* Konsolin väritys ei toimi vielä hyvin, osassa 1 testiaineistoa

## Taulukot:

* Mikä olisi tyylikäs muotoilu taulukoille? Miten otsikkorivi merkitään?
* Jos taulukkoja on peräkkäin, niin niiden välissä tulisi olla tyhjä rivi
* Entä miten tietokantataulut muotoillaan?
  - Riittää keskittyä tapaukseen, jossa esitetään taulussa olevat rivit
    (eli otsikkorivillä ovat taulun sarakkeiden nimet)
  - Tauluja tulisi pystyä olemaan vierekkäin ja tulisi pystyä asettamaan
    (tarvittaessa) itse sarakkeen leveys, jotta ne saa yhdenmukaisesti
  - Esimerkki asettelusta: https://tikape-ke20.mooc.fi/luku-1/3

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
