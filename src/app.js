const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const connectDB = require('./db')

const app = express()
app.use(cors())
app.use(helmet())

connectDB((err, PORT = 3000) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log('🚀 App is listening on PORT', PORT)
    })
  }
})
