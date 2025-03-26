const express = require('express');
const app = express();

require('dotenv').config();


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});

