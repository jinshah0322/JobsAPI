const User = require("../models/User")
const customAPIError = require("../errors/custom-error") 

const registerUser = async (req,res)=>{
    const user = await User.create(req.body)
    const token = user.createJWT()
    res.status(201).json({user:{name:user.name},token})
}

const loginUser = async (req,res)=>{
    res.josn(req.body)
}

module.exports = {
    registerUser,
    loginUser
}