
const express = require('express');
const router = express.Router();
const Consult = require('../models/ConsultForm');

// Render the doctor dashboard page
router.get('/doctorDashboard', async (req, res) => {
    try {
      const employees = await Consult.find();
      res.render('doctorDashboard', { employees });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  module.exports = router;