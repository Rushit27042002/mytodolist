/**
 * Todo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // id: {
    //   type: 'number',
    //   autoIncrement: true,
    //   unique: true,
    // },
    label: {
      type: 'string',
      required: true
    },
    details: {
      type: 'string',
      required: true,
    },
    user: {
      model: 'user',
      required: true
    }
  },
};
