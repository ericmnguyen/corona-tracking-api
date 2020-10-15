const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  plot: String,
  genres: Array,
  runtime: Number,
  cast: Array,
  num_mflix_comments: Number,
  title: String,
  fullplot: String,
  countries: Array,
  released: Date,
  directors: Array,
  rated: String,
  awards: {
    wins: Number,
    nominations: Number,
    text: String
  },
  year: Number,
  imdb: {
    rating: Number,
    votes: Number,
    id: Number
  },
  type: String
}, {
  timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
