require('dotenv').config()
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static('public'));
app.use("/css", express.static(__dirname + 'public/css'));
app.use("/img", express.static(__dirname + 'public/img'));

// Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

const dataDummy = ["rafli@a", "password"];

app.get("/login", (req, res) => {
    res.render('login');
    res.json(dataDummy);
});

app.post("/login", (req, res) => {
    const username = req.body.inputEmail;
    const password = req.body.password;
    if (dataDummy.includes(username) && dataDummy.includes(password)) {
        res.render("login-success")
    } else {
        res.render("register")
    }
});

app.post("/register", async (req, res) => {
    // try {
    //     const hashedPassword = await bcrypt.hash(req.body.password, 10)
    //     const user = { name: req.body.inputEmail, password: hashedPassword }
    //     dataDummy.push(user)
    //     res.render('register-success')
    // } catch {
    //     res.status(500).send()
    // }
    const username = req.body.inputEmail;
    const password = req.body.password;
    const user = { name: username, password: password };
    dataDummy.push(user);
    res.render("register-success");
});

app.listen(process.env.PORT || 3000, () => console.log(`server live on http://localhost:3000`));