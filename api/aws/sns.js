
var AWS = require('aws-sdk');
// AWS.config.loadFromPath('./config.json');
var sns = new AWS.SNS({region:'us-west-2'});
var sqs = new AWS.SQS({region:'us-west-2'});
// var sns = new AWS.SNS({region:'us-west-2'});
sns.createTopic({
  'Name': 'demo'
}, function (err, result) {

  if (err !== null) {
    console.log(err);
    return;
  }

  console.log(result);

});


sqs.createQueue({
  'QueueName': 'demo'
}, function (err, result) {

  if (err !== null) {
    console.log(err);
    return;
  }

  console.log(result);

});
