const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Middleware 1 ");
  req.customProperty = "Hello from Middleware 1";
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2");
  console.log(req.customProperty);
  next();
});

app.get("/", (req, res) => {
  res.send("HEllo Express");
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});
