import express from "express";

const app = express();

app.all("/", (req, res) => {
  console.log("Request > ", req);
  console.log("Response > ", res);
  res.send("Im Response!");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Running at port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
