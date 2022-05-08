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

module.exports = {
    unknowEndPoint,
    requestLogger
}