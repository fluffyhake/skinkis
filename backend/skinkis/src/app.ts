import express, { Request, Response } from 'express'
import dotenv from "dotenv"
import { json, urlencoded } from 'body-parser'
import { connect } from './db'
import { imagesRouter } from './images/images.router'
import * as path from 'path';
import cors from 'cors';

dotenv.config()

const options: cors.CorsOptions = {
  // TODO add env variables or another entry for deployed app
  origin: "*"
};

const app = express()
const port = process.env.PORT

app.use(cors(options))
app.use(json())
app.use(urlencoded({extended: true}))

connect()

app.get('/', (req: Request, res: Response) => {
  res.send('🐦‍⬛🐦‍⬛🐦‍⬛🐦‍⬛')
})

var dir = path.join(__dirname, '../..', 'uploads');
console.log(dir)

app.use('/upload', imagesRouter)
app.use('/uploads', express.static(dir))
// 🐦‍⬛💖🥩
app.use('/%F0%9F%90%A6%E2%80%8D%E2%AC%9B%F0%9F%92%96%F0%9F%A5%A9', express.static(dir))

app.listen(port, () => {
  console.log(`App listening at ${process.env.PORT}`)
})