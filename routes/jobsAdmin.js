const express = require("express")
const router = express.Router()
const {getAllJobs,getJob,updateJobStatus} = require("../controllers/jobsAdmin")

router.route("/").get(getAllJobs)
router.route("/:id").get(getJob).patch(updateJobStatus)

module.exports = router