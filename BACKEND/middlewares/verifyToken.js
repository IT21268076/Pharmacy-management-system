// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    // Check if token is present
    if (!token) {
      return res.status(403).json({ message: 'Access denied. Token missing.' });
    }
  
    // Verify and decode token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token.' });
      }
  
      // Add decoded payload to request object
      req.employeeId = decoded.employeeId;
      next();
    });
};