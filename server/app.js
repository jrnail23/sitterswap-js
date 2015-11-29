import express from 'express'
import cors from 'express-cors'
import bodyParser from 'body-parser'
import membersRouter from './routes/membersRouter'

// (I obviously wouldn't hardcode this in a real app)
const port = 9006

const app = express()

const corsOptions = {
  allowedOrigins: ['localhost:*'],
  headers: ['Content-Type', 'X-Requested-With', 'Location', 'ETag']
}
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

app.listen(port, () => {
  console.log('sitterswap API is running on PORT: ' + port)
})
