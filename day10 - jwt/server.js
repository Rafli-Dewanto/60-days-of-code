require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

const posts = [
    {
        username: "rafli",
        title1: "post 1"
    },
    {
        username: "dewanto",
        title1: "post 2"
    }
];

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
});

function authenticate(req, res, nex) {

}

app.listen(3000, () => {
    console.log(`server ready`);
})