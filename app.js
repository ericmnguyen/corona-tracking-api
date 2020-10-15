const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const serverless = require('serverless-http');

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const defaultUri = 'https://api.covid19api.com/';
const summaryUri = 'https://api.covid19api.com/summary';
const countriesUri = 'https://api.covid19api.com/countries';

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);
app.use('/movies', moviesRouter);

let data = {};
axios
  .get(summaryUri)
  .then((response) => {
    data = response.data;
  })
  .catch((error) => {
    console.log(error);
  });
app.get('/', (req, res) => res.send(data));
app.post('/login', (req, res) => res.send());
app.listen(port, () => {
  console.log('Server is running on port: ', port);
});

module.exports.handler = serverless(app);
