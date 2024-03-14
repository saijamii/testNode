require("dotenv").config();
const express = require("express");
const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Data file ${PORT}`);
});

const readFinalData = async () => {
  try {
    const response = await readFileAsync("./FROM26.json", "utf-8");
    const data = JSON.parse(response)?.map((e) => e);
    console.log(data?.length);
  } catch (error) {
    console.error(error);
  }
};
readFinalData();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
