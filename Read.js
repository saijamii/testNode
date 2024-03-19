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

  fs.createReadStream("./CSV/Bigcfinal.csv")
    .pipe(parse())
    .on("data", (row) => {
      if (row[0] !== "") {
        daily.add(row[0]);
      }
      if (row[1] !== "") {
        bigdata.push(row[1]);
      }
      if (row[2] !== "") {
        let ascendingOrder = 1;
        vendors.push({
          "Active?": row[ascendingOrder++],
          "LA Mfg ID": row[ascendingOrder++],
          "mftName": row[ascendingOrder++],
          "Base Item Number": row[ascendingOrder++],
          "UPC": row[ascendingOrder++],
          "Manufacturer Name": row[ascendingOrder++],
          "Cost": row[ascendingOrder++],
          "Regular Price": row[ascendingOrder++],
          "Multiplier": row[ascendingOrder++],
          "Multiplier Price": row[ascendingOrder++],
          "Has IMAP?": row[ascendingOrder++],
          "IMAP": row[ascendingOrder++],
          "IMAP Multiplier": row[ascendingOrder++],
          "Product Name": row[ascendingOrder++],
          "Collection": row[ascendingOrder++],
          "Designer": row[ascendingOrder++],
          "Sub-brand": row[ascendingOrder++],
          "Crystal": row[ascendingOrder++],
          "Long Description": row[ascendingOrder++],
          "Width / Diameter": row[ascendingOrder++],
          "Height": row[ascendingOrder++],
          "Length": row[ascendingOrder++],
          "Weight": row[ascendingOrder++],
          "Extension": row[ascendingOrder++],
          "Chain": row[ascendingOrder++],
          "Wire": row[ascendingOrder++],
          "Rod": row[ascendingOrder++],
          "Top to Outlet ": row[ascendingOrder++],
          "Mounting Height": row[ascendingOrder++],
          "Canopy": row[ascendingOrder++],
          "Bulbs Included?": row[ascendingOrder++],
          "Number of Bulbs": row[ascendingOrder++],
          "Max Wattage": row[ascendingOrder++],
          "Bulb Type": row[ascendingOrder++],
          "Bulb Base": row[ascendingOrder++],
          "Light Source  ": row[ascendingOrder++],
          "Light Output": row[ascendingOrder++],
          "Color Temperature": row[ascendingOrder++],
          "CRI": row[ascendingOrder++],
          "Dimmable?": row[ascendingOrder++],
          "Beam Spread": row[ascendingOrder++],
          "Rated Average Life": row[ascendingOrder++],
          "Bulbs 2 Included?": row[ascendingOrder++],
          "Number of Bulbs 2": row[ascendingOrder++],
          "Max Wattage 2": row[ascendingOrder++],
          "Bulb Type 2": row[ascendingOrder++],
          "Bulb Base 2": row[ascendingOrder++],
          "Light Source 2": row[ascendingOrder++],
          "Light Output 2": row[ascendingOrder++],
          "Color Temperature 2": row[ascendingOrder++],
          "CRI 2": row[ascendingOrder++],
          "Dimmable 2?": row[ascendingOrder++],
          "Beam Spread 2": row[ascendingOrder++],
          "Rated Average Life 2": row[ascendingOrder++],
          "Voltage": row[ascendingOrder++],
          "LED?": row[ascendingOrder++],
          "Fan RPM": row[ascendingOrder++],
          "Fan Airflow": row[ascendingOrder++],
          "Fan Electricity Use": row[ascendingOrder++],
          "Airflow Efficiency": row[ascendingOrder++],
          "Motor Size": row[ascendingOrder++],
          "Motor Housing": row[ascendingOrder++],
          "Motor Mounting": row[ascendingOrder++],
          "Blade Pitch": row[ascendingOrder++],
          "Blade Span": row[ascendingOrder++],
          "Blade Type": row[ascendingOrder++],
          "Blade Finish": row[ascendingOrder++],
          "Reverse Air": row[ascendingOrder++],
          "Fan Speeds": row[ascendingOrder++],
          "Light Kit": row[ascendingOrder++],
          "Fan Control": row[ascendingOrder++],
          "Fan Downrod": row[ascendingOrder++],
          "Fan Mounting System": row[ascendingOrder++],
          "Material": row[ascendingOrder++],
          "Country of Origin": row[ascendingOrder++],
          "Safety Listing": row[ascendingOrder++],
          "Safety Rating": row[ascendingOrder++],
          "Switch": row[ascendingOrder++],
          "Connection": row[ascendingOrder++],
          "Energy Star?": row[ascendingOrder++],
          "Energy Efficient?": row[ascendingOrder++],
          "ADA?": row[ascendingOrder++],
          "Dark Sky?": row[ascendingOrder++],
          "Title 20?": row[ascendingOrder++],
          "Title 24?": row[ascendingOrder++],
          "Gas?": row[ascendingOrder++],
          "Manufacturer Warranty": row[ascendingOrder++],
          "Order Minimum": row[ascendingOrder++],
          "Spec Sheet": row[ascendingOrder++],
          "Instructions": row[ascendingOrder++],
          "Parts Diagram": row[ascendingOrder++],
          "LA Category": row[ascendingOrder++],
          "LA Type": row[ascendingOrder++],
          "LA Finish": row[ascendingOrder++],
          "LA Style 1": row[ascendingOrder++],
          "LA Style 2": row[ascendingOrder++],
          "LA Style 3": row[ascendingOrder++],
          "LA Glass": row[ascendingOrder++],
          "LA Mount": row[ascendingOrder++],
          "LA Voltage": row[ascendingOrder++],
          "Width Range": row[ascendingOrder++],
          "Height Range": row[ascendingOrder++],
          "Price Range": row[ascendingOrder++],
          "CFM Range": row[ascendingOrder++],
          "Base LA Category": row[ascendingOrder++],
          "Base LA Type": row[ascendingOrder++],
          "Base LA Style": row[ascendingOrder++],
          "Available at Manufacturer?": row[ascendingOrder++],
          "Manufacturer Stock": row[ascendingOrder++],
          "Date Available": row[ascendingOrder++],
          "Image": row[ascendingOrder++],
          "Has Image?": row[ascendingOrder++],
          "Small Thumbnail": row[ascendingOrder++],
          "Base Image": row[ascendingOrder++],
          "Shipped Via": row[ascendingOrder++],
          "Dimensional Weight": row[ascendingOrder++],
          "Drop Ship": row[ascendingOrder++],
          'BrandId': row[ascendingOrder++],
          "category": row[ascendingOrder++],
          "subCategory": row[ascendingOrder++],
        });
      }
    })
    .on("end", async () => {
      // console.log(vendors);
      // vendors.forEach(s=>{
      //   console.log(s.split(" | ")[1],"p")
      // })
      const intersection = vendors.filter((item) => daily.has(item.mftName));
      console.log("Duplicates count:", intersection.length);
      // console.log(intersection,"intermpc")
      let final = intersection.map((e) => e);
      let jsonString = final.map((e) => JSON.stringify(e)).join("\n");
      jsonString = jsonString.replace(/" "/g, "");

      await fs.writeFileSync("duplicates.json", jsonString);
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
