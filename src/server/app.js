import express from 'express'
import cors from 'express-cors'
import config from './config'
import bodyParser from 'body-parser'
import membersRouter from './routes/members'

const app = express()

const corsOptions = config.corsOptions

app.use(cors(corsOptions))
app.use((req, res, next) => {
  res.set('Access-Control-Expose-Headers', corsOptions.headers.join(', '))
  next()
})

app.use(bodyParser.urlencoded({extended: 'true'}))
app.use(bodyParser.json())

app.use('/members', membersRouter())

app.get('/', (req, res) => {
  res.json({members: '/members'})
})

app.listen(config.port, () => {
  console.log('sitterswap API is running on PORT: ' + config.port)
})
