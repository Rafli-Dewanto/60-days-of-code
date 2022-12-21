require('dotenv').config();
const { connection } = require('./connection');
const { response } = require('./response');
const express = require('express');
const app = express();
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("server ready");
})

app.get('/getPosts', (req, res) => {
    const sql = `SELECT * FROM post`
    connection.query(sql, (err, results, fields) => {
        if (err) response(500, '', 'error', res);
        response(200, results, 'get all posts', res);
    })
})

app.get('/getPostById/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM post WHERE id = '${id}';`;
    connection.query(sql, (err, results, fields) => {
        if (err) response(500, '', 'error', res);
        if (results.length === 0) {
            response(404, '', 'data not found', res);
        } else {
            response(200, results, 'get post by id', res);
        }
    })
})

app.post('/createPost', (req, res) => {
    const { post_title, description } = req.body;
    const sql = `INSERT INTO post (post_title, description) VALUES ('${post_title}', '${description}');`;
    connection.query(sql, (err, results, fields) => {
        if (err) response(500, '', 'invalid', res);
        if (results?.affectedRows === 1) {
            const data = {
                'isSuccess': results.affectedRows,
                'id': results.insertId
            }
            response(200, data, 'Successfully create new post', res);
        }
    })
})

app.put('/updatePost', (req, res) => {
    const { id, new_description } = req.body;
    const sql = `UPDATE post SET description = '${new_description}' WHERE id = '${id}';`
    connection.query(sql, (err, results, fields) => {
        if (err) response(500, '', 'error', res);
        if (results?.affectedRows === 1) {
            const data = {
                'isSuccess': results.affectedRows,
                'message': results.info
            }
            response(200, data, 'Successfully updated post', res);
        }
    })
})

app.delete('/deletePost', (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM post WHERE id = '${id}';`
    connection.query(sql, (err, results, fields) => {
        if (err) response(500, '', 'error', res);
        if (results?.affectedRows === 1) {
            const data = {
                'isDeleted': results.affectedRows,
            }
            response(200, data, 'Successfully deleted post', res);
        }
    })
})

app.listen(port, () => console.log(`server running on http://localhost:${port}`));
