const express = require('express');
require('dotenv').config();
const session = require('express-session')
const { v4 } = require('uuid')
const authRoutes = require('./src/routes/authRoutes')

const app = express();
const oneDay = 60 * 60 * 1000 * 24;

app.use(express.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    genid: ()=>v4(),
    resave: false,
    cookie:{
        httpOnly: false,
        secure: false, //For production, set to true (HTTPS request)
        maxAge: oneDay
    }
}))

app.get("/", (req, res, next) => {
    let cont = true;
    if (cont) {
      next();
    } else {
      res.send("Error");
    }
}, (req, res) => {
    res.send("Ok")
});

app.use(authRoutes)

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

app.listen(port, () => { console.log(`Server is listening on ${port}`)
})