const mongoose = require('mongoose')

function connectDB(uri, callback) {
  mongoose.connect(
    uri,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    },
    (err, db) => {
      callback(err, db)
    },
  )
}

module.exports = connectDB
