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

For-silmukka käy läpi listan sisällön. Esimerkiksi seuraava silmukka tulostaa jokaisen listalla olevan sanan:

```python
words = ["apina", "banaani", "cembalo"]
for x in words:
    print(x)
```

```
apina
banaani
cembalo
```

Funktion `range` avulla for-silmukalla voi käydä läpi lukuvälin. Esimerkiksi seuraava koodi tulostaa sata riviä:

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

Lista on Pythonin perustietorakenne, joka sisältää joukon alkioita tietyssä järjestyksessä. Tässä on kaksi tapaa määritellä lista:

```bash
>>> x = [1,2,3]
```

```bash
>>> x = []
>>> x.append(1)
>>> x.append(2)
>>> x.append(3)
```

Listaa voi käyttää melko samalla tavalla kuin merkkijonoa:

```bash
>>> x
[1, 2, 3]
>>> len(x)
3
>>> x[0]
1
>>> y = [0]*10
>>> y
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```

Operaattori `in` kertoo, onko listalla tiettyä alkiota:

```bash
>>> x = [1,2,3]
>>> 2 in x
True
>>> 5 in x
False
```

Listan alkiot voivat olla erityyppisiä ja myös toisia listoja:

```bash
>>> a = [5,"abc",True]
>>> b = [1,2,[3,4,5]]
```

Yksi listan ja merkkijonon ero on, että listan sisältöä voi muuttaa, kun taas merkijonossa tämä ei ole mahdollista:

```bash
>>> a = [1,2,3]
>>> a[0] = 5
>>> a
[5, 2, 3]
>>> b = "abc"
>>> b[0] = "x"
TypeError: 'str' object does not support item assignment
```

Pythonin muuttujat sisältävät viittauksia. Seuraavassa koodissa `a` ja `b` viittaavat samaan listaan, joten listan `a` muuttaminen heijastuu myös listaan `b`:

```bash
>>> a = [1,2,3]
>>> b = a
>>> a[0] = 5
>>> a
[5, 2, 3]
>>> b
[5, 2, 3]
```

Listasta voi kuitenkin tehdä aidon kopion `[:]`-syntaksilla näin:

```bash
>>> a = [1,2,3]
>>> b = a[:]
>>> a[0] = 5
>>> a
[5, 2, 3]
>>> b
[1, 2, 3]
```

### Sanakirja

Sanakirja muodostuu avain-arvo-pareista. Tässä on kaksi tapaa määritellä sanakirja:

```bash
>>> s = {"apina":"monkey", "banaani":"banana", "cembalo":"harpsichord"}
```

```bash
>>> s = {}
>>> s["apina"] = "monkey"
>>> s["banaani"] = "banana"
>>> s["cembalo"] = "harpsichord"
```

Sanakirjasta voi hakea tietoa avaimen perusteella. Operaattori `in` kertoo, onko sanakirjassa tiettyä avainta.

```bash
>>> s["apina"]
'monkey'
>>> "banaani" in s
True
>>> "faarao" in s
False
```

Sanakirjan avain ei saa muuttua. Niinpä merkkijono kelpaa avaimeksi mutta lista ei kelpaa:

```bash
>>> s[[1,2,3]] = "testi"
TypeError: unhashable type: 'list'
```

### Tuple

Tuple on kokoelma arvoja sulkujen sisällä. Se toimii melko samalla tavalla kuin lista:

```bash
>>> x = (5,123,"apina")
>>> x[1]
123
>>> len(x)
3
```

Kuitenkaan tuplen sisältöä ei voi muokata:

```bash
>>> x[0] = 2
TypeError: 'tuple' object does not support item assignment
```

Tuplen avulla voidaan tallentaa toisiinsa liittyviä arvoja, joita on kiinteä määrä. Esimerkiksi seuraavalla listalla jokainen alkio sisältää koodarin nimen ja lempikielen:

```bash
>>> x = []
>>> x.append(("Maija","C++"))
>>> x.append(("Kotivalo","Python"))
>>> x.append(("Justiina","Forth"))
>>> x
[('Maija', 'C++'), ('Kotivalo', 'Python'), ('Justiina', 'Forth')]
```

Koska tuplen sisältö ei muutu, sitä voidaan käyttää sanakirjan avaimena:

```bash
s = {}
s[(1,2)] = "aybabtu"
```

## Funktiot

Oma funktio määritellään avainsanan `def` avulla. Esimerkiksi seuraava koodi määrittelee funktion `hello`, joka tervehtii parametrina annettua nimeä:

```bash
>>> def hello(name):
...     print("Moikka,",name)
... 
>>> hello("Liisa")
Moikka, Liisa
>>> hello("Kaaleppi")
Moikka, Kaaleppi
```

Seuraava funktio `check` puolestaan tarkastaa, että nimen pituus on enintään maksimipituus:

```bash
>>> def check(name,max_length):
...     return len(name) <= max_length
... 
>>> check("Liisa",6)
True
>>> check("Kaaleppi",6)
False
```

### Muuttujien näkyvyys

Funktioiden ulkopuolella määritelty muuttuja on globaali ja se näkyy kaikissa funktioissa:

```bash
>>> def test():
...     print(x)
... 
>>> x = 5
>>> test()
5
```

Kuitenkin jos muuttuja saa arvon funktiossa, siitä tulee funktion paikallinen muuttuja eikä sillä ole vaikutusta funktion ulkopuolelle:

```bash
>>> def test():
...     x = 2
...     print(x)
... 
>>> x = 5
>>> test()
2
>>> x
5
```

## Poikkeukset

## Moduulit

### Valmiit moduulit

Pythonin standardikirjasto muodostuu moduuleista, joita voi ottaa mukaan `import`-komennolla. Esimerkiksi seuraava koodi käyttää moduulin `random` funktiota `randint`:

```bash
>>> import random
>>> random.randint(1,100)
37
```

Toinen tapa on ottaa mukaan moduulista tietty funktio näin:

```bash
>>> from random import randint
>>> randint(1,100)
18
```

Käytämme kurssilla myös standardikirjaston ulkopuolisia moduuleja kuten Flask-kirjaston moduulia `flask`.

### Omat moduulit

Kun tiedostossa on Python-koodia, tiedostoa voidaan käyttää moduulina. Esimerkiksi seuraava tiedosto `test.py` määrittelee moduulin `test`:

<p class="code-title">test.py</p>
```python
def hello(name):
    print("Moikka,",name)

def check(name,max_length):
    return len(name) <= max_length
```

Voimme käyttää moduulia näin:

```bash
>>> import test
>>> test.hello("Maija")
Moikka, Maija
>>> test.check("Kaaleppi",6)
False
```

## Lisäaiheita

### Merkkijonon formatointi

Melko uusi Pythonin ominaisuus on _f-string_, jossa merkkijonon alussa on merkki `f`. Tämän avulla merkkijonon sisällä voi käyttää muuttujia ja muita lausekkeita aaltosuluissa.

```bash
>>> name = "Kotivalo"
>>> age = 5
>>> f"{name} on {age}-vuotias"
'Kotivalo on 5-vuotias'
```

### Listakooste

_Listakoosteen_ (_list comprehension_) avulla voi koostaa uuden listan vanhan listan perusteella ja muokata alkioita jollakin tavalla samalla.

Seuraavassa esimerkissä pohjana on lista `a`, listaan `b` tulee jokainen luku kaksinkertaisena ja listaan `c` tulee jokainen luku merkkijonona.

```bash
>>> a = [1,2,3]
>>> b = [2*x for x in a]
>>> c = [str(x) for x in a]
>>> b
[2, 4, 6]
>>> c
['1', '2', '3']
```

### Säännölliset lausekkeet

### Dekoraattorit