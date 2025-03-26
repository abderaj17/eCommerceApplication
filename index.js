const express = require('express');
const { db } = require('./model/user.modal');
const app = express();

require('dotenv').config();


app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
     
      const user = await user.find((user) => user.email === username);
  
      if (await !(user.comparePassword(password, user.password))) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
router.get('/logout', async(req, res)=>{
    try{

    }
})

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});

