const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countriesSchema = new Schema({
  Message: String,
  Global: {
    NewConfirmed: Number,
    TotalConfirmed: Number,
    NewDeaths: Number,
    TotalDeaths: Number,
    NewRecovered: Number,
    TotalRecovered: Number,
  },
  Countries: Array,
  Date: String,
});

const countriesModel = mongoose.model('countries', countriesSchema);

module.exports = countriesModel;
