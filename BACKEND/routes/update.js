const express = require('express');
const router = express.Router();
const Employer = require('../models/Employer');


// GET employee by EID
router.route("/display/:eid").get(async (req, res) => {
    let userId = req.params.eid;
    try {
        const employee = await Employer.findOne({eid: userId});
        if (employee) {
            res.status(200).send({ status: "Employee found!!", employee });
        } else {
            res.status(404).send({ status: "Employee not found!!" });
        }
    } catch (err) {
        res.status(500).send({ status: "Error occurred!!", error: err.message });
    }
});

// Define a function to validate phone numbers
function isValidPhoneNumber(pno) {
  const regex = /^\d{10}$/; // Matches 10 digits
  return regex.test(pno);
}

// UPDATE employee by EID
router.put("/update/:eid", async (req, res) => {
  const eid = req.params.eid;
  try {
    // Validate phone number format
    /*if (!isValidPhoneNumber(pno)) {
      return res.status(400).json({ error: "Invalid phone number format!" });
    }*/
    const employee = await Employer.findOneAndUpdate(
      { eid },
      req.body,
      { new: true }
    );
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).send(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
