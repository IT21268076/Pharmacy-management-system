// Import necessary packages and dependencies
const express = require("express");
const router = express.Router();
const Consult = require("../models/ConsultForm");
const nodemailer = require("nodemailer");


// POST route to save consult form data
router.post("/sconsult", async (req, res) => {
    try {
      const consult = new Consult(req.body);
      await consult.save();
      res.status(201).send(consult);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  
// GET route to get all employees
router.get("/gconsult", async (req, res) => {
  try {
    const employees = await Consult.find({});
    res.send(employees);
  } catch (error) {
    res.status(500).send();
  }
});


// POST route to send email to relevant consult
router.post("/consult/:email", async (req, res) => {
    try {
      const consult = await Consult.findOne({ email: req.params.email });
      if (!consult) {
        return res.status(404).send();
      }
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "your_email@example.com",
          pass: "your_password",
        },
      });
  
      const mailOptions = {
        from: "your_email@example.com",
        to: consult.email,
        subject: "Your Health Issue",
        text: `Dear ${consult.name}, \n\n We have received your health issue and our team will contact you soon. \n\n Thank you.`
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
