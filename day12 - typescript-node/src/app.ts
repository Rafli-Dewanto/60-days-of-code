import * as dotenv from 'dotenv';
dotenv.config();
import { hello } from './hello.js';
import path from 'path';
import {fileURLToPath} from 'url';
import  express, { Application, Request, Response, NextFunction }  from 'express';

const app: Application = express()
app.use(express.urlencoded({ extended: true }))
const PORT: string = process.env.PORT || '3000'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface User{
    username: string;
    password: string;
}

let users: User[] = [];

const user : User = {
    username: "user 1",
    password: "password"
}

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '/login.success.html'));
});

app.post('/login', (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    const user: User = { username: username, password: password }
    users.push(user)
    res.redirect('/login')
})

app.listen(PORT, () => console.log(`server running on http://127.0.0.1:${PORT}`))