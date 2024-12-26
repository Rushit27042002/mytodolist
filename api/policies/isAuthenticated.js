const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log("now verification starts")
    // Verify JWT token
    const decoded = jwt.verify(token, '123456789'); // Replace with your actual secret key
    
    // Attach decoded token payload to request object
    req.user = decoded;
    // console.log("headersss>>>>>",req.user);
    // Proceed to the next middleware or route handler
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      // Handle other errors
      console.error('Error verifying token:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};
