const customAPIError = require("../errors/custom-error")
const User = require("../models/User")

const isAdmin = async (req,res,next)=>{
    const userId = req.user.userId
    const user = await User.findById(userId)
    if(!user.isAdmin){
        throw new customAPIError("You are not authorized to access this page",401)
    } 
    next()
}

module.exports = isAdmin