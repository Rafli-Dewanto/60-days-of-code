const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({ "message": "🤨📸" })
})

const newspapers = [
    {
        name: 'cityam',
        address: 'https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/',
        base: ''
    },
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: ''
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: '',
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',
        base: 'https://www.telegraph.co.uk',
    },
    {
        name: 'nyt',
        address: 'https://www.nytimes.com/international/section/climate',
        base: '',
    },
    {
        name: 'latimes',
        address: 'https://www.latimes.com/environment',
        base: '',
    },
    {
        name: 'smh',
        address: 'https://www.smh.com.au/environment/climate-change',
        base: 'https://www.smh.com.au',
    },
    {
        name: 'un',
        address: 'https://www.un.org/climatechange',
        base: '',
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.co.uk/news/science_and_environment',
        base: 'https://www.bbc.co.uk',
    },
    {
        name: 'es',
        address: 'https://www.standard.co.uk/topic/climate-change',
        base: 'https://www.standard.co.uk'
    },
    {
        name: 'sun',
        address: 'https://www.thesun.co.uk/topic/climate-change-environment/',
        base: ''
    },
    {
        name: 'dm',
        address: 'https://www.dailymail.co.uk/news/climate_change_global_warming/index.html',
        base: ''
    },
    {
        name: 'nyp',
        address: 'https://nypost.com/tag/climate-change/',
        base: ''
    }
]

const articles = []

newspapers.forEach((newspaper) => {
    axios.get(newspaper.address)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html)
            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url,
                    source: newspaper.name
                })
            })
        })
        .catch((err) => console.log(err))
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get('/news/:newspaperName', (req, res) => {
    const { newspaperName } = req.params;
    const newspaperAddress = newspapers.filter((newspaper) => newspaper.name === newspaperName)[0].address
    const newspaperBase = newspapers.filter((newspaper) => newspaper.name === newspaperName)[0].base

    axios.get(newspaperAddress)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html)
            const article = []
            $('a:contains("climate")', html).each(function(){
                const title = $(this).text()
                const url = $(this).attr('href')
                article.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperName
                })
            })
            res.json(article)
        })
        .catch((err) => console.log(err))
})

const PORT = 3000
app.listen(PORT || process.env.PORT, () => console.log(`server running on http://localhost:${PORT}`))
