const router = require('express').Router()

function getIssueRoutes() {
  router
    .route('/')
    .get((_, res) => {
      // console.log(req.query)
      res.send('hello')
    })
    .post((_, res) => {
      res.send('hello')
    })
    .put((_, res) => {
      res.send('hello')
    })
    .delete((_, res) => {
      res.send('hello')
    })
  return router
}

module.exports = getIssueRoutes
