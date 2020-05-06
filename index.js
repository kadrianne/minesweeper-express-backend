const express = require('express')
const cors = require('cors')
const app = express()
const scoresRoutes = require('./routes/scores')
const highScoresRoutes = require('./routes/highScores')
const usersRoutes = require('./routes/users')
const loginRoutes = require('./routes/login')

const port = process.env.PORT || 4000

app.use(cors())
app.use('/scores', scoresRoutes)
app.use('/highscores', highScoresRoutes)
app.use('/users', usersRoutes)
app.use('/login', loginRoutes)

app.listen(port)