const express = require('express');
require('dotenv').config();
const userRoutes = require('./src/routes/userRoutes')


const app = express();

app.use(express.json());

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

app.use(userRoutes)

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