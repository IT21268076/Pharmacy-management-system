const router = require("express").Router();
const bcrypt = require('bcrypt');

let Employer = require("../models/Employer");

//add
router.route("/add").post(async(req,res)=>{

    const {eid,name,age,gender,address,email,pno,role} = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
        
    //validate 
    // Validate email format
   if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format!" });
    }

    // Validate age is a number
    /*if (typeof age !== 'number' || isNaN(age)) {
        return res.status(400).json({ error: "Age must be a valid number!" });
    }

    // Validate password length
    if (!isValidPassword(password)) {
        return res.status(400).json({ error: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one numeric digit!" });
    }*/

    // Validate phone number format
    if (!isValidPhoneNumber(pno)) {
        return res.status(400).json({ error: "Invalid phone number format!" });
    }

    // Validate role
    const validRoles = ["Admin", "Employee", "Manager","Doctor"]; //list of valid roles
    if (!validRoles.includes(role)) {
        return res.status(400).json({ error: "Invalid role!" });
    }


    // Check if eid already exists
    let existingEmployee = await Employer.findOne({ eid });
    if (existingEmployee) {
        return res.status(400).json({ error: "Employee with the same eid already exists!" });
    }

    Employer.findOne({ email })
        .then((existingEmployee) => {
            if (existingEmployee) {
                return res.status(400).json({ error: "Employee with the same email already exists!" });
            }


            const newEmployee = new Employer({
                eid,
                name,
                age,
                gender,
                address,
                email,
                password,
                pno,
                role

            })

            newEmployee.save().then(()=>{
                res.json("Employee Registered!!")
            }).catch((err)=>{
                console.log(err);
            });

        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
        });    
});
//email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



function isValidPhoneNumber(pno) {
    const phoneRegex = /^\d{10}$/; // regular expression to match 10-digit phone number format
    return phoneRegex.test(pno);
  }
  

// Password validation function
/*function isValidPassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return passwordRegex.test(password);
}*/



//display all
router.route("/displayall").get((req,res)=>{

    Employer.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err)
    })
})


//update
/*router.route("/update/:eid").put(async(req,res)=>{

    let userId = req.params.eid;
    const {eid,name,age,gender,address,email,password,pno,role} = req.body;

    //validate 
    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format!" });
    }

    // Validate age is a number
    /*if (typeof age !== 'number' || isNaN(age)) {
        return res.status(400).json({ error: "Age must be a valid number!" });
    }

    // Validate password length
    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long!" });
    }

    // Validate phone number format
    if (!isValidPhoneNumber(pno)) {
        return res.status(400).json({ error: "Invalid phone number format!" });
    }*/

    // Validate role
    /*const validRoles = ["Admin", "Employee", "Manager","Doctor"]; //list of valid roles
    if (!validRoles.includes(role)) {
        return res.status(400).json({ error: "Invalid role!" });
    }


    

    const updateEmployee = {
        eid,
        name,
        age,
        gender,
        address,
        email,
        password: await bcrypt.hash(req.body.password, 10),
        pno,
        role
    };
    

    await Employer.findOneAndUpdate({eid: userId}, updateEmployee, {new: true}).exec().then((updatedEmployee)=>{
        if (updatedEmployee) {
            res.status(200).send({status: "Employee updated!!", employee: updatedEmployee});
        } else {
            res.status(404).send({error: "Employee not found!"});
        }

    }).catch((err)=>{
        res.status(500).send({status: "Error occured!!"});
    })
        
           


})*/



  
  

//delete
/*router.route("/delete/:eid").delete(async(req,res)=>{

    let userId = req.params.eid;

    await Employer.findOneAndDelete({eid: userId}).then(()=>{
        res.status(200).send({status: "Account deleted!!"});

    }).catch((err)=>{
        res.status(500).send({status: "Error occured!!",error: err.message});
    })

})*/

router.route("/delete/:eid").delete(async (req, res) => {
    try {
      const deletedEmployee = await Employer.findOneAndDelete({ eid: req.params.eid });
      if (!deletedEmployee) {
        return res.status(404).send({ status: "Employee not found" });
      }
      res.status(200).send({ status: "Employee deleted successfully" });
    } catch (error) {
      res.status(500).send({ status: "Error occurred!!", error: error.message });
    }
  });
  


//display one
/*router.route("/display/:eid").get(async (req, res) => {
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
});*/

router.route("/displayone").get(async (req, res) => {
    const { eid, name, email } = req.query;
    try {
        let employee;
        if (eid) {
            employee = await Employer.findOne({ eid });
        } else if (name && email) {
            employee = await Employer.findOne({ name, email });
        } else if (name) {
            employee = await Employer.findOne({ name });
        } else if (email) {
            employee = await Employer.findOne({ email });
        }
        if (employee) {
            res.status(200).send({ status: "Employee found!!", employee });
        } else {
            res.status(404).send({ status: "Employee not found!!" });
        }
    } catch (err) {
        res.status(500).send({ status: "Error occurred!!", error: err.message });
    }
});

/*router.route("/displayby/name/:name").get(async (req, res) => {
    const { name } = req.params;
    try {
      const employees = await Employer.find({ name: { $regex: name, $options: "i" } });
      if (employees.length > 0) {
        res.status(200).send({ status: "Employees found!!", employees });
      } else {
        res.status(404).send({ status: "Employees not found!!" });
      }
    } catch (err) {
      res.status(500).send({ status: "Error occurred!!", error: err.message });
    }
  });*/
  






  router.get('/employees/count', async (req, res) => {
    try {
      const count = await Employer.countDocuments({});
      res.status(200).send({ count });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
  
module.exports = router;