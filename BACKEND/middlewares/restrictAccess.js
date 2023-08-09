// Middleware to restrict access based on role
const restrictAccess = (roles) => {
    return (req, res, next) => {
      const employeeId = req.employeeId;
 
      // Query MongoDB to find user by employeeId
      Employer.findById(employeeId)
        .then((employee) => {
          if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
          }

          // Check if user has the required role
          if (!roles.includes(employee.role)) {
            return res.status(403).json({ message: 'Access denied. Unauthorized role.' });
          }
  
          next();
        })
        .catch((err) => {
          res.status(500).json({ message: `Failed to verify access level. ${err.message}` });
        });
    };
};