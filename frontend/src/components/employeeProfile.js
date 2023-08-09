import React, { useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import "./css/viewprofile.css";
import Sidebar from "./Sidebar";


const DisplayOneEmployee = () => {
  const [search, setSearch] = useState({
    criteria: "eid",
    value: ""
  });
  const [employee, setEmployee] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8080/employee/displayone/?${search.criteria}=${search.value}`)
      .then((response) => {
        setStatus(response.data.status);
        setEmployee(response.data.employee);
      })
      .catch((error) => {
        setStatus(error.response.data.status);
        setEmployee(null);
      });
  };
  

  const handleSearchCriteriaChange = (e) => {
    setSearch({
      criteria: e.target.value,
      value: ""
    });
  };

  const handleSearchInputChange = (e) => {
    setSearch({
      ...search,
      value: e.target.value
    });
  };

  return (
    <div className="row">
      <div className="col-2">
      <Sidebar />
        </div>
    <div className="form-container">

      <form onSubmit={handleSubmit}>
        <label >
          Search By:  
          <select id="searchLabel" value={search.criteria} onChange={handleSearchCriteriaChange}>

            <option value="eid">Employee ID</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
          <input
            type="text"
            value={search.value}
            onChange={handleSearchInputChange}
          />
        </label>
        <button type="submit">Search</button>
        
      </form>
      
    
      {employee && (
  <div className="profile-container">
    <h2>{employee.name}</h2>
    <p>Employee ID : {employee.eid}</p>
    <p>Age: {employee.age}</p>
    <p>Email: {employee.email}</p>
    <p>Job Title: {employee.role}</p>
    <p>Gender: {employee.gender}</p>
    <p>Address: {employee.address}</p>
    <p>Phone number: {employee.pno}</p>
  </div>
)}
{status && <p className="status-container">{status}</p>}

    
    
    </div>
    </div>
  );
  
};

export default DisplayOneEmployee;
