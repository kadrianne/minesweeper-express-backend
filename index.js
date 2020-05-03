const express = require('express')
const app = express()

const knex = require('knex')
const config = require('./knexfile.js')[process.env.NODE_ENV || 'development']
const database = knex(config)

const port = process.env.port || 4000

app.get('/', (request,response) => {
    database('scores').select()
        .then(scores => response.json(scores))
})

app.listen(port)