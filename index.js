require('./db')
const mongoose=require('mongoose')
const express = require('express');
const bodyParser = require('body-parser')
const router=require('./controllers/resturantRoutes')

const app = express();
app.use(bodyParser.json());
app.use('/', router);

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
