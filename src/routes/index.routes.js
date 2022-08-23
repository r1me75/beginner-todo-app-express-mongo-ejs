const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: "desc" });
  return res.render("index", { todos });
});

router.post("/create", async (req, res) => {
  await Todo.create(req.body);
  return res.redirect("/");
});

router.delete("/delete/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  return res.redirect("/");
});

router.patch("/update/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  return res.redirect("/");
});

module.exports = router;
