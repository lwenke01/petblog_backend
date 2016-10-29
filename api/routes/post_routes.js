
var Blog = require('./models/blog_posts');
var jsonParser = require('body-parser').json();

module.exports = function (app){

app.get('/api/blogs', function(req, res){
  Blog.find(function(err, blogs){
    if(err)
    res.send(err);

    res.json(blogs)
  });

});
// app.get('/api/blogs/:id', function(req, res){
//   Blog.find(function(err, blogs){
//     if(err)
//     res.send(err);
//
//     res.json(blogs)
//   });
//
// });

app.post('/api/blogs', jsonParser, function(req, res){
  var newBlog = new Blog(req.body);
  newBlog.save(function(err, blog){
    if(err) return err;

    res.status(200).json(blog)
  });

});

app.put('/api/blogs/:id', jsonParser, function(req, res){
  var BlogData = req.body;
  delete BlogData._id;
  Blog.update({_id: req.params.id}, BlogData, (err)=>{
    if(err) return err;

    res.status(200).json({msg: 'successfully updated'});
  });
});

app.delete('/api/blogs/:id',(req, res)=>{
  Blog.remove({_id: req.params.id}, (err)=>{
    if(err) return (err);

    res.status(200).json({msg: 'successfully deleted'});
  });
});
// frontend routes
app.get('*', function(req, res){
  res.sendFile('./public/index.html');
});


};
