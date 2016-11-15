'use strict';



require('./city_routes')(app);
require('./post_routes')(app);


app.get('*', function(req, res){
  res.sendFile('./public/index.html');
});
