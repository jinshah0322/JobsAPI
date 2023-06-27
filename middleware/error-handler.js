const CustomAPIError = require('../errors/custom-error')
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message, success:false })
  }
  return res.status(500).send({err})
}

module.exports = errorHandler