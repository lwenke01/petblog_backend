'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;


let PetSchema = new Schema({
  pet_id: {type: Schema.Types.ObjectId,index: true},
  pet_name: {type: String, required: true },
  pet_breed: { type: String, required:true },
  pet_bio: {type: String, required: true},
  pet_age: { type: Number, required: true },
  pet_photo: { data: Buffer, contentType: String },
  pet_media: {
    instagram: {type: String, required: false},
    twitter: {type: String, required: false},
    facebook: {type:String, required: false},
    snapchat: {type: String, required: false},
    youtube: {type: String, required: false},
    other: {type: String, required: false},
    personal: {type: String, required: false}
  },
  pet_owner: [{type: Schema.Types.ObjectId, ref: 'Owner'}]
});

let Pet = mongoose.model('Pet', PetSchema);

module.exports = {
  Pet: Pet
};
