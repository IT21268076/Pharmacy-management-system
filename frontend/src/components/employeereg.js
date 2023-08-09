import React,{useState} from "react"
import axios from "axios"
import "./css/reg.css";
import Sidebar from "./Sidebar";

export default function EmployeeReg(){

    const [eid, setEid] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pno, setPno] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");

    function sendData(e){
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError("Invalid email address");
            return;
            }

        if (!validateRole(role)) {
            alert("Invalid role!"); 
            return;
          }

          if (!isValidPhoneNumber(pno)) {
            alert("Enter 10 digit phone number!"); 
            return;
          }

          if (!isValidPassword(password)) {
            alert("Enter valid password (Password must have at least 8 characters, contain at least one uppercase letter,one lowercase letter, one digit, and one special character) "); 
            return;
          }

        const newEmployee = {
            eid,
            name,
            age,
            gender,
            address,
            email,
            password,
            pno,
            role
        }

        axios.post("http://localhost:8080/employee/add", newEmployee).then(()=>{
            alert("Successfully Registered!!");
        }).catch(error => {
            // Checking for email validation error
            if (error.response && error.response.status === 400 && error.response.data.error) {
                setError(error.response.data.error); // Setting error message from backend to state
                setTimeout(() => {
                  setError(""); // Clearing error message after a delay
                }, 5000);
            } else {
              alert("Error occurred while registering employee");
            }
        })

        
    }

    function validateRole(role) {
        const validRoles = ["Admin", "Employee", "Manager","Doctor"]; // List of valid roles
        return validRoles.includes(role); // Check if the role is valid
      }

      function isValidPhoneNumber(pno) {
        const phoneRegex = /^\d{10}$/; // regular expression to match 10-digit phone number format
        return phoneRegex.test(pno);
      }
      
      function isValidPassword(password) {
        // Password must have at least 8 characters, contain at least one uppercase letter, 
        // one lowercase letter, one digit, and one special character
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{4,}$/;
        return passwordRegex.test(password);
      }
      

    return(
        <div className="container1">
            <div className="col-2">
        <Sidebar />
        </div>
            <h1>Employee Registration</h1>
            <hr></hr>
            {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}{" "}
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="eid" className="form-label">Employee ID</label>
                    <input type="text" className="form-control" id="eid" aria-describedby="eidDes"
                        onChange={(e)=>{
                            setEid(e.target.value);

                        }}
                    required/>
                    <div id="eidDes" className="form-text">Enter Employee ID given by the company.</div>
                </div>
                <div className="reg-form">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name"
                    onChange={(e)=>{
                        setName(e.target.value);

                    }}required/>
                </div>
                <div className="reg-form">
                    <label for="age" className="form-label">Age</label>
                    <input type="number" className="form-control" id="age" 
                    onChange={(e)=>{
                        setAge(e.target.value);

                    }}required/>
                    
                </div>
                <div className="reg-form">
                    <label for="gender" className="form-label">Gender</label>
                    <input type="text" className="form-control" id="gender"
                    onChange={(e)=>{
                        setGender(e.target.value);

                    }}required/>
                </div>
                <div className="reg-form">
                    <label for="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" 
                    onChange={(e)=>{
                        setAddress(e.target.value);

                    }}required/>
                </div>
                <div className="reg-form">
                    <label for="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email"
                    onChange={(e)=>{
                        setEmail(e.target.value);

                    }}/>
                </div>
                <div className="reg-form">
                    <label for="password" className="form-label">Password</label>
                    <input type="text" className="form-control" id="password"
                    onChange={(e)=>{
                        setPassword(e.target.value);

                    }} />
                </div>
                <div className="reg-form">
                    <label for="pno" className="form-label">Phone number</label>
                    <input type="number" className="form-control" id="pno"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                    style={{ 
                        borderColor: pno && !/^[0-9]{10}$/.test(pno) ? 'red' : '',
                        
                    }}
                    onChange={(e)=>{
                        setPno(e.target.value);

                    }} required/>
                </div>
                <div className="reg-form">
                    <label for="role" className="form-label">Role</label>
                    <select
                        className="form-select"
                        id="role"
                        onChange={(e) => {
                        setRole(e.target.value);
                        }}
                        
                    >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="Doctor">Doctor</option>
                    </select>
                </div>
                
                <button type="submit" className="btn btn-primary">Register</button>
</form>
        </div>
    )



}