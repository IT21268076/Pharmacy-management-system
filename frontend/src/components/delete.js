import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteEmployee = ({ eid }) => {
  const [message, setMessage] = useState("");

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/employee/delete/${eid}`)
      .then(() => {
        setMessage("Employee deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Error occurred while deleting employee");
      });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete </button>
      <p>{message}</p>
    </div>
  );
};

export default DeleteEmployee;
