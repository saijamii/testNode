require("dotenv").config();
const express = require("express");
const fs = require("fs");
const parse = require("csv-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dataBase = client.db(process.env.DATABASE_DEV);
const collection = dataBase.collection("products");

const app = express();
const version = "Version 08.02.24.02";
app.use(express.json());

//Intial Route

app.get("/", (req, res) => {
  res.send(`API is Running on port ${PORT}`);
});

//CRUD OP

app.post("/addInventory", (req, res) => {
  try {
    console.log(req.body);
    // Check if req.body is empty or undefined
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid data. Please provide valid data." });
    }
    let dataJson = JSON.parse(JSON.stringify(req.body));
    console.log(dataJson, "dataJson");
    addProducts(dataJson);
    res.status(200).json({ message: "success", data: dataJson });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

const addProducts = async (dataJson) => {
  try {
    const result = await collection.insertOne(dataJson);
    console.log(`Saved response with ID: ${result.insertedId}`);
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
};

app.get("/inventoryProducts", async (req, res) => {
  try {
    const products = await getInventory();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: `Internal Server Error: ${error.message}`,
    });
  }
});

const getInventory = async () => {
  try {
    const result = await collection.find().toArray();
    return result.splice(0, 200);
  } catch (error) {
    console.log(`ERROR : ${error}`);
  }
};

app.get("/getProductDetail/:id", async (req, res) => {
  const user = await getUserById(req.params.id);
  res.status(200).json(user);
});

const getUserById = async (id) => {
  const user = await collection.findOne({ _id: new ObjectId(id) });
  return user;
};

app.get("/querieSingle", async (req, res) => {
  try {
    if (!req.query.q || Object.keys(req.query.q).length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid data. Please provide query data." });
    }
    const querieItem = req.query.q;
    const queryResult = await collection
      .find({
        movie: querieItem,
      })
      .toArray();
    res.status(200).json(queryResult);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error: `Internal Serever Error: ${error.message}`,
    });
  }
});

app.get("/querieMulti", async (req, res) => {
  try {
    if (!req.query.q || Object.keys(req.query.q).length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid data. Please provide query data." });
    }

    const queryFilters = [];
    Object.keys(req.query.q).forEach((key) => {
      console.log(req.query.q[key]);
      queryFilters.push({ [key]: req.query.q[key] });
    });

    const queryResult = await collection.find({ $and: queryFilters }).toArray();
    res.status(200).json(queryResult);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error: `Internal Server Error: ${error.message}`,
    });
  }
});

app.put("/updateProduct/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!req.body || Object.keys(req.body)?.length === 0) {
      return res.status(400).json({
        error: "Request body is Empty",
      });
    }

    const data = JSON.parse(JSON.stringify(req.body));
    console.log(data);

    const result = await updateProductById(id, data);

    if (!result) {
      return res.status(404).json({
        error: "Product not Found",
      });
    }
    res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

const updateProductById = async (id, data) => {
  try {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return result;
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error: "Internal Serever Error",
    });
  }
};

app.delete("/deleteProduct/:id", async (req, res) => {
  const id = req.params.id;
  const success = await deleteProductById(id);
  if (success) {
    res.json({ message: "User Deleted Successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const deleteProductById = async (id) => {
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

//Fetch by URL
app.get("/dummyApi", async (req, res) => {
  try {
    const data = await getDummyData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: `Internal Server Error: ${error.message}`,
    });
  }
});

const getDummyData = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    return await response.json();
  } catch (error) {
    console.log(`ERROR : ${error}`);
  }
};

//Filter Data
app.post("/filterDummy", async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ error: "postId is required" });
    }
    const fetchedData = await getDummyData();
    const filteredData = fetchedData.filter((e) => e.postId === postId);
    res.status(200).json(filteredData);
  } catch (error) {
    console.error("Error in filterDummy:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Dynamic URL's

app.get("/get/:tableName", async (req, res) => {
  try {
    const tableName = req.params.tableName;
    const dataResponse = await getDataByTableName(tableName);
    res.status(200).json(dataResponse);
  } catch (error) {
    res.status(500).json({
      error: `Internal Server Error: ${error.message}`,
    });
  }
});

const getDataByTableName = async (tableName) => {
  console.log(tableName);
  try {
    const dataBase = client.db("sample_analytics");
    const collection = dataBase.collection(tableName);
    const result = await collection.find().toArray();
    return result;
  } catch (error) {
    console.log(`ERROR : ${error}`);
  }
};

const readCSVFile = (filePath) => {
  const data = [];
  const finalData = [];
  fs.createReadStream(filePath)
    .pipe(parse())
    .on("row", (row) => {
      data.push({
        sku: row[0],
        productName: row[1],
        description: row[2],
        brand: row[3],
        category: row[4],
        finish: row[5],
        cost: row[6],
        price: row[7],
        qty: row[8],
        discontinued: row[9],
      });
    })
    .on("data", async (query) => {
      finalData.push(query);
    })
    .on("end", async () => {
      console.log(finalData, "data");
      // await collection.insertMany(finalData);
      // console.log(
      //   "CSV file successfully processed and data inserted into MongoDB"
      // );
    })
    .on("error", (error) => {
      console.log(`Error reading CSV file: ${error}`);
    });
};

const csvFilePath = "../CSV/BL_Inventory_Products.csv";
// readCSVFile(csvFilePath);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
