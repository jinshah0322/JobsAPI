const User = require("../models/User")
const customAPIError = require("../errors/custom-error") 
const { custom } = require("joi")

const registerUser = async (req,res)=>{
    const user = await User.create(req.body)
    const token = user.createJWT()
    res.status(201).json({user:{name:user.name},token})
}

const loginUser = async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new customAPIError("Please provide email and password",400)
    }
    const user = await User.findOne({email:email})
    if(!user){
        throw new customAPIError("User does not exist",404)
    } 
    const isPasswordCorrenct = await user.comparePassword(password)
    if(!isPasswordCorrenct){
        throw new customAPIError("Incorrect Password",401)   
    }
    const token = user.createJWT()
    res.status(200).send({user:{name:user.name},token})
}

module.exports = {
    registerUser,
    loginUser
}