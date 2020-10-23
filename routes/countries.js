let router = require('express').Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { verifyToken } = require('./token');
let countriesModel = require('../models/countries.model');
const ObjectId = require('mongodb').ObjectID;

router.route('/').post(verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403).send('Forbidden');
    } else {
      countriesModel
        .find()
        .sort({ _id: -1 })
        .limit(50)
        .then((countries) => {
          res.json(countries[0]);
        })
        .catch((err) => res.status(400).json('Error: ' + err));
    }
  });
});

router.route('/add').post(async (req, res) => {
  const summaryUri = 'https://api.covid19api.com/summary';
  let newRecord = new countriesModel();
  await axios
    .get(summaryUri)
    .then((response) => {
      newRecord = new countriesModel({
        Message: response.data.Message,
        Global: response.data.Global,
        Countries: response.data.Countries,
        Date: response.data.Date,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  console.log('newRecord', newRecord);
  await newRecord
    .save()
    .then(() => res.status(201).json('Update successfully'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
