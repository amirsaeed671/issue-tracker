const mongoose = require('mongoose')

const { PORT, DB_URI } = process.env

function connectDB(callback) {
    mongoose.connect(DB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },(err) => {
        callback(err, PORT)
    })
}

module.exports = connectDB