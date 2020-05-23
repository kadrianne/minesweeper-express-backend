const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
require('dotenv').config()
const authenticateToken = require('../helpers/authenticateToken')

const User = require('../models/User')

router.get('/', authenticateToken, (request,response) => {
    User.query().withGraphFetched('scores').select()
        .then(scores => response.json(scores))
})

router.get(`/scores`, authenticateToken, (request,response) => {
    User.query().where('id',request.user.id).withGraphFetched('scores').select()
        .then(scores => response.json(scores[0]))
})

router.post('/', (request,response) => {
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

module.exports = router