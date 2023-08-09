import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import "./css/table.css"; 
import Sidebar from "./Sidebar";

function UserActivityList() {
  const [userActivities, setUserActivities] = useState([]);

  useEffect(() => {
    // Fetch user activities from API
    axios.get('http://localhost:8080/employee/track')
      .then(response => {
        setUserActivities(response.data.userActivities);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container-fluid">
      
      <div className="row">
      <div className="col-2">
        <Sidebar />
        </div>
        <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          
          
    <div className="d-flex justify-content-center">
      <div className="w-75">
        <h1>User Activities</h1>
        <Table striped bordered hover responsive className="table table-bordered table-hover shadow rounded">
          <thead className="thead-gradient-blue rounded-top">
            <tr>
              <th>User ID</th>
              <th>Logged Date</th>
              <th>Logged Time</th>
              <th>IP Address</th>
              
              <th>Logout Time</th>
            </tr>
          </thead>
          <tbody>
            {userActivities.map(activity => (
              <tr key={activity._id}>
                <td>{activity.userId}</td>
                <td>{activity.loggedDate}</td>
                <td>{activity.loggedTime}</td>
                <td>{activity.ipAddress}</td>
                
                <td>{activity.logoutTime}</td>
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
}

export default UserActivityList;
