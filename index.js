const express = require('express')
const cors = require('cors')
const app = express()
const scoresRoutes = require('./routes/scores')

const port = process.env.PORT || 4000

app.use(cors())
app.use('/scores', scoresRoutes)

app.listen(port)