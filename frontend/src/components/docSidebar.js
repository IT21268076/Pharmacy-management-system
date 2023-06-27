// Sidebar.js

import { Link } from "react-router-dom";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faUser, faCog, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./css/empSidebar.css"; 

function EmpSidebar() {
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
          <Link to="/display/:eid">
            
            View Profile
          </Link>
        </li>
        
        <li>
          <Link to="/sconsult">
            
            Consult Doctor
          </Link>
        </li>
        <li>
          <Link to="/attendance">
            
            attendance
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

export default EmpSidebar;
