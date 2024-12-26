/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

// api/models/User.js

// const bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    // id: {
    //   type: 'string',
    //   required: true,
    //   unique: true,
    // },
    username: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    todos: {
      collection: "todo",
      via: "user",
    },
  },

  // Lifecycle callback before creating a new user
  // beforeCreate: async function(user, next) {
  //   try {
  //     // Hash the password before saving
  //     // const hashedPassword = await bcrypt.hash(user.password, 10);
  //     // user.password = hashedPassword;
  //     next();
  //   } catch (error) {
  //     console.error('Error hashing password:', error);
  //     next(error);
  //   }
  // }
};
