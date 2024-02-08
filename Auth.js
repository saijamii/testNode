const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

const PORT = 8000;

// Dummy database (for demo purposes, replace with a real database)
const users = [
  {
    userId: "SJ",
    password: "$2a$12$2EPnsk/JEq2.fr9AavSGYewRBwcxDK/Wb39.kN5BrfNnlxtEz7ZkO",
  },
  {
    userId: "SJ2",
    password: "6c569aabbf7775ef8fc5705a9f1f9b2f",
  },
];
const secretKey = "your-secret-key";

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to the authentication app!");
});

app.post("/login", (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid data. Please provide valid data." });
    }

    const { userId, password } = req.body;

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

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
