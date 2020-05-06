const express = require('express')
const app = express()
const database = require('../models/database-config')
const bcrypt = require('bcrypt')
const saltRounds = 10

app.use(express.json())

app.get('/', (request,response) => {
    database('users').select()
        .then(scores => response.json(scores))
})

app.post('/', (request,response) => {
    hashedPassword = bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(request.body.password, salt, function(err, hash) {
            let userData = {...request.body, password: hash}

            database.insert(userData).returning('*').into('users')
                .then(user => response.json({user}))
        })
    })
})

module.exports = app