let router = require('express').Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { verifyToken } = require('./token');
let countriesModel = require('../models/countries.model');

router.route('/').post((req, res) => {
  countriesModel
    .find()
    .then((countries) => {
      res.json(countries[0]);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const summaryUri = 'https://api.covid19api.com/summary';
  let newUser = new countriesModel();
  await axios
    .get(summaryUri)
    .then((response) => {
      newUser = new countriesModel({
        Message: response.data.Message,
        Global: response.data.Global,
        Countries: response.data.Countries,
        Date: response.data.Date,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  await newUser
    .update({ _id: '5f8dd1aa78042d2bb4e85ebe' })
    .then(() => res.status(201).json('Update successfully'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
