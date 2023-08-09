const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({

    eid : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required: true
    },
    age: {
        type : Number,
        required: true
    },
    gender: {
        type : String,
        required: true
    },
    address: {
        type : String,
        required: true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    pno : {
        type : Number,
        required : true
    },
    role : {
        type : String,
        required: true
    }


})

const Employer = mongoose.model("Employer",employeeSchema);

module.exports = Employer;