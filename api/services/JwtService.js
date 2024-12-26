const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: function(payload) {
    const secretKey = '123456789'; // Replace with your actual secret key
    const options = {
      expiresIn: '24h', // Token expiration time (24 hours)
    };
    return jwt.sign(payload, secretKey, options);
  },
  
  verifyToken: function(token) {
    const secretKey = '123456789'; // Replace with your actual secret key
    try {
      return jwt.verify(token, secretKey);
    } catch (err) {
      return null;
    }
  }
};
