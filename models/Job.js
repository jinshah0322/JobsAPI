const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,"Please provide comapny name"],
        maxlength:50
    }, 
    position:{
        type:String,
        required:[true,"Please provide position"],
        maxlength:100
    }, 
    status:{
        type:String,
        enum:["interview","declined","pending"],
        default:"pending",
    }, 
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"Please provide userId"]
    },
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Job', jobSchema);