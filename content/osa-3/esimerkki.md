## Esimerkki: Keskustelu

Seuraava esimerkkisovellus kokoaa yhteen tähän asti käsiteltyjä asioita. Sovelluksen aiheena on keskustelupalsta, jossa käyttäjä voi luoda tunnuksen ja lähettää viestejä. Kaikki viestit ovat samassa ketjussa aikajärjestyksessä.

Sovelluksen käyttäminen näyttää tältä:

<img class="screenshot" src="../assets/osa-3/chat1.png">

<img class="screenshot" src="../assets/osa-3/chat2.png">

<img class="screenshot" src="../assets/osa-3/chat3.png">


Sovelluksen koko lähdekoodi on GitHubissa osoitteessa [https://github.com/hy-tsoha/tsoha-chat](https://github.com/hy-tsoha/tsoha-chat), ja käymme tässä tarkemmin läpi sovelluksen toimintaa.

Sovelluksen tietokanta muodostuu kahdesta taulusta:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    content TEXT,
    user_id INTEGER REFERENCES users,
    sent_at TIMESTAMP
);
```

Taulu `users` sisältää tiedot sivuston rekisteröityneistä käyttäjistä. Jokaisesta käyttäjästä tallennetaan käyttäjätunnus ja salasanan hajautusarvo. Huomaa, että sarake `username` on `UNIQUE`, mikä takaa, että jokaisella käyttäjällä on eri tunnus.

Taulu `messages` sisältää jokaisen viestin sisällön, viittauksen lähettäjään ja lähetysajan.

Sovellus muodostuu viidestä moduulista. Kuten edellisessä osiossa, `app` on päämoduuli, `db` huolehtii tietokannasta ja `routes` käsittelee sivupyynnöt. Näiden lisäksi `messages` toteuttaa viestien hakemisen ja lähettämisen sekä `users` vastaa käyttäjien hallinnasta.

Sovelluksen etusivu näyttää lähetetyt viestit aikajärjestyksessä:

<p class="code-title">routes.py</p>
```python
@app.route("/")
def index():
    list = messages.get_list()
    return render_template("index.html", count=len(list), messages=list)
```

<p class="code-title">messages.py</p>
```python
def get_list():
    sql = "SELECT M.content, U.username, M.sent_at FROM messages M, users U" \
          "WHERE M.user_id=U.id ORDER BY M.id"
    result = db.session.execute(sql)
    return result.fetchall()
```

Moduulin `messages` funktio `get_list` hakee jokaisen viestin sisällön, lähettäjän ja lähetysajan. Koska viestit ja lähettäjät ovat eri tauluissa, tässä tarvitaan kahden taulun kysely.

Seuraava koodi käsittelee käyttäjän lähettämän viestin:

<p class="code-title">routes.py</p>
```python
@app.route("/send", methods=["POST"])
def send():
    content = request.form["content"]
    if messages.send(content):
        return redirect("/")
    else:
        return render_template("error.html", message="Viestin lähetys ei onnistunut")
```

<p class="code-title">messages.py</p>
```python
def send(content):
    user_id = users.user_id()
    if user_id == 0:
        return False
    sql = "INSERT INTO messages (content, user_id, sent_at) VALUES (:content, :user_id, NOW())"
    db.session.execute(sql, {"content":content, "user_id":user_id})
    db.session.commit()
    return True
```

Moduulin `messages` funktio `send` lisää uuden viestin tietokantaan. Funktio palauttaa `True`, jos viestin lähetys onnistui, ja muuten `False`. Funktio hakee viestin lähettäjän id-numeron funktiolla `user_id`. Jos id-numero on 0, käyttäjä ei ole kirjautunut eikä viestiä voi lähettää.

Seuraavan koodin avulla käyttäjä voi kirjautua sisään:

<p class="code-title">routes.py</p>
```python
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        if users.login(username, password):
            return redirect("/")
        else:
            return render_template("error.html", message="Väärä tunnus tai salasana")
```

<p class="code-title">users.py</p>
```python
def login(username, password):
    sql = "SELECT id, password FROM users WHERE username=:username"
    result = db.session.execute(sql, {"username":username})
    user = result.fetchone()
    if not user:
        return False
    else:
        if check_password_hash(user.password, password):
            session["user_id"] = user.id
            return True
        else:
            return False
```

Tässä sivu `login` ottaa vastaan sekä `GET`- että `POST`-metodia käyttävän sivupyynnön. Jos metodi on `GET`, käyttäjälle näytetään kirjautumissivu. Jos taas metodi on `POST`, käsitellään lomake, jonka kautta käyttäjä kirjautuu sisään.

Moduulin `users` funktio `login` hoitaa varsinaisen kirjautumisen. Jos käyttäjä antaa oikean tunnuksen ja salasanan, istunnon kenttään `user_id` asetetaan käyttäjän id-numero. Tämä ilmaisee, että käyttäjä on kirjautunut sisään sovellukseen.

Käyttäjän kirjautuminen voidaan tarkastaa funktiolla `user_id`:

<p class="code-title">users.py</p>
```python
def user_id():
    return session.get("user_id", 0)
```

Tämä funktio antaa joko käyttäjän id-numeron tai arvon 0, jos käyttäjä ei ole kirjautunut sisään.

Funktio `logout` puolestaan kirjaa käyttäjän ulos poistamalla kentän `user_id` istunnosta:

<p class="code-title">users.py</p>
```python
def logout():
    del session["user_id"]
```

Sovelluksessa on myös rekisteröintitoiminto, jonka avulla uusi käyttäjä voi luoda tunnuksen ja salasanan sivustolle:

<p class="code-title">routes.py</p>
```python
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template("register.html")
    if request.method == "POST":
        username = request.form["username"]
        password1 = request.form["password1"]
        password2 = request.form["password2"]
        if password1 != password2:
            return render_template("error.html", message="Salasanat eroavat")
        if users.register(username, password1):
            return redirect("/")
        else:
            return render_template("error.html", message="Rekisteröinti ei onnistunut")
```

<p class="code-title">users.py</p>
```python
def register(username, password):
    hash_value = generate_password_hash(password)
    try:
        sql = "INSERT INTO users (username, password) VALUES (:username, :password)"
        db.session.execute(sql, {"username":username, "password":hash_value})
        db.session.commit()
    except:
        return False
    return login(username, password)
```

Sivun `login` tavoin myös sivu `register` käsittelee sekä `GET`- että `POST`-pyyntöjä ja joko näyttää lomakkeen uuden tunnuksen luomiseen tai käsittelee käyttäjän lähettämän lomakkeen.

Moduulin `users` funktio `register` toteuttaa rekisteröinnin. Jos rekisteröinti onnistui, funktio kirjaa saman tien käyttäjän sisään ja palauttaa arvon `True`. Muussa tapauksessa funktio palauttaa arvon `False`.

Koska taulun `users` sarakkeessa `username` on määre `UNIQUE`, rivin lisääminen komennolla `INSERT` epäonnistuu, jos tunnus on jo käytössä. Tämä tilanne käsitellään `try`/`except`-rakenteella, minkä ansiosta käyttäjä saa tiedon siitä, ettei rekisteröinti onnistunut.
