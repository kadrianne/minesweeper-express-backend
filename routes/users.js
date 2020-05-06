const express = require('express')
const app = express()
const database = require('../models/database-config')
const bcrypt = require('bcrypt')
const saltRounds = 10
// const { check, validationResult } = require('express-validator');

app.use(express.json())

app.get('/', (request,response) => {
    database('users').select()
        .then(scores => response.json(scores))
})

app.post('/', (request,response) => {
    database('users').select('username').where('username',request.body.username)
        .then(foundUsers => {
            if (foundUsers.length === 0){
                hashedPassword = bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(request.body.password, salt, function(err, hash) {
                        let userData = {...request.body, password: hash}
            
                        database('users').insert(userData).returning('*')
                            .then(user => response.status(201).json({user: user, status: '201', message: 'User successfully created.'}))
                    })
                })
            } else {
                response.status(409).json({status: '409', message: 'Username already exists.'})
            }
        })
})

module.exports = app