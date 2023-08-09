const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'Employer', // Update the referenced model to Employer
    refPath: 'eid'
  },
  loggedDate: { // Separate field for logged date
    type: String,
    default: Date.now
  },
  loggedTime: { // Separate field for logged time
    type: String // Assuming time will be stored as string in format HH:mm:ss
  },
  ipAddress: {
    type: String
  },
    spentTime: {
    type: Number,
    default: 0
  },
  logoutTime: {
    type: String
  }
});

module.exports = mongoose.model('UserActivity', userActivitySchema);
