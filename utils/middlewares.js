const logger = require('./logger')

const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('---')

    next()
}

const unknowEndPoint = (req, res) => {
    res.status(404).json({
        error: 'unknow endpoint'
    })
}

const errorHandler = (error, req, res, next) => {
    if(error.name === 'CastError') {
        return res.status(400).send({ errors: {message: 'malformatted id'} })
    } else if(error.name === 'MongoServerError') {
        return res.status(400).json({ errors: {message: error.message} })
    }

    next(error)
}

module.exports = {
    unknowEndPoint,
    requestLogger,
    errorHandler
}