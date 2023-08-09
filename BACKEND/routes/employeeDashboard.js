const express = require('express');
const router = express.Router();

// Employee dashboard route
router.get('/employeeDashboard', (req, res) => {
    
    // Return data to the client
    res.send('This is the employee dashboard!');
  });

  module.exports = router;