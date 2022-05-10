const express = require('express')
const logger = require('./utils/logger')
const config = require('./utils/config')
// cors
const app = express()
const middlewares = require('./utils/middlewares')
const mongoose = require("mongoose")
require('express-async-errors')

const userRouter = require('./routes/user')
const walletRouter = require('./routes/wallet')

// connect to MongoDb
logger.info('connecting to ', process.env.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB')
    })

// middlewares
app.use(middlewares.requestLogger)
app.use(express.json())

// routes
app.use('/api/users', userRouter)
app.use('/api/wallets', walletRouter)

// middlewares
app.use(middlewares.unknowEndPoint)
app.use(middlewares.errorHandler)

 module.exports = app