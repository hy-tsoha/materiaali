---
title: Python-opas
---

# Python-opas

Tämä opas käsittelee Python-kielen perusasioita tämän kurssin näkökulmasta. Oletuksena on, että osaat ohjelmoida ennestään jollakin ohjelmointikielellä.

Perusteiden oppimisen jälkeen hyvä lähde on Pythonin [dokumentaatio](https://docs.python.org/3/).

## Pythonin asennus

Python on valmiiksi asennettuna useissa järjestelmissä. Tarvittaessa löydät ohjeita asentamiseen Pythonin [lataussivulta](https://www.python.org/downloads/).

## Pythonin käyttäminen

### Komentotulkki

Pythonin komentotulkki on kätevä tapa kielen ominaisuuksien testaamiseen. Komentotulkki käynnistyy komennolla `python3`, minkä jälkeen voi kirjoittaa suoritettavia komentoja.

```prompt
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
# kommentti merkitään näin
name = input("Anna nimi: ")
print("Moikka,", name)
```

Koodi suoritetaan näin komentoriviltä:

```prompt
$ python3 test.py
Anna nimi: Kotivalo
Moikka, Kotivalo
```

## Tyypit ja muuttujat

Pythonin tavallisimmat tietotyypit ovat `int` (kokonaisluku), `float` (liukuluku), `str` (merkkijono) ja `bool` (totuusarvo). Esimerkkejä operaatioista:

```python
print(5*(2+3)) # 30
print(5/2) # 2.5
print(5//2) # 2
print(3**4) # 81
print(2**100) # 1267650600228229401496703205376
print("esi"+"merkki") # esimerkki
print("abc"*4) # abcabcabcabc
print(1+2 == 3) # True
print(3 > 7) # False
```

Pythonissa uusi muuttuja syntyy automaattisesti, kun muuttujalle annetaan arvo:

```python
name = "Maija"
age = 25
```

Muuttujalla ei ole kiinteää tyyppiä vaan tyyppi määräytyy sen mukaan, millainen arvo muuttujaan sijoitetaan.

Python on tarkka tyypeistä, eikä esimerkiksi seuraava koodi toimi, koska merkkijonoa ja lukua ei voi suoraan yhdistää keskenään:

```python
a = "testi"
b = 123
c = a+b
```

Ratkaisu on käyttää funktiota `str`, joka muuttaa tyypin merkkijonoksi:

```python
a = "testi"
b = 123
c = a+str(b)
```

Vastaavasti funktiot `int` ja `float` muuttavat tyypin kokonais- ja liukuluvuksi.

## Lohkot

Pythonissa sisennys ilmaisee, mikä koodi kuuluu lohkon sisään esimerkiksi ehto- ja toistorakenteissa.

Esimerkiksi seuraavassa koodissa on `if`-rakenne:

```python
if status == 1:
    role = "user"
elif status == 2:
    role = "admin"
else:
    role = "guest"
```

Seuraavassa koodissa puolestaan on `while`-rakenne:

```python
counter = 10
while counter >= 1:
    print(counter)
    counter -= 1
```

## Listat

Pythonin perustietorakenne on lista, jonka alkiot merkitään hakasulkujen `[` ja `]` sisään. Esimerkiksi seuraava koodi luo listan, jossa on kolme sanaa:

```python
words = ["apina", "banaani", "cembalo"]
```

Toinen tapa luoda lista on aloittaa tyhjästä listasta ja lisätä alkiot `append`-metodilla:

```python
words = []
words.append("apina")
words.append("banaani")
words.append("cembalo")
```

Listan pituus saadaa funktiolla `len` ja listan alkoihin pääsee käsiksi `[]`-syntaksilla:

```python
print(len(words)) # 3
print(words[0]) # apina
print(words[1]) # banaani
words[0] = "apila"
print(words[0]) # apila
```

Pythonissa voi myös indeksoida negatiivisilla luvuilla, jolloin alkio haetaan listan lopusta laskien:

```python
print(words[-1]) # cembalo
```

Operaattori `in` kertoo, onko tietty alkio listalla:

```python
print("cembalo" in words) # True
print("tuuba" in words) # False
```

Lista ja merkkijono muistuttava Pythonissa toisiaan, ja merkkijonon merkkejä pystyy käsittelemään samaan tapaan kuin listan alkioita. Erona on kuitenkin, että merkkijonon sisältöä ei voi muuttaa eli merkkijonossa ei ole esimerkiksi metodia `append`.

## For-silmukka

Pythonin `for`-silmukka käy läpi listan alkiot:

```python
words = ["apina","banaani","cembalo"]
for word in words:
    print(word)
```

```
apina
banaani
cembalo
```

Funktio `range` tuottaa lukuvälin, joka voidaan käydä läpi `for`-silmukalla:

```python
for i in range(5):
    print("rivi",i)
```

```
rivi 0
rivi 1
rivi 2
rivi 3
rivi 4
```

Tässä `range(n)` tarkoittaa, että lukuväli alkaa 0:sta ja päättyy juuri ennen lukua `n`. Vastaavasti `range(a,b)` tarkoittaa, että lukuväli alkaa `a`:sta ja päättyy juuri ennen lukua `b`.

## Lisää tietorakenteita

### Sanakirja

Sanakirja (dict) muodostuu avain-arvo-pareista. Esimerkiksi seuraava koodi luo sanakirjan, jossa on kolme paria:

```python
ages = {"Maija":25, "Anna":20, "Kaaleppi":42}
```

Voimme myös luoda vastaavan sanakirjan näin:

```python
ages = {}
ages["Maija"] = 25
ages["Anna"] = 20
ages["Kaaleppi"] = 42
```

Sanakirjasta voi hakea tietoa avaimen perusteella:

```python
print(ages["Anna"]) # 20
```

Operaattori `in` kertoo, onko sanakirjassa tiettyä avainta:

```python
print("Maija" in ages) # True
print("Uolevi" in ages) # False
```

Voimme käydä sanakirjan avaimet läpi `for`-silmukalla:

```python
for name in ages:
    print(name,"on",ages[name],"vuotta")
```

```
Maija on 25 vuotta
Anna on 20 vuotta
Kaaleppi on 42 vuotta
```

### Tuple

Tuple on kokoelma arvoja sulkujen sisällä. Se näyttää melko samalta kuin lista:

```python
person = ("Maija", 25, "Finland")
print(person[0]) # Maija
print(person[1]) # 25
print(person[2]) # Finland
```

Tuple eroaa kuitenkin listasta siinä, että sen sisältöä ei voi muuttaa. Tuplea käytetään toisiinsa liittyvän tiedon kokoamiseen yhteen yllä olevan esimerkin kaltaisesti.

## Viittaus ja kopiointi

Pythonissa muuttujassa on aina viittaus varsinaiseen sisältöön. Seuraava koodi havainnollistaa asiaa:

```python
lista1 = [1,2,3]
lista2 = lista1
lista1[0] = 5
print(lista1[0]) # 5
print(lista2[0]) # 5
```

Koodissa muuttujat `lista1` ja `lista2` viittaavat samaan listaan, joten kun listaa muutetaan muuttujan `lista1` kautta, niin muutos heijastuu myös muuttujaan `lista2`.

Voimme kuitenkin tarvittaessa luoda listasta kopion `[:]`-syntaksilla, jolloin listat ovat erillisiä:

```python
lista1 = [1,2,3]
lista2 = lista1[:]
lista1[0] = 5
print(lista1[0]) # 5
print(lista2[0]) # 1
```

## Funktiot

### Funktion määrittely

Oma funktio määritellään avainsanan `def` avulla. Esimerkiksi seuraava koodi määrittelee funktion `hello`, joka tervehtii parametrina annettua nimeä:

```python
def hello(name):
    print("Moikka,",name)

hello("Liisa")
hello("Kaaleppi")
```

```
Moikka, Liisa
Moikka, Kaaleppi
```

Seuraava funktio `check` puolestaan tarkastaa, että nimen pituus on enintään maksimipituus:

```python
def check(name, max_length):
    return len(name) <= max_length

print(check("Liisa",6)) # True
print(check("Kaaleppi",3)) # False
```

### Muuttujien näkyvyys

Päätasolla luotu muuttuja näkyy kaikissa funktioissa:

```python
def test():
    print(x) # 5

x = 5
test()
print(x) # 5
```

Jos taas muuttuja luodaan funktion sisällä, se näkyy vain kyseisessä funktiossa:

```python
def test():
    x = 5
    print(x) # 5

test()
print(x) # ei toimi
```

Jos muuttuja saa arvon sekä päätasolla että funktiossa, syntyy kaksi erillistä muuttujaa:

```python
def test():
    x = 2
    print(x) # 2

x = 1
test()
print(x) # 1
```

## Virheenkäsittely

Koodissa mahdollisesti tapahtuvan virheen voi käsitellä `try`/`except`-rakenteella.

Esimerkiksi seuraava funktio pyrkii lukemaan käyttäjältä kokonaisluvun. Jos käyttäjä antaa jotain muuta, funktion `int`-kutsuminen aiheuttaa virheen, jolloin virheen käsittelyn seurauksena funktio palauttaa arvon 0.

```python
def read_int():
    value = input("Anna luku: ")
    try:
        result = int(value)
    except:
        result = 0
    return result
```

## Moduulit

### Valmiit moduulit

Komento `import` ottaa käyttöön moduulin. Esimerkiksi Pythonin standardikirjastossa on suuri määrä moduuleita eri tarkoituksiin.

Seuraava koodi käyttää Pythonin standardikirjaston moduulia `random`, jossa on satunnaisuuteen liittyviä toimintoja. Koodi arpoo satunnaisen luvun funktiolla `randint`.

```python
import random
print(random.randint(1,10))
```

Toinen tapa on hakea moduulista funktio, jolloin sitä voi käyttää suoraan:

```python
from random import randint
print(randint(1,10))
```

Käytämme kurssilla myös Pythonin standardikirjaston ulkopuolisia moduuleja kuten Flask-kirjaston moduulia `flask`.

### Omat moduulit

Kun tiedostossa on Python-koodia, tiedostoa voidaan käyttää moduulina. Esimerkiksi seuraava tiedosto `test.py` määrittelee moduulin `test`:

<p class="code-title">test.py</p>
```python
def hello(name):
    print("Moikka,",name)
```

Tämän jälkeen voimme käyttää moduulia näin:

```python
import test
test.hello("Maija")
test.hello("Anna")
test.hello("Uolevi")
```

```
Moikka, Maija
Moikka, Anna
Moikka, Uolevi
```

### Moduulin suoritus

Kun moduuli otetaan mukaan `import`-komennolla, siellä oleva koodi suoritetaan. Kuitenkin jos moduuli otetaan mukaan useita kertoja, koodi suoritetaan vain ensimmäisellä kerralla.

Seuraava moduuli havainnollistaa asiaa:

<p class="code-title">test.py</p>
```python
def hello(name):
    print("Moikka,",name)

print("Täällä ollaan")
```

Seuraava koodi ottaa moduulin mukaan kahdesti, mutta vain ensimmäisellä kerralla suoritetaan moduulissa oleva `print`-komento:

```python
import test
test.hello("Maija")
test.hello("Anna")
import test
test.hello("Uolevi")
```

```
Täällä ollaan
Moikka, Maija
Moikka, Anna
Moikka, Uolevi
```

## Pythonin tyyliohje

Pythonin tyyliohje [PEP 8](https://www.python.org/dev/peps/pep-0008/) antaa neuvoja Python-ohjelmoinnin tyyliasioihin. Ohjeeseen on hyvä tutustua ja seurata sitä harkinnan mukaan.

Tyyliohje ottaa kantaa esimerkiksi seuraaviin asioihin:

* Sisennyksen leveys on neljä välilyöntiä.
* Muuttujan asetuksen ja vertailujen kummallakin puolella on välilyönti (esimerkiksi asetus `x = 5` ja vertailu `a < b`).
* Muuttujien, funktioiden ja moduulien nimet kirjoitetaan pienillä kirjaimilla. Jos nimi muodostuu useasta sanasta, niiden välissä voi olla alaviiva `_`.

## Lisäaiheita

### Merkkijonon muotoilu

Melko uusi Pythonin ominaisuus on _f-string_, jossa merkkijonon alussa on merkki `f`. Tämän avulla merkkijonon sisällä voi käyttää muuttujia ja muita lausekkeita aaltosuluissa.

```python
name = "Maija"
age = 25
print(f"{name} on {age}-vuotias") # Maija on 25-vuotias
```

### Listakooste

Listakooste luo uuden listan vanhan listan perusteella ja voi samalla muokata alkioita jollakin tavalla. Esimerkiksi seuraava koodi luo uuden listan, jossa on jokaisen sanan pituus:

```python
words = ["apina", "banaani", "cembalo"]
lengths = [len(x) for x in words]
print(lengths) # [5, 6, 6]
```

### Säännölliset lausekkeet

Säännöllinen lauseke (_regex_) määrittelee merkkijonon halutun sisällön. Voimme käsitellä säännöllisiä lausekkeita moduulin `re` avulla.

Esimerkiksi seuraava koodi varmistaa, että merkkijono `word` muodostuu kirjaimista `a`–`z`:

```python
import re

if re.match(r"^[a-z]+$", word):
    ok = True
```

Tässä tapauksessa säännöllinen lauseke on `^[a-z]+$`. Se muodostuu seuraavista osista:

* `^` tarkoittaa merkkijonon alkua
* `[a-z]` tarkoittaa mitä tahansa merkkiä väliltä `a`–`z`
* `+` toistaa edeltävää osaa yhden tai useamman kerran
* `$` tarkoittaa merkkijonon loppua

### Dekoraattorit

Dekoraattori luo funktion ympärille kuoren, jonka avulla funktion kutsuminen aiheuttaa automaattisesti jonkin lisätoiminnon.

Esimerkiksi seuraavassa koodissa dekoraattori `debug` tulostaa rivin tietoa aina, kun funktiota kutsutaan, ja näyttää funktion nimen ja parametrit.

```python
import functools

def debug(f):
    @functools.wraps(f)
    def wrapper(*args):
        print(f"kutsu {f.__name__} parametreilla {args}")
        f(*args)
    return wrapper

@debug
def hello(name):
    print("Moikka,", name)

hello("Maija")
hello("Kaaleppi")
```

```
kutsu hello parametreilla ('Maija',)
Moikka, Maija
kutsu hello parametreilla ('Kaaleppi',)
Moikka, Kaaleppi
```

Flask-kirjastossa dekoraattorit ovat keskeisessä roolissa, koska niiden avulla määritetään, mitä sivupyyntöjä mikäkin funktio käsittelee.