---
layout: chapter
title: Osa 1
nav-title: Osa 1
sub-sections:
    - link-url: ensimmainen
      sub-section-title: Ensimmäinen web-sovellus
---
# Osa 1: Johdanto

{% for s in page.sub-sections%}
* [{{ s.sub-section-title }}](#{{s.link-url}})
{% endfor %}

Käytämme kurssilla web-sovelluksen tekemiseen Pythonin Flask-kirjastoa. Flask on kevyt ja suosittu kirjasto, joka soveltuu sekä web-ohjelmoinnin opetteluun että todellisten sovellusten alustaksi. Tässä osassa tutustumme kirjaston perusominaisuuksiin.

{% include_relative ensimmainen.md %}
