require('dotenv').config()
const express = require('express');
const { db } = require('./connection')
const { response } = require('./response')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    const sql = `SELECT * FROM mahasiswa`
    db.query(sql, (err, result) =>{
        // hasil dari query
        if (err) throw new Error(err)
        response(200, result, "get all data from mahasiswa", res)
    })
})

app.get('/find', (req, res) => {
    // console.log({ urlParam: req.query });
    // res.send('Hello World');
    const sql = `SELECT nama FROM mahasiswa WHERE npm = ${req.query.npm}`
    db.query(sql, (err, result) => {
        if (err) throw new Error(err)
        response(200, result, "find mahasiswa name", res)
    })
    // console.log(req.query.npm)
})

app.post('/login', (req, res) => {
    console.log({ requestFromOutside: req.body })
    res.send('login berhasil')
})

app.put('/username', (req, res) => {
    console.log({ updateData: req.body })
    res.send('update berhasil')
})

app.listen(process.env.PORT || 3000, () => console.log('server running on http://localhost:3000'))