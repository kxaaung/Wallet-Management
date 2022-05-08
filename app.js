const express = require('express')
const logger = require('./utils/logger')
const config = require('./utils/config')
// cors
const app = express()
const middlewares = require('./utils/middlewares')
const mongoose = require("mongoose")

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
app.get('/api', (req, res) => { 
    res.send('Hello world')
})

// middlewares
app.use(middlewares.unknowEndPoint)

 module.exports = app