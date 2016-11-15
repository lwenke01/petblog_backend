'use strict';

var City = require('./models/city_guide/city_guide');
var jsonParser = require('body-parser').json();

module.exports = function (app){

app.get('/api/cities', function(req, res){
City.find(function(err, cities){
    if(err)
    res.send(err);

    res.json(cities)
  });

});

app.post('/api/cities', jsonParser, function(req, res){
  var newCity = new City(req.body);
  newCity.save(function(err, city){
    if(err) return err;

    res.status(200).json(city)
  });

});

app.put('/api/cities/:id', jsonParser, function(req, res){
  var CityData = req.body;
  delete CityData._id;
City.update({_id: req.params.id}, CityData, (err)=>{
    if(err) return err;

    res.status(200).json({msg: 'successfully updated'});
  });
});

app.delete('/api/cities/:id',(req, res)=>{
City.remove({_id: req.params.id}, (err)=>{
    if(err) return (err);

    res.status(200).json({msg: 'successfully deleted'});
  });
});



};
