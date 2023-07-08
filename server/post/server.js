const express = require("express");
require("dotenv").config();
const mssql = require("mssql");
const config = require("./src/config/vertivesConfig");
const postRoutes = require("./src/routes/postRoutes")
const commentRoutes = require("./src/routes/commentRoutes")

const app = express();

app.use(express.json());

const pool  = new mssql.ConnectionPool(config)

async function startApp() {
  try {
    await pool.connect();
    console.log("App connected to database");
    
    app.use((req, res, next) => {
      req.pool = pool;
      next();
    });
    
    app.use(postRoutes, commentRoutes);
    
    app.get("/", (req, res) => {
      res.send("Hello World");
    });
    
    app.get("*", (req, res) => {
      res.status(404).json({ message: "Page not found" });
    });
    
    const port = process.env.PORT;
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();