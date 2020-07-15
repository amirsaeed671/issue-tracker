const router = require('express').Router()
const {
  sendIssues,
  addIssue,
  updateIssue,
  deleteIssue,
} = require('../controllers/issues')

function getIssueRoutes() {
  router
    .route('/')
    .get(sendIssues)
    .post(addIssue)
    .put(updateIssue)
    .delete(deleteIssue)
  return router
}

module.exports = getIssueRoutes
