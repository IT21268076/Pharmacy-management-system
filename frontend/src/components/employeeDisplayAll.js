import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/table.css";
import { Table } from 'react-bootstrap';
import Sidebar from "./Sidebar";
import Delete from "./delete";

const DisplayAllEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/employee/displayall")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (eid) => {
    axios
      .delete(`http://localhost:8080/employee/delete/${eid}`)
      .then(() => {
        setEmployees(employees.filter((employee) => employee.eid !== eid));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleUpdate = (eid) => {
    // Navigate to the employee details page.
    //const route = `/update/${eid}`;
    const route = `/update/${eid}`;
    window.location.href = route;
    //window.location.href = route1;
  };
  
  return (
    <div className="container-fluid">
      
      <div className="row">
      <div className="col-2">
        <Sidebar />
        </div>
      <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
    <div className="d-flex justify-content-center">
    <div className="w-100">
      <h1>Employees</h1>
    <Table striped bordered hover responsive className="table table-bordered table-hover shadow rounded" >
        <thead className="thead-gradient-blue rounded-top" >
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Email</th>
            {/*<th>Password</th>*/}
            <th>Phone number</th>
            <th>Job Title</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.eid}</td>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>{employee.gender}</td>
              <td>{employee.address}</td>
              <td>{employee.email}</td>
              {/*<td>{employee.password}</td>*/}
              <td>{employee.pno}</td>
              <td>{employee.role}</td>
              <td>
                <button id="delbtn" onClick={() => handleDelete(employee.eid)}>Delete</button>
              </td>
              <td>
                <button id="" onClick={() => handleUpdate(employee.eid)}>Update</button>
              </td>

              
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default DisplayAllEmployees;
