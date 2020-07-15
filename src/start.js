const path = require('path')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const connectDB = require('./db')
const getRoutes = require('./routes')

function startServer({db_uri, port} = {}) {
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(helmet())
  app.use(express.static(path.resolve(__dirname, 'views')))
  app.use('/', getRoutes())

  return new Promise((resolve) => {
    connectDB(db_uri || process.env.DB_URI, (err, db) => {
      if (!err) {
        const server = app.listen(port || process.env.PORT, () => {
          const originalClose = server.close.bind(server)
          server.db = db
          server.close = () => {
            return new Promise((resolveClose) => {
              originalClose(resolveClose)
            })
          }
        })
        resolve(server)
      }
    })
  })
}

module.exports = startServer
