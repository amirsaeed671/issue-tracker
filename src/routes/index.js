const path = require('path')
const router = require('express').Router()
const getIssueRoutes = require('./issues')

function getRoutes() {
  router.use('/api/issues', getIssueRoutes())
  router.get('/', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../views/index.html'))
  })
  return router
}

module.exports = getRoutes
