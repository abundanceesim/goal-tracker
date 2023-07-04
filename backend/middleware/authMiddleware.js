const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // retrieve actual token by splitting token into 2 where the space is.
            // then you'd take the second array item
            token = req.headers.authorization.split(' ')[1]

            // Verify token authenticity
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Retrieve user from the token
            // we don't need the password hash
            req.user = await User.findById(decoded.id).select('-password')

            next()
        }
        catch(error) {
            console.log(error)
            res.status(401) // not authorized
            throw new Error('Not authorized')
        }
    }
    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})

module.exports = {protect}