const express = require('express');
const router = express.Router();

router.get('/adminDashboard', (req, res) => {
    
    // Return data to the client
    res.send('This is the admin dashboard!');
  });

  module.exports = router;