const express = require('express')
const app = express()
const database = require('../models/database-config')

app.use(express.json())

app.get('/easy', (request,response) => {
    database('scores')
        .where({difficulty: 'Easy'})
        .orderBy('time', 'desc')
        .limit(10)
        .then(scores => response.json(scores))
})

module.exports = app