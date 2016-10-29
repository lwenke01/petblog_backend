'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let InstaSchema = new Schema({
  i_id: {
    type: Number,
    index: true
  },
  i_name: {
    first: {type: String, required: true },
    last: {type: String, required: true }
  },
  city: {type: String, required: true },
  state: {type: String, required: true },
  email: {type: String, required: true },
  phone: {type: Number, required: false },
  owner_media: {
    instagram: {type: String, required: false},
    twitter: {type: String, required: false},
    facebook: {type:String, required: false},
    snapchat: {type: String, required: false},
    youtube: {type: String, required: false},
    other: {type: String, required: false},
    personal: {type: String, required: false}
  },
  pet: [{type: Schema.Types.ObjectId, ref: 'Pet'}]

});

let Owner = mongoose.model('Owner', OwnerSchema);

module.exports = {
  Owner: Owner
};
