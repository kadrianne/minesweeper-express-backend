const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

module.exports = function authenticateToken(request,response,next){
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return response.sendStatus(401)

    jwt.verify(token,process.env.SECRET_KEY,(error, user) => {
        if (error) {
            console.log(error)
            return response.sendStatus(403)
        }

        request.user = user
        next()
    })
}