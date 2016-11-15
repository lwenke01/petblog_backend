'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let CitySchema = new Schema({
  city_id: {type: Schema.Types.ObjectId},
  city_name: {type: String, index: true, required: true },
  city_description: {type: String, required: true },
  city_places: {
    parks: String,
    activities: [{type: Schema.Types.ObjectId, ref: 'Calendar'}]
  }


});

let City = mongoose.model('CitySchema', CitySchema);

module.exports = {
  City: City
};
