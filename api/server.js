const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
mongoose.set("strictQuery", false);
app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://teodor11:feme2b6z7@cluster0.hivds.mongodb.net/mern-todo?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to DB");
  } catch (error) {
    console.error(error);
  }
}

connect();
const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();
  res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  todo.save((err, updateTodo) => {
    if (err) {
      console.log(err);
    } else {
      res.json(updateTodo);
    }
  });
});

app.listen(4000, () => console.log("Server started on port 4000"));
