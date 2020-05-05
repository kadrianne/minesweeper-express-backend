const express = require('express')
const app = express()
const scoresRoutes = require('./routes/scores')

const port = process.env.PORT || 4000

app.use('/scores', scoresRoutes)

app.listen(port)