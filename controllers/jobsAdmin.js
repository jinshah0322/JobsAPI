const Job = require("../models/Job")
const customAPIError = require("../errors/custom-error")

const getAllJobs = async (req,res)=>{
    const jobs = await Job.find()
    res.status(200).send({jobs,count:jobs.length,success:true})
}

const getJob = async (req,res)=>{
    const jobId = req.params.id
    const job = await Job.findOne({
        _id:jobId
    })
    if(!job){
        throw new customAPIError(`No job with id ${jobId}`,404)
    }
    res.status(200).send({job,success:true})
}

const updateJobStatus = async(req,res)=>{
    const jobId = req.params.id
    const {status} = req.body
    const job = await Job.findOneAndUpdate({_id:jobId},{status},{new:true,runValidators:true})
    if(!job){
        throw new customAPIError(`No job with id ${jobId}`,404)
    }
    res.status(200).send({job,success:true})
}

module.exports = {
    getAllJobs,
    getJob,
    updateJobStatus
}