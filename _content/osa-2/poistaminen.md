## Tiedon poistaminen

Tiedon poistaminen tietokannasta ei ole välttämättä niin helppoa kuin voisi ajatella. Tarkastellaan esimerkkisovelluksen taulua `polls`, jossa on tiedot kyselyistä:

```prompt
user=# SELECT * FROM polls;
 id |          topic           |         created_at         
----+--------------------------+----------------------------
  1 | Mikä meno?               | 2020-07-05 12:39:23.456712
  2 | Kuuluuko ananas pizzaan? | 2020-07-05 12:39:54.02045
(2 rows)
```

Yritys poistaa rivi `DELETE`-komennolla epäonnistuu:

```prompt
user=# DELETE FROM polls WHERE id=2;
ERROR:  update or delete on table "polls" violates foreign key constraint "choices_poll_id_fkey" on table "choices"
DETAIL:  Key (id)=(2) is still referenced from table "choices".
```

Tässä on ongelmana, että taulusta `choices` on viittaus taulun `polls` riviin 2, minkä vuoksi tietokanta ei anna poistaa riviä.

Yksi ratkaisu asiaan olisi määritellä taulun luonnissa tarkemmin `ON DELETE` -osassa, mitä tapahtuu, kun taulusta poistetaan rivi. Esimerkiksi `ON DELETE CASCADE` määrittää, että kun rivi poistetaan, niin myös siihen viittaavat rivit poistetaan. Lisätietoa tästä lähestymistavasta on kurssin _Tietokantojen perusteet_ [luvussa 7](https://tikape.mooc.fi/kevat-2021/content/osa-7/#viittaukset-ja-poistot).

Vaihtoehtoinen ratkaisu on toteuttaa rivin poistaminen niin, että tietokannasta ei todellisuudessa poisteta mitään, vaan rivi vain _piilotetaan_. Tämä onnistuu lisäämällä tauluun sarake, joka ilmaisee rivin näkyvyyden:

```prompt
user=# SELECT * FROM polls;
 id |          topic           |         created_at         | visible 
----+--------------------------+----------------------------+---------
  1 | Mikä meno?               | 2020-07-05 12:39:23.456712 |       t
  2 | Kuuluuko ananas pizzaan? | 2020-07-05 12:39:54.02045  |       t
(2 rows)
```

Tässä `BOOLEAN`-tyyppinen sarake `visible` ilmaisee, onko rivi näkyvissä. Tämän sarakkeen arvona on `TRUE` tai `FALSE` (PostgreSQL-tulkki näyttää `t` tai `f`). Aluksi arvo on `TRUE`, jolloin rivi on näkyvissä. Sitten kun rivi halutaan poistaa, arvoksi muutetaan `FALSE`:

```prompt
user=# UPDATE polls SET visible=FALSE WHERE id=2;
UPDATE 1
```

Tämän lisäksi sovellusta täytyy muuttaa niin, että se näyttää käyttäjälle tietoa vain riveistä, joissa sarakkeen `visible` arvo on `TRUE`.

Tämän ratkaisun etuna on, että `UPDATE`-komennolla tehtävä näkyvyyden muutos ei vaikuta viittauksiin, minkä ansiosta se onnistuu aina. Lisäksi koska tietokannasta ei poisteta tietoa, piilotettu rivi on helppoa palauttaa muuttamalla saraketta `visible`.
