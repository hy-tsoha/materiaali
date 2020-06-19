---
layout: chapter
nav-title: Osa 2
sub-sections:
      - sub-section-title: Tietokannan käyttäminen
      - sub-section-title: Kirjautuminen ja istunnot
---
# Osa 2

```bash
$ pip install python-dotenv
```

```
DATABASE_URL=postgresql:///pllk
```

```python
from dotenv import load_dotenv
import os

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
```

{% include_relative tietokanta.md %}
{% include_relative kirjautuminen.md %}
