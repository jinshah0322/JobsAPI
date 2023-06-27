const User = require("../models/User")

const getAllJobs = async (req,res)=>{
    res.send("Get All Jobs")
}

const createJob = async (req,res)=>{
    res.send("Create a Job")
}

const getJob = async (req,res)=>{
    res.send("Get a Job")
}

const updateJob = async (req,res)=>{
    res.send("Update a Job")
}

const deleteJob = async (req,res)=>{
    res.send("Delete a Job")
}

module.exports = {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
}