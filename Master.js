require("dotenv").config();
const express = require("express");
const fs = require("fs");
const { parse } = require("csv-parse");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Master file ${PORT}`);
});

const comapreMasterWithDaily = () => {
  let daily = new Set();
  let bigdata = [];
  let vendors = [];

  fs.createReadStream("./CSV/ApplicationVishuBigFile.csv")
    .pipe(parse())
    .on("data", (row) => {
      if (row[0] !== "") {
        daily.add(row[0]);
      }
      
      if (row[3] !== "") {
        vendors.push({
          "mftName": row[3],
          "Manufacturer Name": row[6],
          "Product Name": row[14],
          "Date Available": row[111],
          "Manufacturer Stock": row[110],
        });
      }
    })

    .on("end", async () => {
        const intersection = vendors.filter((item) => !daily.has(item.mftName));
      console.log("Duplicates count:", intersection.length);
      let final = intersection.map((e) => e);
      let jsonString = final.map((e) => JSON.stringify(e)).join("\n");
      jsonString = jsonString.replace(/" "/g, "");
      await fs.writeFileSync("duplicates.json", jsonString);
    });
};

comapreMasterWithDaily();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
