//import React from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import Chart from 'react-google-charts';
import LogoutButton from './logout';
import Login from './authentication';
import React, { useState, useEffect } from "react";
import "./Header";
import "./css/adminDash.css"
import axios from "axios";


function Content() {
  const [numEmployees, setNumEmployees] = useState(0);
  //const [numPharmacyItems, setNumPharmacyItems] = useState(5000);

  const data = [
    ['Type', 'Number of each'],
    ['Admin', 2],
    ['Doctors', 1],
    ['Managers', 4],
    ['Pharmacists', 1],
    ['Delivery riders', 1]
    
  ];

  useEffect(() => {
    axios.get('http://localhost:8080/employee/employees/count')
      .then(res => {
        setNumEmployees(res.data.count);
      })
      .catch(err => console.log(err));
    
    
  }, []);

  return (
    <div className="container-fluid">
      
      <div className="row mt-4">
            <h1>Welcome Admin!!</h1>
            <p></p>
            <div className="col-lg-4 col-md-6 d-flex justify-content-center align-items-center ">

          <Card style={{ marginLeft: '220px',marginRight: '-150px' }}>
            <Card.Body>
              <h3>Number of Employees </h3>
              <p className="card-text">{numEmployees}</p>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-4 col-md-6">
          <Card style={{ marginLeft: '260px' }}>
            <Card.Body>
              <h3>Number of Pharmacy Items</h3>
              <p className="card-text">51</p>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row mt-4">
      <div className="container2">
        <div className="col-lg-11 d-flex justify-content-center align-items-center ">
          <Chart style={{ marginLeft: '60px', marginBottom: '40px' }}
            chartType="PieChart"
            data={data}
            width="90%"
            height="600px"
            legendToggle
            options={{ title: 'Staff at month start' }}/>
        </div>
        < LogoutButton/>
      </div>
        </div>
    </div>
  );
}


function Dashboard() {
  return (
    <div className="container-fluid">
      
      <div className="row">
      <div className="col-2">
        <Sidebar />
        </div>
        <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          
          <Content />

          
          <div className="dashboard">
            
           
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;