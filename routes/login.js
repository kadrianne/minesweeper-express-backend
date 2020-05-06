const express = require('express')
const app = express()
const database = require('../models/database-config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(express.json())

app.post('/', (request,response) => {
    const username = request.body.username
    const password = request.body.password
    
    // Find username in db
    database('users').select('*').where('username',username)
        .then(foundUser => {
            if (foundUser[0]) {
                checkPassword(foundUser[0].password)
            } else {
                response.status(401).json({status: 401, message: 'Username not found.'})
            }
        })

    async function checkPassword(hash){
        const match = await bcrypt.compare(password, hash)

        if (match) {
            response.status(202).json({status: 202, message: 'User logged in.'})
        } else {
            response.status(401).json({status: 401, message: 'Password incorrect.'})
        }
    }
})

module.exports = app