---
hidden: true
title: Dokumentaatio
---

# Dokumentaatio

Dokumentaatio auttaa lukijoitaan ymmärtämään sovellusta paremmin. Lukija 
voit olla sinä itse kun olet jo unohtanut sovelluksen yksityiskohdat, 
tai se voi olla joku repositoriosi sattumalta löytänyt, joka harkitsee 
sovelluksen kokeilemista, tai joku muu jolla on aivan eri tavoitteet. 
Harjoitustyön tapauksessa lukija on käytännössä usein toinen opiskelija 
tai työn ohjaaja, mutta dokumentointi kannattaa kirjoittaa ajatuksella, 
että dokumentaatio on suunnattu alla mainitulle käyttäjäryhmille.

Kannattaa lukea aluksi [tämä johdatus](https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/).

Dokumentaatiota kirjoittaessa kannattaa pitää mielessä kenelle ja mitä 
varten sitä kirjoitetaan. Sovelluksen dokumentaation lukijat voi 
karkeasti jaotella useampaan ryhmään. Näitä ryhmiä ovat sovelluksen 
kehittäjät, ylläpitäjät ja varsinaiset loppukäyttäjät.

Dokumentaatioon kuuluu ainakin repositorion juurihakemistossa oleva 
readme-tiedosto (README.md) jossa on vähintään jonkinlainen yleiskuvaus 
sovelluksesta. Tämä perusteella satunnainen repositoriossa vieraileva 
henkilö saa kuvan siitä mitä sovelluksen on tarkoitus tehdä. 
Readme-tiedostoon voi kirjoittaa muutakin dokumentaatiota, mutta jos 
tiedostosta kasvaa kovin pitkä, kannattaa harkita olisiko parempi että 
osa dokumentaatiosta olisi erillisessä dokumentaatiohakemistossa aiheen 
mukaisesti jaoteltuna.

Kehittäjiä varten kirjoitettavaa dokumentaatiota on mm:
- Sovelluksen rakennetta kuvaava tai selventävä dokumentaatio (esim 
tietokantakaavio helpottamaan tietokannan rakenteen hahmottamista)
- Miten sovelluksen kehitystyötä tehdään (kehitysympäristön pystytys)

Ylläpitoa varten
- Miten sovelluksen saa toimimaan tuotantoympäristöön (vaatimukset, 
konfiguraatio)

Loppukäyttäjiä varten:
- Sovelluksen käyttöliittymän olisi syytä olla helposti ymmärrettävä, 
mutta välillä voi olla tarpeen kirjoittaa dokumentaatiota myös 
loppukäyttäjille.

## Ohjeita

- Huolehdi aina että dokumentaatio on ajan tasalla. Vanhentunut ja 
harhaanjohtava dokumentaatio voi olla pahimmillaan isompi ongelma kuin 
puuttuva dokumentaatio.
- Edelliseen kohtaan liittyen, huolehdi että dokumentaatiota on 
tarvittaessa helppo päivittää! Jos dokumentaation päivittäminen on 
hankalaa tai erillään koodista, päivittäminen on helppo lykytä kunnes se 
unohtuu.
- Dokumentaatio ei ole oikeutus huonolle käyttöliittymälle.
- Huomioi dokumentaatiota kirjoittaessasi että itsellesi (tällä 
hetkellä) sovelluksen itsestään selvät asiat eivät välttämättä ole 
itsestään selviä dokumentaation lukijalle.
- Kirjoita harjoitustyön dokumentaatio 
[Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)-muodossa.

## Lisää dokumentoinnista yleisesti

- [Dokumentoinnin periaatteista](https://www.writethedocs.org/guide/writing/docs-principles/)
- [Kirjoitus ensimmäisen ohjemiston dokumentoinnista](https://www.sitepoint.com/writing-software-documentation/)
- [Dokumentaation jaottelu osa-alueisiin](https://documentation.divio.com/introduction/)
