const startServer = require('./start')

//starting the server
startServer().then((server) => {
  console.log(`🚀 App is listening on PORT ${server.address().port}`)
})
