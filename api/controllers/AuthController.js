/**
 * AuthController
 *
 * @description :: Server-side actions for handling user authentication.
 * @help        :: See https://sailsjs.com/docs/concepts/controllers
 */

const bcrypt = require('bcrypt');
// const JwtService = require('../services/JwtService');

module.exports = {
  signup: async function (req, res) {
    try {
      // Extract user input from request body
      const { username, email, password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

      // Create user record in the database
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      }).fetch();

      // Respond with success message and created user data
      return res.json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      // Handle errors
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: async function (req, res) {
    try {
      // Extract username and password from request body
      const { username, password } = req.body;

      // Find user by username in the database
      const user = await User.findOne({ username });

      // If user not found, return error
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Check if the password matches
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If password doesn't match, return error
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Generate JWT token with user data as payload
      const payload = {
        userId: user.id,
        username: user.username,
      };
      const token = JwtService.generateToken(payload);

      // Respond with success message and JWT token
      return res.json({ message: 'Login successful', token });
    } catch (error) {
      // Handle errors
      console.error('Error logging in:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};
