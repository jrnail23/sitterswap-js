import express from 'express'
import cors from 'cors'
import config from './config'
import bodyParser from 'body-parser'
import membersRouter from './routes/members'

const app = express()

app.use(cors({
  allowedHeaders: config.corsOptions.headers,
  exposedHeaders: config.corsOptions.headers
}))

app.use(bodyParser.urlencoded({extended: 'true'}))
app.use(bodyParser.json())

app.use('/members', membersRouter())

app.get('/', (req, res) => {
  res.json({members: '/members'})
})

app.listen(config.port, () => {
  console.log('sitterswap API is running on PORT: ' + config.port)
})
