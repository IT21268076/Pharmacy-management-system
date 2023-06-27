import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./css/consultForm.css";

const ConsultForm = () => {
  const [formData, setFormData] = useState({
    eid: "",
    email: "",
    name: "",
    gender: "",
    healthIssue: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/employee/sconsult", formData)
      .then(() => {
        setAlertMessage("Form submitted successfully!");
        setShowSuccess(true);
        setFormData({
          eid: "",
          email: "",
          name: "",
          gender: "",
          healthIssue: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    
            
        
        
    <div className="form-container">
      <Sidebar />
      <h1 className="form-title">ASK Doctor</h1>
      {showSuccess && (
        <div className="success-alert">{alertMessage}</div>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-container">
            <label id="up" htmlFor="eid">EID:</label>
            <input
              type="text"
              id="eid"
              name="eid"
              value={formData.eid}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-container">
            <label id="up1" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-container">
            <label id="up" htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-container">
            <label id="up1" htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="input-container">
            <label id="up1" htmlFor="healthIssue">Health Issue:</label>
            <textarea
              id="healthIssue"
              name="healthIssue"
              value={formData.healthIssue}
              onChange={handleChange}
            />
          </div>
        </div>
        <button onClick={handleSubmit} type="submit">Submit</button>
      </form>
    </div>
    
  );
};

export default ConsultForm;
