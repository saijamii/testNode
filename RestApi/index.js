import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.all("/", (req, res) => {
  // console.log("Request > ", req);
  // console.log("Response > ", res);
  res.send("Im Response!");
});

const Todos = [
  {
    id: 1,
    title: "Task 1 ",
    completed: true,
  },
  {
    id: 2,
    title: "Task 2 ",
    completed: false,
  },
  {
    id: 3,
    title: "Task 3 ",
    completed: true,
  },
];

//Read

app.get("/todos", (req, res) => {
  res.status(200).json(Todos);
});

//Create

app.post("/todos", (req, res) => {
  const newTodo = req.body;
  Todos.push(newTodo);
  res.status(201).json({
    message: "New Todo Added",
  });
});

//Update

app.put("/todos/:id", (req, res) => {
  const newTodoData = req.body;
  const todoParamId = Number(req.params.id);
  const todoIndex = Todos.findIndex((e) => e.id === todoParamId);
  if (todoIndex !== -1) {
    Todos[todoIndex] = {
      id: todoParamId,
      ...newTodoData,
    };
  }

  res.status(204).json({
    message: "Todo updated successfully",
  });
});

//Delete

app.delete("/todos/:id", (req, res) => {
  const todoParamId = Number(req.params.id);
  const todoIndex = Todos.findIndex((e) => e.id === todoParamId);
  if (todoIndex !== -1) {
    Todos.splice(todoIndex, 1);
  }

  res.status(204).json({
    message: "Todo deleted successfully",
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Running at port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
