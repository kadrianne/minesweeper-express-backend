const express = require('express')
const app = express()
const database = require('../models/database-config')
const bcrypt = require('bcrypt')
const saltRounds = 10
// const { check, validationResult } = require('express-validator');

const User = require('../models/User')

app.use(express.json())

app.get('/', (request,response) => {
    User.query().withGraphFetched('scores').select()
        .then(scores => response.json(scores))
})

app.get(`/:id`, (request,response) => {
    User.query().where('id',request.params.id).withGraphFetched('scores').select()
        .then(scores => response.json(scores))
})

app.post('/', (request,response) => {
    User.query().select('username').where('username',request.body.username)
        .then(foundUsers => {
            if (foundUsers.length === 0){
                hashedPassword = bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(request.body.password, salt, function(err, hash) {
                        let userData = {...request.body, password: hash}
            
                        User.query().insert(userData).returning('*')
                            .then(user => response.status(201).json({user: user, status: '201', message: 'User successfully created.'}))
                    })
                })
            } else {
                response.status(409).json({status: '409', message: 'Username already exists.'})
            }
        })
})

module.exports = app