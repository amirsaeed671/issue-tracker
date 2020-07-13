const mongoose = require('mongoose')
const IssueSchema = require('../schema/issues')

module.exports = mongoose.model('issues', IssueSchema)
