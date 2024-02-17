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
  origin: [process.env.NG_URL ? process.env.NG_URL : 'http://localhost4200']
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

var dir = path.join(__dirname, '..', 'uploads');
console.log(dir)

app.use('/upload', imagesRouter)
app.use('/uploads', express.static(dir))

app.listen(port, () => {
  console.log(`App listening at ${process.env.NG_URL}`)
})