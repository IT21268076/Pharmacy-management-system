// Sidebar.js

import { Link } from "react-router-dom";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faUser, faCog, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./css/sidebar.css"; 

function Sidebar() {
  return (
    <div className="sidebar">
      <p className="logo"  />
      
      <ul>
        <li>
          <Link to="/">
            
            Home
          </Link>
        </li>
        <li>
          <Link to="/adminDashboard">
            
             Admin Dashboard
          </Link>
        </li>
        <li>
          <Link to="/displayall">
            
            Employees
          </Link>
        </li>
        <li>
          <Link to="/displayone">
            
            View Profile
          </Link>
        </li>
        <li>
          <Link to="/track">
            
            Activity Tracker
          </Link>
        </li>
        
        <li>
          <Link to="/empReport">
            
            Employee Report
          </Link>
        </li>
        <li>
          <Link to="/add">
            
            Employee register
          </Link>
        </li>
        <li>
          <Link to="/SupplyManager">
            
            Manager dashboard
          </Link>
        </li>
        <li>
          <Link to="/sconsult">
            
            Consult Doctor
          </Link>
        </li>
        <li>
          <Link to="/doctorDashboard">
            
            Doctor Dashboard
          </Link>
        </li>
        <li>
          <Link to="/employeeDashboard">
            
            Employee Dashboard
          </Link>
        </li>
        <li>
          <Link to="/logout">
            
            Logout
          </Link>
        </li>
        
      </ul>
    </div>
  );
}

export default Sidebar;
