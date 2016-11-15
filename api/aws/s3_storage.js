'use strict';

let promise = require('bluebird');
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest();
let AWS = require('aws-sdk');
let uuid = require('node-uuid');
let insta = require('../../config/instagram')
let _ = require('lodash');
let s3 = new AWS.S3();


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

getPhotos(insta.url)
.then(function(response){
  let newData= JSON.parse(response);
  for(var i = 0; i<newData.data.length; i++){
    let dataI = newData.data[i] ;
    let newId = dataI.id;
    // console.log(newId);
    // console.log(dataI);
    // console.log(dataI.id);
    // console.log(dataI.caption);
    let bucketName = 'woof_instagram';
    let keyName = newId;
    // let string = JSON.stringify(dataI.tags);
    let bodyContent = JSON.stringify(dataI);
      // ' id= '+ newId +
      // ' created_at= ' + dataI.created_time +
      // ' caption= ' + dataI.caption +
      // ' url= ' + dataI.link +
      // ' tags= ' + dataI.tags +
      // ' comments= ' + dataI.comments.count +
      // ' likes= '+ dataI.likes.count +
      // ' users in photo= ' + dataI.users_in_photo;


      // s3.createBucket({Bucket: bucketName}, function() {
      var params = {Bucket: bucketName, Key: keyName, Body: bodyContent};
      s3.putObject(params, function(err, data) {
        if (err)
        console.log(err)
        else
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
      });
    // });

  }


}, function (error){
  return error;
});

//get object
// var s3 = new AWS.S3();
// function readObjects(){
  var params = {Bucket: 'woof_instagram', Key: '1378752208199291628_2945988882'};
  s3.getObject(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log('data ',data.Body);           // successful response
    // var file = require('fs').createWriteStream('output.txt');
    // s3.getObject(params).createReadStream().pipe(file);
  });

// }
