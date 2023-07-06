const express = require("express");
require("dotenv").config();
const session = require("express-session");
const { v4 } = require("uuid");
const authRoutes = require("./src/routes/authRoutes");
const config = require("./src/config/vertivesConfig");
const sql = require("mssql");
const RedisStore = require("connect-redis").default
const {createClient} = require("redis")

const app = express();
app.use(express.json());


const pool  = new sql.ConnectionPool(config)
async function startApp() {
  try {
    await pool.connect();
    console.log("App connected to database");

    const redisClient =  createClient();
    redisClient.connect()
    console.log("Connected to Redis")
    
    const redisStore = new RedisStore({
        client: redisClient,
        prefix: ''
    })


const oneDay = 60 * 60 * 1000 * 24;
app.use(
  session({
    store: redisStore,
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    genid: () => v4(),
    resave: true,
    rolling: true,
    unset: 'destroy',
    cookie: {
      httpOnly: false,
      secure: false, //For production, set to true (HTTPS request)
      maxAge: oneDay,
      domain:'localhost'
    },
  })
);


    app.use((req, res, next) => {req.pool = pool;next();});

    app.get(
      "/",
      (req, res, next) => {
        let cont = true;
        if (cont) {
          next();
        } else {
          res.send("Error");
        }
      },
      (req, res) => {
        res.send("Ok");
      }
    );

    app.use(authRoutes);

    app.use("*", (req, res, next) => {
      const error = new Error("Route Not found");
      next({
        status: 404,
        message: error.message,
      });
    });

    app.use((error, req, res, next) => {
      res.status(error.status).json(error.message);
    });

    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  } catch (error) {
    console.log("Error connecting to the database");
    console.log(error);
  }
}

startApp();