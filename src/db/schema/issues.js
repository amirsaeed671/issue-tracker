const mongoose = require('mongoose')

const IssueSchema = new mongoose.Schema({
  issue_title: {
    type: String,
    required: true,
  },
  issue_text: {
    type: String,
    required: true,
  },
  created_on: {
    type: Date,
    default: new Date().toISOString(),
  },
  updated_on: {
    type: Date,
    default: new Date().toISOString(),
  },
  created_by: {
    type: String,
    required: true,
  },
  assigned_to: {
    type: String,
  },
  status_text: {
    type: String,
  },
  open: {
    type: Boolean,
    default: true,
  },
})

module.exports = IssueSchema
