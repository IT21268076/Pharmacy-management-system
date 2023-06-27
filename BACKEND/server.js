const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{});

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("Mongodb connection successful!!")
});

const employeeRouter = require("./routes/employees.js");
const authenticateRouter = require("./routes/authentication.js");
const activityTrackerRouter = require("./routes/activityTracker.js");
const logoutRouter = require("./routes/logout.js");
const empReportRouter = require("./routes/empReport.js");
const empDashRouter = require("./routes/employeeDashboard.js");
const adminDashRouter = require("./routes/adminDashboard.js");
const empDisplayAllRouter = require("./routes/employees.js");
const empProfileRouter = require("./routes/employees.js");
const consultRouter = require("./routes/healthForm.js");
const doctorDashboardRouter = require("./routes/doctorDashboard.js");
const deleteOneRouter = require("./routes/employees.js");
const updateRouter = require("./routes/update.js")



app.use("/employee",employeeRouter);
app.use("/employee",authenticateRouter);
app.use("/employee",activityTrackerRouter);
app.use("/employee",logoutRouter);
app.use("/employee",empReportRouter);
app.use("/employee",empDashRouter);
app.use("/employee",adminDashRouter);
app.use("/employee",empDisplayAllRouter);
app.use("/employee",empProfileRouter);
app.use("/employee",consultRouter);
app.use("/employee",doctorDashboardRouter);
app.use("/employee",deleteOneRouter);
app.use("/employee",updateRouter);


app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`)
})

