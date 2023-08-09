import React, { useState } from 'react';
import axios from 'axios';
import './css/empUpdate.css';
import Sidebar from "./Sidebar";
import './css/reg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateEmployeeForm () {
  const {eid} = useParams();
  //const [name, setName] = useState('');
  //const [age, setAge] = useState('');
  //const [gender, setGender] = useState('');
  //const [address, setAddress] = useState('');
  //const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [pno, setPno] = useState('');
  // const [role, setRole] = useState('');


  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [values, setValues]  =useState({
    eid: eid,
    name: '',
    email: '',
    pno: '',
    address: '',
    password: '',
    age: ''
  })

  useEffect(()=>{
    axios.get('http://localhost:8080/employee/display/'+eid)
    .then(res =>// console.log(res)
       {
       setValues({...values, name: res.data.employee.name, email: res.data.employee.email, age: res.data.employee.age, pno: res.data.employee.pno, address: res.data.employee.address, password: res.data.employee.password})
     })
    .catch(err => console.log(err))
  }, [])

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate phone number format
  const phoneRegex = /^\d{10}$/; // regular expression to match 10-digit phone number format
  if (!phoneRegex.test(values.pno)) {
    setError('Invalid phone number format!');
    return;
  }

    axios.put(`http://localhost:8080/employee/update/`+eid, values)
    .then(res => {

      if (res.status === 200) {
        
        setSuccess('Employee updated!');
      } else {
        setError('Error occurred while updating employee.');
      }
    })
    .catch (err => console.log(err)) 
  };

  

  return (
    <div className="container1">
      
      <div className="col-2">
        <Sidebar />
        </div>
        <div className="col-md-9 offset-md-1 mt-2">
          <h1 className="text-center mb-6">Update Employee</h1>
          <hr></hr>
          {error && <p className="alert alert-danger">{error}</p>}
          {success && <p className="alert alert-success">{success}</p>}
          <form >
            <div className="form-group">
              <label htmlFor="eid">Employee ID:</label>
              <input
                type="text"
                className="form-control"
                id="eid"
                value={values.eid}
                disabled
                //onChange={(e) => setEid(e.target.value)}
                />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={values.name}
                onChange={(e) => setValues({...values, name: e.target.value})}
              />
            </div>
            
            
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={values.email}
                onChange={(e) => setValues({...values, email: e.target.value})}
                />
            </div>

            <div className="form-group">
              <label htmlFor="pno">Phone number:</label>
             <input
            type="text"
            className="form-control"
            id="pno"
            value={values.pno}
            onChange={(e) => setValues({...values, pno: e.target.value})}
            />
        </div>

        <div className="form-group">
        <label>
          Password:
          <input
            type="text"
            className="form-control"
                id="password"
            value={values.password}
            onChange={(e) => setValues({...values, password: e.target.value})}
          disabled
          />
        </label>
        </div>

        <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="text"
                className="form-control"
                id="age"
                value={values.age}
                onChange={(e) => setValues({...values, age: e.target.value})}
                />
            </div>
            
            <button type="button" onClick={handleUpdateEmployee}>Update Employee</button>
        
        
        
  </form>
    </div>

    </div>
    
  );
}

export default UpdateEmployeeForm;
