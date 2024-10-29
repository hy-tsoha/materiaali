## Ulkoasun toteutus

### Yhteinen ulkoasu

Yleensä kaikilla sovelluksen sivuilla on samantapainen ulkoasu, jolloin on hyvä tapa määritellä ulkoasu vain yhdessä paikassa ja viitata siihen muilla sivuilla. Esimerkiksi seuraava tiedosto `layout.html` määrittelee ulkoasun:

<p class="code-title">layout.html</p>
```jinja
{% raw %}<!doctype html>
<title>Maijan sovellus - {% block title %}{% endblock %}</title>
<h1>Maijan sovellus</h1>
<a href="/">Etusivu</a>
<a href="/login">Kirjautuminen</a>
<hr>
{% block content %}{% endblock %}
<hr>
Voit lähettää palautetta <a href="#">tästä</a>{% endraw %}
```

Tässä `block`-kohdat ovat sellaisia, joiden sisältö muuttuu riippuen sivusta. Kohtaan `title` tulee sivun otsikko ja kohtaan `content` tulee sivun varsinainen sisältö.

Ulkoasun saa käyttöön muilla sivuilla `extends`-komennon avulla seuraavasti:

<p class="code-title">index.html</p>
```jinja
{% raw %}{% extends "layout.html" %}
{% block title %}Etusivu{% endblock %}
{% block content %}
<h2>Etusivu</h2>
Tervetuloa sovellukseen!
{% endblock %}{% endraw %}
```

<p class="code-title">login.html</p>
```jinja
{% raw %}{% extends "layout.html" %}
{% block title %}Kirjautuminen{% endblock %}
{% block content %}
<h2>Kirjautuminen</h2>
<form action="/login" method="POST">
Tunnus: <input type="text" name="username"> <br>
Salasana: <input type="password" name="password"> <br>
<input type="submit" value="Kirjaudu">
</form>
{% endblock %}{% endraw %}
```

Tässä tapauksessa sivut näyttävät seuraavilta:

<img class="screenshot" src="../assets/osa-4/pohja1.png">

<img class="screenshot" src="../assets/osa-4/pohja2.png">

### Ulkoasun suunnittelu

Nettisivujen ulkoasun toteuttamiseen käytetään CSS-kieltä, jonka avulla voi määrittää sivun asettelun, värit, fontit, jne. Ulkoasun suunnittelu vaatii toisaalta tietoa CSS:n ominaisuuksista ja toisaalta graafista silmää. Kurssin taustamateriaalissa on [esimerkki]({% link _pages/ulkoasun_suunnittelu.md %}), jossa luodaan sivuston ulkoasu CSS:n avulla.

### Ulkoasu kirjaston avulla

Toinen tapa toteuttaa ulkoasu on käyttää valmista ulkoasukirjastoa. Tämän tavan etuna on, että ulkoasua ei tarvitse suunnitella tyhjästä vaan voi käyttää valmiita komponentteja, mutta toisaalta lopputulos ei ole välttämättä yksilöllinen. Kurssin taustamateriaalissa on [esimerkki]({% link _pages/bootstrap.md %}), jossa luodaan ulkoasu suositun Bootstrap-kirjaston avulla.

### CSS:n muutosten näkyminen

Huomaa, että kun muokkaat CSS-tiedostoa, muutos ei tule välttämättä näkyviin selaimessa, vaikka lataisit sivun uudestaan. Syynä tähän voi olla, että CSS-tiedosto on selaimen välimuistissa. Ratkaisu ongelmaan on ladata sivu uudestaan täydellisesti, mikä tapahtuu monissa ympäristöissä painamalla Control + F5.
