const router = require('express').Router();
let Movie = require('../models/movie.model');

router.route('/').get((req, res) => {
  Movie.find()
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Movie.findById(req.params.id)
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
