require('dotenv').config();
require('express-async-errors');
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

app.use(express.json());
// extra packages

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