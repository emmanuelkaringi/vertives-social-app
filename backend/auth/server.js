const express = require('express');
require('dotenv').config();
const authRoutes = require('./src/routes/authRoutes')

const app = express();

app.use(express.json());
app.use('/', authRoutes)



const port = process.env.PORT;

app.listen(port, () => { console.log(`Server is listening on ${port}`)
})