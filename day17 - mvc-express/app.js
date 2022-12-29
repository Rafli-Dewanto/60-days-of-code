import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { router as hero } from './controller/hero.controller.js'
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', 'view')
app.use('/hero', hero)

app.use('/', (req, res) => {
    res.send('main server');
})

app.listen(port || process.env.PORT, () => console.log(`listening on http://localhost:${port}`));