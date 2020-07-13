const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const connectDB = require('./db')
const getRoutes = require('./routes')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
app.use('/', getRoutes())

connectDB((err, PORT = 3000) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log('🚀 App is listening on PORT', PORT)
    })
  }
})
