'use strict';

const mongoose = require('mongoose').
Schema = mongoose.Schema;


let PostSchema = new Schema({
  post_id: {type: Schema.Types.ObjectId, index: true},
  post_title: String,
  post_category: {type: String, default: 'dog'},
  post_author: {type: String, default: 'Lauren Farricker Curtis' },
  post_body:  {type: String,required: true},
  post_date: {type: Date, default: Date.now},
  post_img: {data: Buffer,contentType: String},
  post_tags: {
    t_1: String,
    t_2: String,
    t_3: String,
    t_4: String
  },
  post_comments: [{type: Schema.Types.ObjectId, ref: 'Comments'}]
});

let Post = mongoose.model('Post', PostSchema);

module.exports = {
  Post: Post
};
