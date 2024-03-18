require("dotenv").config();
const express = require("express");
const fs = require("fs");
const { parse } = require("csv-parse");
const { pipeline } = require("stream");
const csvWriter = require("csv-write-stream");
const stringify = require("csv-stringify");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Read file ${PORT}`);
});

const bigdataFile = () => {
  console.log("1");
  let daily = new Set();
  let bigdata = [];
  let vendors = [];

  fs.createReadStream("./CSV/newFile.csv")
    .pipe(parse())
    .on("data", (row) => {
      if (row[0] !== "") {
        daily.add(row[0]);
      }
      if (row[1] !== "") {
        bigdata.push(row[1]);
      }
      if (row[2] !== "") {
        vendors.push(row[2] + " | " + row[1]);
      }
    })
    .on("end", async () => {
      console.log(vendors);
      // vendors.forEach(s=>{
      //   console.log(s.split(" | ")[1],"p")
      // })
      const intersection = vendors.filter((item) => !daily.has(item.split(" | ")[1]));
      console.log("Duplicates count:", intersection.length);
      // console.log(intersection,"intermpc")
      let final = intersection.map((e) => e);
      let jsonString = final.map((e) => JSON.stringify(e)).join("\n");
      jsonString = jsonString.replace(/" "/g, "");

      await fs.writeFileSync("duplicates.csv", jsonString);
    });
  //   const bigdata = [];
  //   const daily = [];
  //   fs.createReadStream("./CSV/newFile.csv")
  //     .pipe(parse())
  //     .on("data", (row) => {
  //       row[0] !== "" && daily.push(row[0]);
  //       row[1] !== "" && bigdata.push(row[1]);
  //     })
  //     .on("end", async () => {
  //       console.log(daily.length, bigdata.length);
  //       console.log("Inprogress");

  //       let intersection = bigdata.filter((x) => !daily.includes(x));
  //       // let final = intersection.map((e) => [e]);
  //       // const jsonString = final.map((e) => JSON.stringify(e)).join(",\n");
  //       console.log(intersection.length);
  //       console.log("Completed");

  //       await fs.writeFileSync("duplicates.json", jsonString);
  //     })
  //     .on("error", (error) => {
  //       console.log(`Error reading CSV file: ${error}`);
  //     });
};

bigdataFile();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
