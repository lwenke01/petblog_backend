'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;


let FeatureSchema = new Schema({
  f_id: {
    type: Schema.Types.ObjectId,
    index: true
  },
  f_pet: [{type: Schema.Types.ObjectId, ref: 'Pet'}],
  f_title: {type: String, required: true }.
  f_body: {type: String, required: true },
  f_date { type: Date, default: Date.now }
});


let Feature = mongoose.model('Feature', FeatureSchema);

module.exports = {
  Feature: Feature
};
