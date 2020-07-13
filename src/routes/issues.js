const router = require('express').Router()
const Issues = require('../db/models/issues')

function getIssueRoutes() {
  router
    .route('/')
    .get(async ({query}, res) => {
      const data = await Issues.find(query).exec()
      res.status(200).json({
        status_code: 200,
        status: 'success',
        data,
      })
    })
    .post(async ({body}, res) => {
      try {
        const createdUser = await Issues.create(body)
        res.status(201).json({
          status_code: 201,
          status: 'success',
          data: createdUser,
        })
      } catch (err) {
        res.json({
          status_code: 400,
          status: 'failed',
          error: err,
        })
      }
    })
    .put((_, res) => {
      res.send('hello')
    })
    .delete(async ({body = {}}, res) => {
      const id = body.id
      try {
        await Issues.findByIdAndRemove(id)
        res.status(200).json({
          status_code: 200,
          status: 'success',
          message: 'record deleted successfuly',
        })
      } catch (err) {
        res.status(400).json({
          status_code: 400,
          status: 'failed',
          error: err,
        })
      }
    })
  return router
}

module.exports = getIssueRoutes
