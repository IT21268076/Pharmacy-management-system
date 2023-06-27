const express = require('express');
const router = express.Router();

// Admin dashboard route
router.get('/adminDashboard', (req, res) => {
    
    // Return data to the client
    res.send('This is the admin dashboard!');
  });

  module.exports = router;