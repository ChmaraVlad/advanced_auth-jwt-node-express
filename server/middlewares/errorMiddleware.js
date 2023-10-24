const ApiError = require('../exceptions/apiError')

module.exports = (err, req, res, next) => {
    console.log('ERROR_MIDDLEWARE => ERROR: ', err);

    if(err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }

    return res.status(500).json({message: 'Непредвиденая ошибка'})
}