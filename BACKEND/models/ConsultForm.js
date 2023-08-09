const mongoose = require("mongoose");

const consultSchema = new mongoose.Schema({
  eid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  healthIssue: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("Consult", consultSchema);

module.exports = Employee;
