const Issues = require('../db/models/issues')

const sendIssues = async ({query}, res) => {
  const data = await Issues.find(query).exec()
  res.status(200).json({
    status_code: 200,
    status: 'success',
    data,
  })
}

const addIssue = async ({body}, res) => {
  try {
    const createdUser = await Issues.create(body)
    res.status(201).json({
      status_code: 201,
      status: 'success',
      message: 'record succesfuly created',
      data: createdUser,
    })
  } catch (err) {
    res.json({
      status_code: 400,
      status: 'failed',
      error: err,
    })
  }
}

const updateIssue = async ({body}, res) => {
  try {
    const updatedUser = await Issues.findByIdAndUpdate(
      body.id,
      {...body, updated_at: new Date().toISOString()},
      {
        new: true,
      },
    )
    res.status(200).json({
      status_code: 200,
      status: 'success',
      message: 'record succesfuly updated',
      data: updatedUser,
    })
  } catch (err) {
    res.json({
      status_code: 400,
      status: 'failed',
      error: err,
    })
  }
}

const deleteIssue = async ({body = {}}, res) => {
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
}

module.exports = {
  sendIssues,
  addIssue,
  updateIssue,
  deleteIssue,
}
