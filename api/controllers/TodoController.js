/**
 * TodoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { log } = require("grunt");
const logGruntAbortedError = require("sails-hook-grunt/lib/log-grunt-aborted-error");

module.exports = {
  create: async function (req, res) {
    try {
      const { label, details } = req.body;
      const authHeader = req.headers.authorization;
      console.log(authHeader);
      const bData = req.user;
      console.log("thiss>>>>>>>>>", bData);

      const newTodo = await Todo.create({
        label,
        details,
        user: req.user.userId, // Set the user ID from the authenticated user
      }).fetch();
      return res.status(201).json(newTodo);
    } catch (err) {
      return res.serverError(err);
    }
  },

  findAll: async function (req, res) {
    console.log("findAll function called");
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const bData = req.user;
    console.log("thiss>>>>>>>>>", bData);

    // Get the page number from the request query (optional)
    // const page = parseInt(req.params.page) || 1; // Default to page 1 if not provided

    try {
      // Calculate skip value based on page number and limit
      // const skip = (page - 1) * 5

      // Fetch todos with pagination
      const todos = await Todo.find({ user: req.user.userId })
        // .skip(skip) 
        // .limit(5)

      console.log("lookhere>>>>", todos);
      return res.json(todos);
    } catch (err) {
      return res.serverError(err);
    }
  },

  findOne: async function (req, res) {
    console.log("findone executed");
    try {
      const todo = await Todo.findOne({
        id: req.params.id,
        user: req.user.userId,
      }); // Fetch the todo only if it belongs to the authenticated user
      console.log("onetodo>>>>>>>", todo);
      if (!todo) {
        return res.notFound("Todo not found");
      }
      return res.json(todo);
    } catch (err) {
      return res.serverError(err);
    }
  },

  update: async function (req, res) {
    try {
      const { label, details } = req.body;
      const updatedTodo = await Todo.updateOne({
        id: req.params.id,
        user: req.user.userId,
      }) // Update the todo only if it belongs to the authenticated user
        .set({ label, details });
      if (!updatedTodo) {
        return res.notFound("Todo not found");
      }
      return res.json(updatedTodo);
    } catch (err) {
      return res.serverError(err);
    }
  },

  delete: async function (req, res) {
    try {
      const deletedTodo = await Todo.destroyOne({
        id: req.params.id,
        user: req.user.userId,
      }); // Delete the todo only if it belongs to the authenticated user
      if (!deletedTodo) {
        return res.notFound("Todo not found");
      }
      return res.json(deletedTodo);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
