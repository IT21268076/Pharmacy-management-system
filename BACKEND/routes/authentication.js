const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Employer = require('../models/Employer'); // Import the User model
const UserActivity = require('../models/UserActivity');// Import useractivity model
const { format, toDate } = require('date-fns');
const { zonedTimeToUtc } = require('date-fns-tz');
require("dotenv").config();


// Define POST endpoint for user authentication and login
router.post('/authenticate', async (req, res) => {
  try {
    // Extract user credentials from request body
    const { email, password } = req.body;

    

    // Query MongoDB to find user by email
    const employee = await Employer.findOne({ email });


    // If user not found, return error response
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    // Compare password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, employee.password);

    // If password doesn't match, return error response
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const currentTime = zonedTimeToUtc(new Date(), 'Asia/Colombo'); // Replace with your desired time zone

    // Extract date and time separately
    const loggedDate = format(toDate(currentTime), 'yyyy-MM-dd'); // Format date as yyyy-MM-dd
    const loggedTime = format(toDate(currentTime), 'HH:mm:ss'); // Format time as HH:mm:ss

    // Create user activity object
    const userActivity = new UserActivity({
      userId: employee.eid,
      loggedDate: loggedDate,
      loggedTime: loggedTime,
      ipAddress: req.ip,
      spentTime: 0
    });

    // Save user activity to the database
    const savedUserActivity = await userActivity.save();

    // Store the saved user activity in the request object
    req.userActivity = savedUserActivity;

    //const secretKey = process.env.SECRET_KEY;
    
    //const token = jwt.sign({ employeeId: employee.eid}, secretKey, { expiresIn: '1h' });
    const secretKey = process.env.SECRET_KEY;

// Generate JWT token
  let token;
  if (employee && employee.eid) {
  token = jwt.sign({ employeeId: employee.eid }, secretKey, { expiresIn: '1h' });
  } else {
  return res.status(500).json({ message: 'Failed to generate token. Employee not found.' });
  }

  const role = employee.role;

    // Redirect to appropriate dashboard based on role
    if (employee.role === 'Admin') {
      return res.json({ role: employee.role, token }); // Redirect to admin dashboard
    } else if (employee.role === 'Manager') {
      return res.json({ role: employee.role, token });
    } else if (employee.role === 'Doctor') {
      return res.json({ role: employee.role, token }); // Redirect to manager dashboard
    } else if (employee.role === 'Employee'){
      return res.json({ role: employee.role, token }); // Redirect to employee dashboard
    }

    
    //return res.status(200).json({ role: employee.role, token });

    // Return success response with token
    //res.json({ token });
    
  } catch (error) {
    // Return error response
    res.status(500).json({ message: `Failed to authenticate user. ${error.message}` });
  }
});






module.exports = router;