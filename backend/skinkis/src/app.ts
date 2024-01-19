import express, { Request, Response } from 'express'
import dotenv from "dotenv"
import { json, urlencoded } from 'body-parser'
import { connect } from './db'
import { imagesRouter } from './images/images.router'

dotenv.config()


const app = express()
const port = process.env.PORT
app.use(json())
app.use(urlencoded({extended: true}))

connect()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/api/images', imagesRouter)


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})