import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "./docSidebar";
import "./css/docdash.css";

const DoctorDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get("http://localhost:8080/employee/gconsult");
      setEmployees(res.data);
      setMessages(new Array(res.data.length).fill(""));
    };

    fetchEmployees();
  }, []);

  const handleReply = (employeeIndex) => {
    const employee = employees[employeeIndex];
    const message = messages[employeeIndex];

    const formattedMessage = `Dear ${employee.name},\n\nWe have received your health issue submission and will be in touch with you shortly.\n\nBest regards,\nThe doctor`;

    axios.post(`http://localhost:8080/employee/consult/${employee.email}`, { message: formattedMessage }).then(() => {
      alert(`Email sent to ${employee.email}`);
      setEmployees(prevEmployees => prevEmployees.filter((emp, index) => index !== employeeIndex));
      setMessages(prevMessages => prevMessages.filter((msg, index) => index !== employeeIndex));
    });
  };

  const handleMessageChange = (index, value) => {
    const newMessages = [...messages];
    newMessages[index] = value;
    setMessages(newMessages);
  };

  return (
    <div className="container">
      <Sidebar />
      <h1>Doctor Dashboard</h1>
      
      <table className="table">
        <thead>
          <tr>
            <th>EID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Health Issue</th>
            <th>Reply</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.eid}>
              <td>{employee.eid}</td>
              <td>{employee.name}</td>
              <td>{employee.gender}</td>
              <td>{employee.email}</td>
              <td>{employee.healthIssue}</td>
              <td>
                <div className="form-group">
                  <textarea 
                    className="form-control" 
                    placeholder="Enter message here" 
                    rows="4" 
                    value={messages[index]} 
                    onChange={(e) => handleMessageChange(index, e.target.value)}
                  ></textarea>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleReply(index)}
                  >
                    Reply
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    
  );
};

export default DoctorDashboard;
