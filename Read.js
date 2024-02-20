require("dotenv").config();
const express = require("express");
const fs = require("fs");
const { parse } = require("csv-parse");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Read file ${PORT}`);
});

const bigdataFile = () => {
  const bigdata = [];
  const daily = [];
  fs.createReadStream("./CSV/Daily22.csv")
    .pipe(parse())
    .on("data", (row) => {
      row[0] !== "" && daily.push("33" + " | " + row[0]);
      row[1] !== "" && bigdata.push("33" + " | " + row[1]);
    })
    .on("end", async () => {
      console.log(daily.length, bigdata.length);
      let intersection = bigdata.filter((x) => !daily.includes(x));
      let final = intersection.map((e) => [e]);

      const jsonString = final.map((e) => JSON.stringify(e)).join(",\n");
      console.log(intersection.length);
      await fs.appendFileSync("duplicates.json", jsonString);
    })
    .on("error", (error) => {
      console.log(`Error reading CSV file: ${error}`);
    });
};

bigdataFile();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
