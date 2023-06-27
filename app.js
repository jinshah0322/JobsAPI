require('dotenv').config();
require('express-async-errors');

//extra security
const helmet = require("helmet")
const cors = require("cors")
const xss = require("xss-clean")
const ratelimiter = require("express-rate-limit")


const express = require('express');
const app = express();
const mongoose = require("mongoose")
const connectDB = require("./db/connect")
const authRoute = require("./routes/auth")
const jobsRoute = require("./routes/jobs") 
const jobsAdminRoute = require("./routes/jobsAdmin")
const authMiddleware = require("./middleware/authentication")
const isAdmin = require("./middleware/isAdmin")

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set("trust proxy",1)
app.use(express.json());
app.use(ratelimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}))
app.use(helmet())
app.use(cors())
app.use(xss())

// routes
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/jobs",authMiddleware, jobsRoute)
app.use("/api/v1/admin",authMiddleware,isAdmin,jobsAdminRoute)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();