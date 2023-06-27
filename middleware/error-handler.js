const CustomAPIError = require('../errors/custom-error')
const StatusCodes = require('http-status-codes')
const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    msg:err.message || "Something went wrong try again later."
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message, success:false })
  }
  if(err.code && err.code === 11000){
    customError.msg = `Duplicate value entered for email field, please choose another value`
    customError.statusCode = 400
  }
  // return res.status(400).send({err})
  return res.status(customError.statusCode).json({ msg:customError.msg,success:false})
}

module.exports = errorHandler