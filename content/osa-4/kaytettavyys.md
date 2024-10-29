## Käytettävyys

Sovelluksen toimivuuden ja turvallisuuden lisäksi on tärkeää, että sovellusta on mukavaa käyttää. Tähän kuuluu muun muassa seuraavia asioita:

* Sivut latautuvat nopeasti ja sovellus reagoi välittömästi, kun käyttäjä siirtyy sivulta toiselle tai lähettää lomakkeen.
* Käyttäjälle on selvää, mitä sovelluksen toiminnot tekevät ja miten niitä on tarkoitus käyttää.
* Kun käyttäjä suorittaa toiminnon, sovellus joko ilmaisee selkeästi, että toiminto onnistui, tai näyttää ymmärrettävän virheilmoituksen.
* Sovellus toimii eri selaimilla ja eri laitteissa ja olettaa mahdollisimman vähän käyttäjän ympäristöstä.
* Sovellusta pystyy käyttämään hyvin myös silloin, kun tietokannassa on paljon tietoa (usein sovellusta kehitettäessä tietoa on vain vähän).

Verkossa on paljon sekä hyvin että huonosti toimivia sovelluksia. Hyvin toimivat sovellukset soveltuvat omien sovellusten esikuviksi, kun taas huonosti toimivat sovellukset muistuttavat siitä, mitä virheitä kannattaa varoa omissa sovelluksissa.

Hyvä tulikoe sovellukselle on kokeilla jossain vaiheessa sen toimintaa tekstiselaimessa. Esimerkiksi osassa 3 tehty keskustelusovellus näyttää seuraavalta Lynx-selaimessa:

<img class="screenshot" src="../assets/osa-4/chat1.png">

<img class="screenshot" src="../assets/osa-4/chat2.png">

<img class="screenshot" src="../assets/osa-4/chat3.png">

Tässä tapauksessa sovellusta pystyy käyttämään hyvin tekstiselaimessa, mikä on merkki siitä, että se toimii hyvin monenlaisissa ympäristöissä. Usein tähän tavoitteeseen päästään automaattisesti toteuttamalla sivut suoraviivaisella HTML:llä, jossa elementtejä on käytetty niiden merkityksen mukaisesti.

Sovellus on _saavutettava_, kun sen suunnittelussa on otettu huomioon eri käyttäjäryhmät. Esimerkiksi näkövammaiset käyttävät ohjelmia, jotka lukevat ääneen verkkosivujen sisältöä, jolloin on tärkeää, että oleellinen sisältö on saatavilla tekstimuodossa ja HTML-elementtejä on käytetty loogisesti. Lisää tietoa asiasta löydät esimerkiksi suomeksi [Ronja Ojan materiaalista](https://ronjao.github.io/Saavutettavuus/) ja englanniksi [W3C:n tutoriaalista](https://www.w3.org/WAI/tutorials/) ja [Mozillan materiaalista](https://developer.mozilla.org/en-US/docs/Web/Accessibility).
