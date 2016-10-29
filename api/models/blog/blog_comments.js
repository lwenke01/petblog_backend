'use strict';


const mongoose = require('mongoose'),
  Schema = mongoose.Schema;



let CommentSchema = new Schema({
  _comments: {
    type: Number,
    ref: 'Post'
  },
  comment_date: { type: Date, default: Date.now },
  comment_author: { type: String, required: true },
  comment_body: {type: String, required: true}
});

let Comment =  mongoose.model('Comment', CommentSchema);

module.exports = {
  Comment: Comment
};
