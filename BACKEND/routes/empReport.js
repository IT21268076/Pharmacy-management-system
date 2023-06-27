const express = require('express');
const router = express.Router();
const moment = require('moment');
const { zonedTimeToUtc } = require('date-fns-tz');
const Employer = require('../models/Employer');
const UserActivity = require('../models/UserActivity');
const EmpReport = require('../models/EmpReport');

// Report Route
router.get('/empReport/:eid', async (req, res) => {
  try {
    const eid = req.params.eid;

    // Fetch the employer by eid to include employer name in the response
    const employer = await Employer.findOne({ eid });

    if (!employer) {
      return res.status(404).send('Employer not found');
    }

    // Fetch the existing EmpReport document for the given eid, if it exists
    let report = await EmpReport.findOne({ eid });

    // Fetch all UserActivity records for the given eid
    const userActivities = await UserActivity.find({ userId: employer.eid });

    let totalWorkTime = 0;
    let totalWorkDays = 0;

    const reportData = [];

    // Calculate total work time and total work days for each logged date
    userActivities.forEach(activity => {
      const loggedDate = new Date(activity.loggedDate);
      const loggedTime = new Date(`1970-01-01T${activity.loggedTime}Z`);
      const logoutTime = new Date(`1970-01-01T${activity.logoutTime}Z`);

      const loggedDateTime = new Date(loggedDate.getFullYear(), loggedDate.getMonth(), loggedDate.getDate(), loggedTime.getHours(), loggedTime.getMinutes(), loggedTime.getSeconds());
      const logoutDateTime = new Date(loggedDate.getFullYear(), loggedDate.getMonth(), loggedDate.getDate(), logoutTime.getHours(), logoutTime.getMinutes(), logoutTime.getSeconds());

      const workTime = logoutDateTime.getTime() - loggedDateTime.getTime();
      totalWorkTime += workTime;

      // Count unique logged dates
      if (!reportData.find(data => data.loggedDate === activity.loggedDate)) {
        totalWorkDays++;
        reportData.push({
          loggedDate: activity.loggedDate,
          totalWorkTime: workTime,
          totalWorkDays: 1
        });
      } else {
        const data = reportData.find(data => data.loggedDate === activity.loggedDate);
        data.totalWorkTime += workTime;
      }
    });

    // Convert milliseconds to hours for each logged date
    reportData.forEach(data => {
      data.totalWorkTime = data.totalWorkTime / (1000 * 60 * 60);
    });

    // Update the existing EmpReport document for the given eid, or create a new document if one does not exist
    if (report) {
      report.name = employer.name;
      report.totalWorkTime = isNaN(totalWorkTime) ? 0 : totalWorkTime/ (1000 * 60 * 60);
      report.totalWorkDays = totalWorkDays;
    } else {
      report = new EmpReport({
        eid,
        name: employer.name,
        totalWorkTime: isNaN(totalWorkTime) ? 0 : totalWorkTime/ (1000 * 60 * 60),
        totalWorkDays
      });
    }
    await report.save();

    // Send the report data to the frontend
    res.send({
      eid,
      name: employer.name,
      totalWorkTime: totalWorkTime / (1000 * 60 * 60),
      totalWorkDays,
      reportData
    });


  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Report Route
router.get('/empReport', async (req, res) => {
  try {
    const reports = await EmpReport.find();

    res.send(reports);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
