const mongoose = require('mongoose');

const empReportSchema = new mongoose.Schema({
  eid: {
    type: String,
    ref : 'Employer',
    refPath : 'eid',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  totalWorkTime: {
    type: Number,
    required: true
  },
  totalWorkDays: {
    type: Number,
    required: true
  }
});

const EmpReport = mongoose.model('EmpReport', empReportSchema);

module.exports = EmpReport;

