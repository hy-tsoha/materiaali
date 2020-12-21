## Tiedon poistaminen

Tiedon poistaminen tietokannasta ei ole välttämättä niin helppoa kuin voisi ajatella. Tarkastellaan esimerkkisovelluksen taulua `polls`, jossa on tiedot kyselyistä:

```prompt
user=# SELECT * FROM polls;
 id |          topic           |         created_at         
----+--------------------------+----------------------------
 12 | Mikä meno?               | 2020-07-05 12:39:23.456712
 13 | Kuuluuko ananas pizzaan? | 2020-07-05 12:39:54.02045
(2 rows)
```

Yritys poistaa rivi `DELETE`-komennolla epäonnistuu:

```prompt
user=# DELETE FROM polls WHERE id=13;
ERROR:  update or delete on table "polls" violates foreign key constraint "choices_poll_id_fkey" on table "choices"
DETAIL:  Key (id)=(13) is still referenced from table "choices".
```

Tässä on ongelmana, että taulusta `choices` on viittaus taulun `polls` riviin 13, minkä vuoksi tietokanta ei anna poistaa riviä.

Yksi ratkaisu asiaan olisi määritellä taulun luonnissa tarkemmin `ON DELETE` -osassa, mitä tapahtuu, kun taulusta poistetaan rivi. Esimerkiksi `ON DELETE CASCADE` määrittää, että kun rivi poistetaan, niin myös siihen viittaavat rivit poistetaan. Lisätietoa tästä lähestymistavasta on kurssin _Tietokantojen perusteet_ [luvussa 7](https://tikape.mooc.fi/kevat-2021/content/osa-7/#viittaukset-ja-poistot).

Kuitenkin usein käytännössä parempi ratkaisu voi olla toteuttaa poistaminen niin, että tietokannasta ei todellisuudessa poisteta mitään, vaan rivi vain _piilotetaan_. Tämä onnistuu lisäämällä tauluun sarake, joka ilmaisee rivin tilan:

```prompt
user=# SELECT * FROM polls;
 id |          topic           |         created_at         | visible 
----+--------------------------+----------------------------+---------
 12 | Mikä meno?               | 2020-07-05 12:39:23.456712 |       1
 13 | Kuuluuko ananas pizzaan? | 2020-07-05 12:39:54.02045  |       1
(2 rows)
```

Tässä tapauksessa sarake `visible` ilmaisee, onko rivi näkyvissä. Oletuksena arvo on 1, mikä tarkoittaa, että rivi on näkyvissä. Sitten kun rivi halutaan poistaa, arvoksi muutetaan 0:

```prompt
user=# UPDATE polls SET visible=0 WHERE id=13;
UPDATE 1
```

Tämän lisäksi sovellusta täytyy muuttaa niin, että se näyttää käyttäjälle tietoa vain riveistä, joissa sarakkeen `visible` arvo on 1.

Tämän lähestymistavan etuna on, että `UPDATE`-komennolla tehtävä näkyvyyden muutos ei vaikuta viittauksiin, minkä ansiosta se onnistuu aina. Lisäksi koska tietokannasta ei poisteta tietoa, piilotettu rivi on helppoa palauttaa muuttamalla saraketta `visible`.
