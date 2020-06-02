---
layout: chapter
title: TODO
---

# TODO

## Sivupohjasta
TODO:
* Osan alussa md-tiedostossa joutuu antamaan kahdesti samoja tietoja
  (aliluvun otsikko ja tunnus), pitäisi riittää antaa ne vain kerran
    - Korjattu niin, että sivuhakemisto generoidaan automaattisesti osion alkuun.
* Sivupalkki vähän leveämmäksi jotta siihen mahtuu sisältöä paremmin
  (myös kurssin otsikko pienemmällä fontilla?)
    - Sivupalkki on nyt leveämpi. En muuttanut kurssin otsikon kokoa, mutta muutin _config.yml-tiedostossa otsikon muotoon `title: Tietokanta&shy;sovellus`, jossa merkki `&shy;` muuttuu tavuviivaksi, kun teksti rivittyy pienessä tilassa ja muuten se ei näy ollenkaan. Otin samalla pois jakajan sivupalkissa ja korvasin sen tyhjällä rivillä.


* Sivupalkin raksi ei tunnu tarpeelliselta, kurssin otsikko voisi
  olla heti ylhäällä
  - Raksi on nyt piilotettu ja se tulee näkyviin vain pienillä näytöillä.

## Koodin näyttäminen

```python
for i in range(10):
	print("lol")
```
```sql
SELECT * FROM Tuotteet WHERE nimi='lanttu';
```

TODO:
* syntaksiväritys annetun kielen mukaan
  - implementoitu, jos haluaa jonkun eri highligtin niin niitä voi selata [täältä](https://spsarolkar.github.io/rouge-theme-preview/), nyt käytössä 'github'
* koodi laatikkoon
  - laatikoitu
* fontti pienemmäksi
  - vaihdettu

## Konsolin näyttäminen

```bash
$ cp apina.txt banaani.txt
$ ./testi
Hello world
$ rm apina.txt
```

TODO:
* tyyli joka näyttää konsolissa olevat komennot
    - konsoli tyyli näytetään, kun koodiympäristölle annetaan nimi "bash".

## LaTeX-merkinnät

Tulos saadaan kaavalla $$a+\log b$$.

TODO:
* Jos $-merkkien välissä on LaTeX-koodia niin se muotoillaan
  (MathJax-kirjasto ainakin osaa tämän, saa ehkä suoremmin jotenkin)
  - MathJax kirjasto on lisätty. Pitää käyttää tupladollarimerkkejä $$, jotta matematiikka muotoillaan.