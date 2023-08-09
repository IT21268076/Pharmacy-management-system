const express = require('express');
const router = express.Router();
const UserActivity = require('../models/UserActivity');

// Define GET endpoint for user activities
router.get('/track', async (req, res) => {
  try {
    // Query MongoDB for all user activities
    const userActivities = await UserActivity.find();

    // Return success response with user activities as JSON
    return res.status(200).json({ userActivities });

  } catch (error) {
    // Return error response
    res.status(500).json({ message: `Failed to get user activities. ${error.message}` });
  }
});

module.exports = router;
