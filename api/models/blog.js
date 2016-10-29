
var mongoose = require('mongoose');

module.exports = mongoose.model('Blog', {
  title: String,
  blogType: { type: String, default: 'dog' },
  author: { type: String, default: 'Lauren' },
  body:   String,
  comments: [{ body: String, date: { type: Date, default: Date.now }}],
  date: { type: Date, default: Date.now },
  imgURL: { data: Buffer, contentType: String },
  tags: {
    t_1: String,
    t_2: String,
    t_3: String,
    t_4: String
  }



});
