'use strict';

const express     = require('express');
const  app         = express();
const  bodyParser = require('body-parser');
const  methodOverride = require('method-override');
const  mongoose = require('mongoose');

let db = require('./config/db')
let port = process.env.PORT || 8080;

mongoose.connect(db.url);

let router = express.Router();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/build'));

//routes
require('/api/routes/post_routes')(app);
require('/api/routes/city_routes')(app);
app.use('/api', router);

app.listen(port);

console.log('On port ' + port);

exports = module.exports = app;
