const Job = require("../models/Job")
const customAPIError = require("../errors/custom-error")

const getAllJobs = async (req,res)=>{
    const jobs = await Job.find({createdBy:req.user.userId}).sort("createdAt")
    res.status(200).send({jobs,count:jobs.length,success:true})
}

const createJob = async (req,res)=>{
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(200).send({job,success:true})
}

const getJob = async (req,res)=>{
    const userId = req.user.userId
    const jobId = req.params.id
    const job = await Job.findOne({
        _id:jobId,
        createdBy:userId
    })
    if(!job){
        throw new customAPIError(`No job with id ${jobId}`,404)
    }
    res.status(200).send({job,success:true})
}

const updateJob = async (req,res)=>{
    const userId = req.user.userId
    const jobId = req.params.id
    const {company,position} = req.body
    if(company === '' || position === ''){
        throw new customAPIError("Company or position fields can't be empty",400)
    }
    const job = await Job.findOneAndUpdate({_id:jobId,createdBy:userId},{company,position},{new:true,runValidators:true})
    if(!job){
        throw new customAPIError(`No job with id ${jobId}`,404)
    }
    res.status(200).send({job,success:true})
}

const deleteJob = async (req,res)=>{
    const userId = req.user.userId
    const jobId = req.params.id
    const job = await Job.findOneAndDelete({
        _id:jobId,
        createdBy:userId
    })
    if(!job){
        throw new customAPIError(`No job with id ${jobId}`,404)
    }
    res.status(200).send({msg:"Job deleted successfully",success:true})
}

module.exports = {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob,
}