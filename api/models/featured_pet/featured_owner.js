'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let OwnerSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId

  },
  owner_name: {
    first: {type: String, required: true },
    last: {type: String, required: true }
  },
  city: {type: String, required: true },
  state: {type: String, required: true },
  email: {type: String, required: true },
  phone: {type: Number, required: false },
  pet: [{type: Schema.Types.ObjectId, ref: 'Pet'}]

});

let Owner = mongoose.model('Owner', OwnerSchema);

module.exports = {
  Owner: Owner
};
