const express = require('express');
const router = express.Router();

// Homepage route
router.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
  });