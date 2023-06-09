const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const userRoute = require("./routes/user");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect( "mongodb+srv://DHRUVA:DHRUVA@cluster0.lp8ku9c.mongodb.net/MINDMATE_DB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log('Error connecting to MongoDB', err));

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json())
app.use('/public',express.static('public'))
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://mindmate-phi.vercel.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, Content-Type');
  next();
});
app.use("/api/v1/users", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));