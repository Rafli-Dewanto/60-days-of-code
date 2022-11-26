import apiKey from "apikey.js";
const express = require('express');
const https = require('https');
const PORT = 3000
const app = express();

app.get("/", (req, res) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=${apiKey}`;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherResult = JSON.parse(data);
            const suhu = weatherResult.main.temp - 273;
            const deskripsi = weatherResult.weather[0].description;
            console.log(`Jakarta: ${suhu.toFixed(2)} derajat celcius`);
            console.log(`${deskripsi}`);
        })
    })
    res.send("server ready")
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})