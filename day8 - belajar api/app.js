require('dotenv').config();
const express = require('express');
const https = require('https');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
    const kotaQueryUser = req.body.cityName;
    const apiKey = process.env.API_KEY;
    const unit = `metric`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${kotaQueryUser}&appid=${apiKey}&units=${unit}`;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherResult = JSON.parse(data);
            const suhu = weatherResult.main.temp;
            const deskripsi = weatherResult.weather[0].description;
            const iconPath = weatherResult.weather[0].icon;
            const iconURL = `http://openweathermap.org/img/wn/${iconPath}@2x.png`;

            res.write(`<h1>Suhu di ${kotaQueryUser}: ${suhu.toFixed(1)} derajat celcius</h1>`);
            res.write(`<p>Deskripsi: ${deskripsi}</p>`)
            res.write(`<img src="${iconURL}" alt="icon-cuaca">`)
            res.send();
        });
    });
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});