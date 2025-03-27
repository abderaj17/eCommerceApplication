const express = require('express');
const { db } = require('./model/user.modal');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log('Connected to MongoDB');
})
.catch(err => console.log(err));

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});

