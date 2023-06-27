import React, { useState, useEffect } from "react";
import axios from "axios";

const ConsultTable = ({ setNotification }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/employee/gconsult")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setNotification]);

  const handleReply = (email) => {
    axios.post(`http://localhost:8080/employee/consult/${email}`)
      .then(() => {
        setNotification("Email sent successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Employee Table</h2>
      <table>
        <thead>
          <tr>
            <th>EID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Health Issue</th>
            <th>Reply</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.eid}</td>
              <td>{employee.email}</td>
              <td>{employee.name}</td>
              <td>{employee.gender}</td>
              <td>{employee.healthIssue}</td>
              <td>
                <button onClick={() => handleReply(employee.email)}>
                  Reply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultTable;
