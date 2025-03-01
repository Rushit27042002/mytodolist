module.exports = {
  port: process.env.PORT || 8080, // Uses platform-assigned port
  environment: 'production',
  // allowOrigins: '*'
  sockets: {
    onlyAllowOrigins: [
      "https://mytodolist-wcif.onrender.com",
    ]
  }
};