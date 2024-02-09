require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//https://www.browserling.com/tools/bcrypt
const bodyParser = require("body-parser");

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dataBase = client.db(process.env.DATABASE_DEV);
const collection = dataBase.collection("testUsers");

const app = express();
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

const PORT = 8000;

// Dummy database (for demo purposes, replace with a real database)
// const users = [
//   {
//     userId: "SJ",
//     password: "$2a$10$rOJxeED1y3I.foB6h3IyBeZa95tfRCTrslC.u8JOnNXh.VoxlNa0G",
//   },
//   {
//     userId: "SJ1",
//     password: "$2a$10$m0z1rsQaAwNGulxKfY5fZuFHBCiCZZ4.XPAZwQJjYSJYPXlqTulb.",
//   },
//   {
//     userId: "SJ2",
//     password: "$2a$10$Z7BOVbAA1yOzY0no1gNjYuZX9/J6DvBoJ9.NgND5pgfCAJb7Mgg7e",
//   },
// ];
const secretKey = "your-secret-key";

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to the authentication app!");
});

app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: `Internal Server Error: ${error.message}`,
    });
  }
});

const getUsers = async () => {
  try {
    const result = await collection.find().toArray();
    return result;
  } catch (error) {
    console.log(`ERROR : ${error}`);
  }
};

app.post("/sigin", async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid data. Please provide valid data." });
    }

    const { userId, password } = req.body;
    const users = await getUsers();
    const isUser = users.find((e) => e.userId === userId);
    console.log("Found user:", isUser);

    if (isUser && bcrypt.compareSync(password, isUser.password)) {
      // Generate a JWT token
      const token = jwt.sign(
        {
          userId: isUser.userId,
        },
        secretKey,
        { expiresIn: "1h" }
      );
      res.json({
        token,
      });
    } else {
      console.log("Invalid username or password.");
      res.status(401).json({ message: "Invalid username or password." });
    }
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error: `Internal Server Error: ${error.message}`,
    });
  }
});

app.post("/sigup", async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid data. Please provide valid data." });
    }
    const { userId, password } = req.body;

    const users = await getUsers();
    const isUserExist = users.find((e) => e.userId === userId);

    if (isUserExist) {
      res
        .status(400)
        .json({ message: "Username already exists. Choose another one." });
    } else {
      // Hash the password before storing (using bcrypt)
      const hashedPassword = bcrypt.hashSync(password, 10);
      // Store the user (replace with database insert)
      const result = await collection.insertOne({
        userId,
        password: hashedPassword,
      });
      console.log(`Saved response with ID: ${result.insertedId}`);
      // users.push({ userId, password: hashedPassword });
      res.json({ message: "User Registration successful!" });
    }
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error: `Internal Server Error: ${error.message}`,
    });
  }
});

// Protected route

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token." });
    }

    req.user = decoded;
    next();
  });
};

app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "You have access to this protected route!" });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
