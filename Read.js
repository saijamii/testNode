require("dotenv").config();
const express = require("express");
const fs = require("fs");
const { parse } = require("csv-parse");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Read file ${PORT}`);
});

const bigdataFile = (filePath) => {
  const bigdata = [];
  const daily = [];
  fs.createReadStream("./CSV/Daily22.csv")
    .pipe(parse())
    .on("data", (row) => {
      row[0] !== "" && daily.push("7" + " | " + row[0]);
      row[1] !== "" && bigdata.push("7" + " | " + row[1]);
    })
    .on("end", async () => {
      console.log(daily.length, bigdata.length);
      // let unique = [...new Set(finalData)];
      let intersection = bigdata.filter((x) => !daily.includes(x));
      // console.log(unique.length, finalData.length);
      await fs.writeFileSync("duplicates.json", "Start\n");
      intersection.map(async (e) => {
        await fs.appendFileSync("duplicates.json", e + "\n");
      });
    })
    .on("error", (error) => {
      console.log(`Error reading CSV file: ${error}`);
    });
};

// const csvFilePath = "./CSV/d2.csv";
bigdataFile();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
