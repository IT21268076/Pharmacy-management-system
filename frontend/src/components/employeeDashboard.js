import React from "react";
import EmpSidebar from "./empSidebar";
import LogoutButton from './logout';

function Content() {
  return (
    <div className="container-fluid">
      
    </div>
  );
}
function EmployeeDashboard() {
  return (
    <div className="container-fluid">
      
      <div className="row">
      <div className="col-2">
        <EmpSidebar />
        </div>
        <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          
        
          <div className="dashboard">
            <h1>Welcome Employee!!</h1>
            <p></p>
            < LogoutButton/>
            <Content />
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
