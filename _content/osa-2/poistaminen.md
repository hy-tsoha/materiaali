## Tiedon poistaminen

Tiedon poistaminen tietokannasta ei ole välttämättä niin helppoa kuin voisi ajatella. Tarkastellaan esimerkkisovelluksen taulua `polls`, jossa on tiedot kyselyistä:

```plaintext
pllk=# SELECT * FROM polls;
 id |          topic           |         created_at         
----+--------------------------+----------------------------
 12 | Mikä meno?               | 2020-07-05 12:39:23.456712
 13 | Kuuluuko ananas pizzaan? | 2020-07-05 12:39:54.02045
(2 rows)
```

Yritys poistaa rivi `DELETE`-komennolla epäonnistuu:

```plaintext
pllk=# DELETE FROM polls WHERE id=13;
ERROR:  update or delete on table "polls" violates foreign key constraint "choices_poll_id_fkey" on table "choices"
DETAIL:  Key (id)=(13) is still referenced from table "choices".
```

Tässä on ongelmana, että taulusta `choices` on viittaus taulun `polls` riviin 13, minkä vuoksi tietokanta ei anna poistaa riviä.

Yksi ratkaisu asiaan olisi määritellä taulun luonnissa tarkemmin `ON DELETE` -osassa, mitä tapahtuu, kun taulusta poistetaan rivi. Esimerkiksi `ON DELETE CASCADE` määrittää, että kun rivi poistetaan, niin myös siihen viittaavat rivit poistetaan. Lisätietoa tästä lähestymistavasta on kurssin _Tietokantojen perusteet_ [luvussa 6.1](https://tikape-ke20.mooc.fi/luku-6/1).

Kuitenkin usein käytännössä parempi ratkaisu voi olla toteuttaa poistaminen niin, että tietokannasta ei todellisuudessa poisteta mitään, vaan rivi vain _merkitään_ poistetuksi. Tämä onnistuu lisäämällä tauluun sarake, joka ilmaisee rivin tilan:

```plaintext
pllk=# SELECT * FROM polls;
 id |          topic           |         created_at         | status 
----+--------------------------+----------------------------+--------
 12 | Mikä meno?               | 2020-07-05 12:39:23.456712 |      1
 13 | Kuuluuko ananas pizzaan? | 2020-07-05 12:39:54.02045  |      1
(2 rows)
```

Tässä tapauksessa sarake `status` sisältää rivin tilan: tila 1 tarkoittaa, että rivi on näkyvä, ja tila 0 tarkoittaa, että rivi on poistettu. Kun sovellus hakee rivejä, se ottaa mukaan vain ne rivit, joiden tilana on 1. Tämän jälkeen rivi on helppoa merkitä poistetuksi `UPDATE`-komennolla, koska tilan vaihtaminen ei vaikuta viittauksiin:

```plaintext
pllk=# UPDATE polls SET status=0 WHERE id=13;
UPDATE 1
```

Tämän lähestymistavan etuna on myös, että poiston _peruminen_ on helppoa. Jos sovelluksessa poistettiin vahingossa jotain, poiston voi aina perua muuttamalla rivin tilaksi 1.