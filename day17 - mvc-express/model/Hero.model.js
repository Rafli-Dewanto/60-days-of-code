import Connection from '../config.js';

export const getHero = (req, res) => {
    const sql = `SELECT * FROM hero;`

    Connection.query(sql, (err, results, fields) => {
        if (err) return console.log(err);
        // hasil query dari mysql2 sudah object, tidak perlu diparse. data = results
        const heroes = {
            title: "List Hero Mobile Legend",
            data: JSON.parse(JSON.stringify(results))
        }
        res.render('index', { heroes });
        res.end()
    })
}

export const getHeroById = (req, res, id) => {
    const sql = `SELECT * FROM hero WHERE hero.id=${id};`

    Connection.query(sql, (err, results, fields) => {
        if (err) return console.log(err);
        if (results.length === 0) return res.status(404).send()
        const hero = {
            title: "Hero By Id",
            data: JSON.parse(JSON.stringify(results))
        }
        res.render('heroDetail', { hero });
        res.end();
    })
}

export const updateHeroByid = (req, res, data) => {
    const { id, name, role } = data;
    const sql = `UPDATE hero SET name = '${name}', role = '${role}' WHERE id = '${id}';`

    Connection.query(sql, (err, results) => {
        if (err) return console.log(err);
        res.redirect('/hero');
        res.end();
    })
}

export const addHero = (req, res, data) => {
    const { name, role } = data;
    const sql = `INSERT INTO hero (name, role) VALUES ('${name}', '${role}');`

    Connection.query(sql, (err, results) => {
        if (err) return console.log(err);
        res.redirect('/hero');
        res.end();
    })
}

export const removeHero = (req, res, id) => {
    const sql = `DELETE FROM hero WHERE id = '${id}';`

    Connection.query(sql, (err, results) => {
        if (err) throw err
        res.redirect('/hero')
        res.end()
    })
}