let router = require('express').Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./token');
let userModel = require('../models/user.model');

// router.route('/').get((req, res) => {
//   userModel
//     .find()
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json('Error: ' + err));
// });

router.route('/').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userModel
    .findOne({ email, password })
    .then((user) => {
      if (user) {
        jwt.sign(
          { user: req.body },
          'secretkey',
          { expiresIn: '30m' },
          (err, token) => {
            res.json({ user, token });
          }
        );
      } else {
        res.send('null');
      }
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new userModel({ email, password });
  userModel.findOne({ email }).then((email) => {
    if (email) {
      res.status(200).json('Email existed!');
    } else {
      newUser
        .save()
        .then(() => res.status(201).json('Created successfully'))
        .catch((err) => res.status(400).json('Error: ' + err));
    }
  });
});

router.route('/delete').delete((req, res) => {
  // const username = req.body.username;
  // const newUser = new User({ username });
  // newUser.save()
  //   .then(() => res.json('User added!'))
  //   .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
