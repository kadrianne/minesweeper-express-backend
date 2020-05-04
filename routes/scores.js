const express = require('express')
const app = express()
const database = require('../models/database-config')

app.use(express.json())

app.get('/', (request,response) => {
    database('scores').select()
        .then(scores => response.json(scores))
})

app.post('/', (request,response) => {
    database.insert(request.body).returning('*').into('scores')
        .then(score => response.json({score}))
})

module.exports = app