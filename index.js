const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const productRoutes  = require('./routes/products.routes');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.log(err));

app.use(express.json());

app.use('/product', productRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})
