// Filename: api-routes.js
// Initialize express router
const axios = require('axios');
let router = require('express').Router();
let userModel = require('../models/user.model');

router.route('/').get((req, res) => {
  userModel
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userModel
    .findOne({ email, password })
    .then((email) => res.json(email))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new userModel({ email, password });

  newUser
    .save()
    .then(() => res.json('User added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// router.route('/add').post((req, res) => {
//   console.log('body', req);
//   const username = req.body.username;

//   const newUser = new User({ username });

//   newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/delete').delete((req, res) => {
  console.log('delete', req);
  // const username = req.body.username;

  // const newUser = new User({ username });

  // newUser.save()
  //   .then(() => res.json('User added!'))
  //   .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
