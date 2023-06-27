// Import necessary packages and dependencies
const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const nodemailer = require("nodemailer");

// GET route to get all employees
router.get("/consult", async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.send(employees);
  } catch (error) {
    res.status(500).send();
  }
});


// POST route to send email to relevant employee
router.post("/consult/:email", async (req, res) => {
    try {
      const employee = await Employee.findOne({ email: req.params.email });
      if (!employee) {
        return res.status(404).send();
      }
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "ajithpharma8298@gmail.com",
          pass: "123asd!@#",
        },
      });
  
      const mailOptions = {
        from: "ajithpharma8298@gmail.com",
        to: employee.email,
        subject: "Your Health Issue",
        text: `Dear ${employee.name}, \n\n We have received your health issue and our team will contact you soon. \n\n Thank you.`
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
  
      res.send();
    } catch (error) {
      res.status(500).send();
    }
  });
  

module.exports = router;
