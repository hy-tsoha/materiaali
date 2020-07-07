---
layout: chapter
title: Python-opas
---

# Python-opas

Tämä opas käsittelee Python-kielen perusasioita tämän kurssin näkökulmasta. Oletuksena on, että osaat ohjelmoida ennestään jollakin ohjelmointikielellä.

## Pythonin asennus

TODO

## Pythonin käyttäminen

### Komentotulkki

Pythonin komentotulkki on kätevä tapa kielen opetteluun. Komentotulkki käynnistyy komennolla `python3`, minkä jälkeen voi kirjoittaa suoritettavia komentoja.

```bash
$ python3
>>> 1+2
3
>>> len("testi")
5
>>> quit()
```

### Koodi tiedostossa

Seuraavassa tiedostossa on Python-koodi, joka kysyy käyttäjän nimeä ja näyttää sitten tervehdyksen:

<p class="code-title">test.py</p>
```python
name = input("Anna nimi: ")
print("Moikka,", nimi)
```

Koodi suoritetaan näin komentoriviltä:

```bash
$ python3 test.py
Anna nimi: Kotivalo
Moikka, Kotivalo
```

## Perustyypit

### Luvut

Pythonin lukutyypit ovat `int` (kokonaisluku) ja `float` (liukuluku). Lukujen käsittely toimii suunnilleen samalla tavalla kuin muissakin kielissä:

```bash
>>> 1+2
3
>>> 3*(5+7)
36
```

Operaattori `/` tuottaa liukuluvun myös silloin, kun molemmat luvut ovat kokonaislukuja. Sen sijaan operaattori `//` tuottaa kokonaisluvun:

```bash
>>> 5/2
2.5
>>> 5//2
2
```

Operaattori `**` laskee potenssilaskun:

```bash
>>> 3**4
81
```

Python tukee automaattisesti mielivaltaisen suuria kokonaislukuja:

```bash
>>> 2**200
1606938044258990275541962092341162602522202993782792835301376
```

### Merkkijonot

Merkkijonon voi merkitä joko lainaus- tai heittomerkeillä:

```bash
>>> "testi"
'testi'
>>> 'testi'
'testi'
```

Merkkijonoja voi yhdistää toisiinsa `+`-merkillä, kuten muissakin kielissä. Lisäksi merkkijonoa voi monistaa `*`-merkillä.

```bash
>>> "esi"+"merkki"
'esimerkki'
>>> "abc"*5
'abcabcabcabcabc'
```

Funktio `len` antaa merkkijonon pituuden:

```bash
>>> len("testi")
5
```

Merkkijonoa voi indeksoida hakasuluilla. Huomaa, että indeksoida voi myös merkkijonon lopusta alkaen negatiivisilla indekseillä.

```bash
>>> "testi"[0]
't'
>>> "testi"[1]
'e'
>>> "testi"[-1]
'i'
```

Syntaksi `[a:b]` antaa osajonon, joka alkaa kohdasta `a` ja päättyy juuri ennen kohtaa `b`:

```bash
>>> "esimerkki"[3:6]
'mer'
```

### Totuusarvot

Totuusarvot toimivat samalla tavalla kuin muissakin kielissä. Huomaa, että `True` ja `False` kirjoitetaan isolla.

```bash
>>> 3 < 8
True
>>> len("testi") == 5
True
>>> 5 > 5
False
```

Ehtoja voi yhdistää sanojan `and` ja `or` avulla. Sana `not` muuttaa ehdon käänteiseksi.

```bash
>>> 3 < 8 or 3 > 8
True
>>> not 3 > 8
True
```

Pythonin erikoisuutena totuusarvoja voi myös ketjuttaa. Seuraavat vertailut tarkoittavat samaa

```bash
>>> 3 < 7 < 8
True
>>> 3 < 7 and 7 < 8
True
```

### Tyyppimuunnokset

Funktio `str` muuttaa annetun arvon merkkijonoksi. Vastaavasti funktiot `int` ja `float` muuttavat arvon luvuksi.

```bash
>>> str(1+2)
'3'
>>> int(3)*5
15
```

Huomaa, että Python on tarkka tyypeistä. Esimerkiksi ei ole mahdollista yhdistää merkkijonoa ja lukua ilman tyyppimuunnosta:

```bash
>>> "testi"+5
TypeError: must be str, not int
>>> "testi"+str(5)
'testi5'
```

## Muuttujat

Muuttujia voi käyttää samaan tapaan kuin muissakin kielissä:

```bash
>>> a = 3
>>> b = 5
>>> a+b
8
```

Muuttujaa ei määritellä ennen käyttämistä eikä muuttujalla ole kiinteää tyyppiä:

```bash
>>> x = 5
>>> x
5
>>> x = "abc"
>>> x
'abc'
```

Funktio `type` antaa muuttujan senhetkisen tyypin:

```bash
>>> x = 5
>>> type(x)
<class 'int'>
```

## Ehtorakenne

Pythonin `if`-rakenne toimii seuraavasti:

```python
name = input("Anna nimesi: ")
if name == "Kotivalo":
    print("Moikka!")
elif name == "Justiina":
    print("Heippa!")
else:
    print("Olet tuntematon")
```

```
Anna nimesi: Justiina
Heippa!
```

Pythonissa sisennys ilmaisee, mikä koodi kuuluu lohkon sisään esimerkiksi ehtorakenteessa. Tavallinen tapa on käyttää sisennyksenä neljää välilyöntiä.

## Silmukat

### For-silmukka

For-silmukalla ja `range`-funktiolla voi käydä läpi lukuvälin. Esimerkiksi seuraava koodi tulostaa sata riviä tekstiä:

```python
for i in range(1,101):
    print("rivi", i)
```

```
rivi 1
rivi 2
rivi 3
...
rivi 100
```

Tässä `range(a,b)` tarkoittaa, että aloitetaan luvusta `a` ja lopetetaan juuri ennen lukua `b`.

### While-silmukka

While-silmukka toistaa koodia niin kauan kuin ehto on voimassa. Esimerkiksi näin:

```python
while True:
    password = input("Anna salasana: ")
    if password == "kissa":
        break
print("Tervetuloa!")
```

```
Anna salasana: testi
Anna salasana: aybabtu
Anna salasana: kissa
Tervetuloa!
```

Komennot `break` ja `continue` toimivat samalla tavalla kuin muissakin kielissä.

## Tietorakenteet

### Lista

### Sanakirja

### Tuple

## Funktiot

## Poikkeukset

## Moduulit

## Lisäaiheita

### Listakoosteet

### Säännölliset lausekkeet

### Dekoraattorit