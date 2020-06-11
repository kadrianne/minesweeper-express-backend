const express = require('express')
const cors = require('cors')
const app = express()
const scoresRoutes = require('./routes/scores')
const highScoresRoutes = require('./routes/highScores')
const usersRoutes = require('./routes/users')
const loginRoutes = require('./routes/login')

const port = process.env.PORT || 4000

const corsOptions = {
    origin: 'https://modernminesweeper.web.app/'
}
app.use(cors(corsOptions))
app.use(express.json())
app.use('/scores', scoresRoutes)
app.use('/highscores', highScoresRoutes)
app.use('/users', usersRoutes)
app.use('/login', cors(), loginRoutes)

app.listen(port)