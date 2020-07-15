require('dotenv').config()
const axios = require('axios')
const startServer = require('../start')
const {generateIssue} = require('../../test/utils')

describe('issues crud tests', () => {
  let api, server

  beforeAll(async () => {
    server = await startServer({
      db_uri: process.env.TEST_DB_URI,
    })
    const baseURL = `http://localhost:${server.address().port}/api`
    api = axios.create({baseURL})
  })

  afterEach(async () => {
    await server.db.collection('issues').deleteMany({})
  })

  afterAll(() => server.close())

  test('it should create a new card and get that card from db', async () => {
    const cardData = generateIssue()

    const createdIssue = await api.post('/issues', cardData)

    expect(createdIssue.data.data).toMatchObject(cardData)
    expect(createdIssue.data.status_code).toEqual(201)
    expect(createdIssue.data.status).toEqual('success')

    const created_id = createdIssue.data.data._id
    const updatedName = 'updated_test_user'

    const updateData = generateIssue({
      id: created_id,
      created_by: updatedName,
    })

    const updatedIssue = await api.put('/issues', updateData)

    expect(updatedIssue.data.status_code).toEqual(200)
    expect(updatedIssue.data.status).toEqual('success')
    expect(updatedIssue.data.data.created_by).toEqual(updatedName)

    await api.delete('/issues', {data: {id: created_id}})

    const getIssues = await api.get('/issues')

    expect(getIssues.data.data).toHaveLength(0)
  })
})
