import express from 'express'
import bodyParser from 'body-parser'

var app = express()

var port = process.env.PORT || 9006

app.use(bodyParser.urlencoded({extended: 'true'}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log('sitterswap API is running on PORT: ' + port)
})
