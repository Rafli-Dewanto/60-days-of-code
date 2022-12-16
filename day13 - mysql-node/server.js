require('dotenv').config()
const express = require('express');
const { connection } = require('./connection')
const { response } = require('./response')
const app = express();
app.use(express.json())
    .use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    response(200, 'API v1 ready', 'SUCCESS', res)
})

app.get('/mahasiswa', (req, res) => {
    const sql = `SELECT * FROM mahasiswa ORDER BY nama`
    connection.query(sql, (err, results, fields) => {
        // hasil dari query
        if (err) throw err
        response(200, results, "get all data from mahasiswa", res)
    })
})

app.get('/find', (req, res) => {
    const sql = `SELECT nama FROM mahasiswa WHERE npm = ${req.query.npm}`
    connection.query(sql, (err, results, fields) => {
        if (err) throw err;
        response(200, results, "find mahasiswa name", res)
    })
})

app.get('/mahasiswa/:npm', (req, res) => {
    const npm = req.params.npm;
    const sql = `SELECT * FROM mahasiswa WHERE npm = '${npm}'`;
    connection.query(sql, (err, results, fields) => {
        if (err) throw err;
        response(200, results, 'get detail mahasiswa', res);
    })
})

app.post('/mahasiswa', (req, res) => {
    const { npm, nama, kelas, jurusan } = req.body;
    const sql = `INSERT INTO mahasiswa (npm, nama, kelas, jurusan) VALUES ('${npm}', '${nama}', '${kelas}', '${jurusan}');`
    connection.query(sql, (err, results, fields) => {
        if (err) response(500, 'invalid', 'error', res);
        if (results?.affectedRows === 1) {
            const data = {
                "isSuccess": results.affectedRows,
                "id": results.insertId
            }
            response(200, data, 'Data Added Successfully', res);
        }
    })
})

app.put('/mahasiswa', (req, res) => {
    const { npm, nama, kelas, jurusan } = req.body;
    const sql = `
    UPDATE mahasiswa 
    SET nama = '${nama}', kelas = '${kelas}', jurusan = '${jurusan}' 
    WHERE npm = '${npm}';`
    connection.query(sql, (err, results, fields) => {
        if (err) response(500, "invalid", "error", res);
        if (results?.affectedRows === 1) {
            const data = {
                "isSuccess": results.affectedRows,
                "message": results.info
            }
            response(200, data, 'Data has been updated', res);
        } else {
            response(404, "user not found", "error", res);
        }
    })
})

app.delete('/mahasiswa', (req, res) => {
    const { npm } = req.body;
    const sql = `DELETE FROM mahasiswa WHERE npm = '${npm}';`
    connection.query(sql, (err, results, fields) => {
        if (err) response(500, "invalid", "error", res);
        if (results?.affectedRows === 1) {
            const data = {
                "isDeleted ": results.affectedRows
            }
            response(200, data, "Data has been deleted", res);
        } else {
            response(404, "user not found", "error", res)
        }
    })
})

app.listen(process.env.PORT || 3000, () => console.log('server running on http://localhost:3000'))