const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }))

app.post("/", (req, res) => {
    const num1 = parseInt(req.body.num1);
    const num2 = parseInt(req.body.num2);
    const result = num1 + num2;
    res.send(`Hasil penjumlahan dari ${num1} + ${num2} = ${result}`);
});

app.post("/bmi", (req, res) => {
    const beratBadan = parseInt(req.body.beratBadan);
    const tinggiBadan = parseInt(req.body.tinggiBadan);
    const bmi = beratBadan / Math.pow(beratBadan, 2);
    res.send(`BMI Anda: ${bmi}`)
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    res.send(`<h1>login berhasil</h1>`)
})


app.listen(PORT, (err) => {
    if (err) throw new err;
    console.log(`server running on port ${PORT}`);
});

