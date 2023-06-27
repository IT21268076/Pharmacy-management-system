const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Employer = require('../models/Employer'); // Import the User model
const UserActivity = require('../models/UserActivity');// Import useractivity model
const { format, toDate } = require('date-fns');
const { zonedTimeToUtc } = require('date-fns-tz');
require("dotenv").config();

// Define POST endpoint for user logout
router.post('/logout', async (req, res) => {
    try {
      const secretKey = process.env.SECRET_KEY;
      
      // Get the JWT token from the request headers
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
  
      // If token not found, return error response
      if (!token) {
        return res.status(401).json({ message: 'Token not found.' });
      }
  
      // Verify the JWT token
      const decoded = jwt.verify(token, secretKey);
  
      // Extract the user ID from the decoded token
      const userId = decoded.employeeId;
  
      const currentTime = zonedTimeToUtc(new Date(), 'Asia/Colombo'); // Replace with your desired time zone
      const logoutTime = format(toDate(currentTime), 'HH:mm:ss'); // Format time as HH:mm:ss
  
      // Find the user activity document for the current user with a null logout time
      const userActivity = await UserActivity.findOne({ userId: userId, logoutTime: null });
  
      // If user activity document not found, return error response
      if (!userActivity) {
        return res.status(404).json({ message: 'User activity not found.' });
      }
  
      // Update the stored user activity object with the logout time and spent time
      userActivity.logoutTime = logoutTime;
      //userActivity.spentTime = Math.round((currentTime.getTime() - userActivity.createdAt.getTime()) / 1000);
  
      // Save the updated user activity object to the database
      await userActivity.save();
  
      // Clear the JWT token from the client-side cookie
      res.clearCookie('jwt');
  
      // Return success response
      res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
      // Return error response
      res.status(500).json({ message: `Failed to log out user. ${error.message}` });
    }
  });
  
  
  
  
  module.exports = router;