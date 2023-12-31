const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')

connectDB()

const app = express()

// These lines allow you to use the request body types (e.g raw, url-encoded etc)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use("/api/users", require("./routes/userRoutes"));

// overriding the default error handler to use the one specified in errorMiddleware
// just for the purpose of a more readable error message format.
app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started on port ${port}`))
