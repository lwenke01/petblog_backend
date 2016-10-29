'use strict';

let promise = require('bluebird');
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest();
let AWS = require('aws-sdk');
let uuid = require('node-uuid');
let _ = require('lodash');


//set up Promise to handle the request
function getPhotos(url) {
return new Promise(function(resolve, reject){
    let request = new XMLHttpRequest();
    request.onload = function(){

      if(request.status === 200){
        resolve(request.responseText);
      } else {
        reject(new Error(request.statusText));

      }
    }
    request.open('GET',url)
    request.send();

  })
}

getPhotos('https://api.instagram.com/v1/users/self/media/recent/?access_token=35010847.50ad594.be11ced7b6234fbfbfadc3793211e5ad')
.then(function(response){
  let newData= JSON.parse(response);
  for(var i = 0; i<newData.data.length; i++){
    let dataI = newData.data[i] ;
    let newId = dataI.id;
    // console.log(newId);
    // console.log(dataI);
    // console.log(dataI.id);
    // console.log(dataI.caption);
    let s3 = new AWS.S3();
    let bucketName = 'zinstagram-images';
    let keyName = newId +'.txt';
    // let string = JSON.stringify(dataI.tags);
    let bodyContent =
      ' id= '+ newId +
      ' created_at= ' + dataI.created_time +
      ' caption= ' + dataI.caption +
      ' url= ' + dataI.link +
      ' tags= ' + dataI.tags +
      ' comments= ' + dataI.comments.count +
      ' likes= '+ dataI.likes.count +
      ' users in photo= ' + dataI.users_in_photo;


      s3.createBucket({Bucket: bucketName}, function() {
      var params = {Bucket: bucketName, Key: keyName, Body: bodyContent};
      s3.putObject(params, function(err, data) {
        if (err)
        console.log(err)
        else
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
      });
    });

  }


}, function (error){
  return error;
});
var s3 = new AWS.S3();
var params = {Bucket: 'zinstagram-images', Key: '1368219168084436589_35010847.txt'};
s3.getObject(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

var s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
  if (err) { console.log("Error:", err); }
  else {
    for (var index in data.Buckets) {
      var bucket = data.Buckets[index];
      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    }
  }
});
// zinstagram-images
var s3 = new AWS.S3();
var file = require('fs').createWriteStream('//Users/lisabisa25/desktop/file.txt');
s3.getObject(params).createReadStream().pipe(file);
