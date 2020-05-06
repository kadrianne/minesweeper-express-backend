const express = require('express')
const app = express()
const database = require('../models/database-config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = require('crypto').randomBytes(64).toString('hex')

app.use(express.json())

function generateToken(payload){
    return jwt.sign(payload,secretKey)
}

app.post('/', (request,response) => {
    const username = request.body.username
    const password = request.body.password
    
    // Find username in db
    database('users').select('*').where('username',username)
        .then(foundUser => {
            if (foundUser[0]) {
                checkPassword(foundUser[0],foundUser[0].password)
            } else {
                response.status(401).json({status: '401', message: 'Username not found.'})
            }
        })

    async function checkPassword(user,hash){
        const match = await bcrypt.compare(password, hash)
        const payload = {id: user.id, display_name: user.display_name}
        
        if (match) {
            const token = generateToken(payload)
            response.status(202).json({status: '202', message: 'User logged in.', token: token})
        } else {
            response.status(401).json({status: '401', message: 'Password incorrect.'})
        }
    }
})

module.exports = app