## Sovellus tuotantoon

TODO: sovellus siirretään Herokuun

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