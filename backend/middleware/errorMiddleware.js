// Middleware - functions that execute during the request - response cycle
// so essentially it's stuff that gets executed when you send a request
// This error handler replaces the default and overrides its format.
const errorHandler = (err, req, res, next) => {
    const statusCode  = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        // we only need to see the method call stack when server is in development mode, and not production
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

module.exports = {
    errorHandler
}