---
title: Git-vinkkejä
hidden: true
---

# Git-vinkkejä

Tällä sivulla on vinkkejä Gitin käyttämiseen tämän kurssin projektissa. Oletuksena on, että projekti on GitHubissa ja se on kloonattu omalle koneelle.

## Lähtökohta

Kun projektia kehitetään, omalla koneella on paikallinen projektin _työhakemisto_ sekä siihen liittyvä repositorio. Kun työhakemiston muutokset halutaan talteen repositorioon, tiedostot valitaan ensin komennolla `git add` ja sitten suoritetaan komento `git commit`.

Tämän lisäksi GitHubissa on toinen repositorio, jonka sisällön on tarkoitus olla sama kuin oman koneen repositoriossa. Komento `git push` siirtää muutoksia omalta koneelta GitHubiin, ja komento `git pull` puolestaan siirtää muutoksia GitHubista omalle koneelle.

## Commitin tekeminen

Commitin tekeminen tarkoittaa, että haluamme tallentaa työhakemistoon tehtyjä muutoksia repositorioon. Tässä on muutamia vaiheita, joiden merkitys kannattaa ymmärtää.

Komento `git status` kertoo repositorion tilanteen, ja sitä kannattaa käyttää usein. Komento kertoo, mitä muutoksia työhakemistoon on tehty. Komennon suoritus voi näyttää vaikkapa seuraavalta:

```prompt
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   apina.txt
	modified:   banaani.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	cembalo.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

Tämä tarkoittaa, että tiedostot `apina.txt` ja `banaani.txt` ovat repositoriossa, mutta niitä on muutettu työhakemistossa. Lisäksi työhakemistoon on luotu uusi tiedosto `cembalo.txt`, jota ei vielä ole lainkaan repositoriossa.

Kun haluamme viedä muutokset repositorioon, teemme uuden commitin. Voimme valita komennolla `git add` tiedostot, jotka tulevat mukaan commitiin. Esimerkiksi voimme valita tiedostot `apina.txt` ja `cembalo.txt` näin:

```prompt
$ git add apina.txt
$ git add cembalo.txt
```

Tämän jälkeen `git status` näyttää muuttuneen tilanteen:

```prompt
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   apina.txt
	new file:   cembalo.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   banaani.txt
```

Tässä tiedostot `apinat.txt` ja `cembalo.txt` on valittu commitiin. Näemme edelleen, että tiedostoa `banaani.txt` on muokattu, mutta se ei ole menossa commitiin.

Seuraava vaihe on suorittaa komento `git commit`, joka suorittaa commitin. Tässä yhteydessä annetaan viesti, joka kertoo, mitä muutoksia kyseinen commit tekee repositorioon.

```prompt
$ git commit -m "Update apina and create cembalo"
[master 7cfdfab] Update apina and create cembalo
 2 files changed, 1 insertion(+)
 create mode 100644 cembalo.txt
```

Tämän jälkeen repositorion tilanne näyttää tältä:

```prompt
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   banaani.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

Muutettu tiedosto `banaani.txt` näkyy edelleen tässä, mutta listalla ei ole enää muita tiedostoja, koska niiden uusin versio on nyt repositoriossa.

Tässä vaiheessa muutokset on jo tehty repositorioon, mutta vasta paikallisesti. Prosessin viimeistelee komento `git push`, joka siirtää muutokset GitHubiin:

```prompt
$ git push
```

## Miten tehdä hyvä commit?

Commitin tekijän on päätettävä kaksi asiaa: mitä tiedostoja commitiin tulee mukaan ja mikä on commitin viesti. Huonoin ratkaisu on laittaa mukaan sokkona kaikki muutetut tiedostot ja viestiksi "Some changes" tai vastaavaa.

Commitissa tulisi olla muutoksia, jotka todella halutaan kaikkien näkyville repositorioon ja jotka liittyvät tiettyyn yksittäiseen asiaan (kuten uuden ominaisuuden toteutus tai jonkin bugin korjaus). Tämän vuoksi on hyvä katsoa komennolla `git status`, mitä on tapahtunut, ja valita commitiin oikeat tiedostot. Jos muokkaat samaa tiedostoa, muista tehdä tallennus ja commit, ennen kuin siirryt työskentelemään seuraavan asian parissa.

Commit-viestien kirjoittaminen on oma taiteenlajinsa. Viestin tulisi kertoa selkeästi, mitä muutoksia kyseinen commit aiheuttaa ja miksi se tehdään. Esimerkiksi [Chris Beamsin ohje](https://chris.beams.io/posts/git-commit/) on hyvää luettavaa ihanteista, joihin voi pyrkiä.

Kun commitit on tehty hyvin, projektia on mukava katsella myöhemmin GitHubissa. Viesteistä voi seurata, miten projekti on kehittynyt ja mitä muutoksia on tehty milloinkin.

## Muutosten peruminen

### Paikallisen muutoksen peruminen

Tarkastellaan vielä tilannetta, jossa tiedostoa `banaani.txt` on muutettu:

```prompt
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   banaani.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

Saattaa olla, että muutos oli erehdys ja haluaisimme perua sen. Voimme noudattaa yllä olevaa neuvoa ja perua muutoksen näin:

```prompt
$ git checkout banaani.txt
```

Tämä komento hakee tiedoston `banaani.txt` repositoriosta ja korvaa sillä muutetun tiedoston. Nyt työhakemiston tiedoston sisältö on taas sama kuin repositoriossa:

```prompt
$ git status
On branch master
nothing to commit, working tree clean
```

### Tiedosto pois commitista

Entä jos laitamme muokatun tiedoston vahingossa mukaan commitiin, mutta emme haluakaan tehdä commitia? Silloin tilanne näyttää seuraavalta:

```prompt
$ git add banaani.txt
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   banaani.txt
```

Tässäkin tapauksessa voimme seurata komennon antamaa neuvoa:

```prompt
$ git reset HEAD banaani.txt
```

Tämän seurauksena tiedosto `banaani.txt` poistetaan commitista ja se näkyy taas muokattuna:

```prompt
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	modified:   banaani.txt
```

Vastaavasti komento `git reset HEAD` ilman tiedostoa poistaa kaikki commitiin lisätyt tiedostot ja voimme aloittaa puhtaalta pöydältä commitin valmistelut.

### Commitin peruminen

Seuraavassa tilanteessa olemme vieneet commitin loppuun ja tajuamme vasta sitten, että commit oli virhe:

```prompt
$ git add banaani.txt
$ git commit -m "Change banaani"
[master eff67d3] Change banaani
 1 file changed, 1 insertion(+)
```

Tässä vaiheessa commit näkyy jo tehtyjen commitien listalla:

```prompt
$ git log
commit eff67d3743e37837e99b278c3843b30280e86925 (HEAD -> master)
Author: Antti Laaksonen <ahslaaks@cs.helsinki.fi>
Date:   Tue Jul 14 19:18:55 2020 +0300

    Change banaani

commit 7cfdfabca6b021bbe314d77b1ff0718cc415b9d5
Author: Antti Laaksonen <ahslaaks@cs.helsinki.fi>
Date:   Tue Jul 14 17:36:10 2020 +0300

    Update apina and create cembalo

...
```

Kuitenkin kun commit on tehty vasta paikallisesti, pystymme perumaan sen näin:

```prompt
$ git reset HEAD~1
```

Tämä komento siirtää repositorion tilan yhtä askelta aiemmaksi ja kaikki on taas hyvin:

```prompt
$ git log
commit 7cfdfabca6b021bbe314d77b1ff0718cc415b9d5 (HEAD -> master)
Author: Antti Laaksonen <ahslaaks@cs.helsinki.fi>
Date:   Tue Jul 14 17:36:10 2020 +0300

    Update apina and create cembalo

...
```

Kuitenkin jos muutos on viety jo eteenpäin (`git push`), niin sama konsti ei toimi, koska joku toinen on saattanut käydä hakemassa tehdyn muutoksen ja peruminen siinä vaiheessa sekoittaisi pahasti asioita. Tällöin ratkaisu on tehdä uusi commit, joka peruuttaa edellisen commitin.
