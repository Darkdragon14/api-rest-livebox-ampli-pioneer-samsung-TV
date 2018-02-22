var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var request = require("request");

const ip = "192.168.1.10";

var livebox = {
  on: false,
  pause: false,
  channel: 0,
}

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var url = "http://"+ip+":8080/remoteControl/cmd?operation=10"

function Etatbox() {
  request({
      url: url,
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        if (body.result.data.activeStandbyState == 1) {
          livebox.on = false;
        }
        else{
          livebox.on = true; 
        }
      }
  });
}

app.get('/livebox/readstate', function(re, res) {
  res.json(livebox);
});

app.get('/livebox/onoff', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=116&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        livebox.on = !livebox.on;
        res.json(livebox);
      }
  });
});

app.get('/livebox/playpause', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=164&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        livebox.pause = !livebox.pause
        res.json(livebox);
      }
  });
})

app.get('/livebox/channelup', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=402&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        livebox.channel++;
        res.json(livebox);
      }
  });
})

app.get('/livebox/channeldown', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=403&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        livebox.channel--;
        res.json(livebox);
      }
  });
});

app.get('/livebox/volup', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=115&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json(livebox);
      }
  });
});

app.get('/livebox/voldown', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=114&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json(livebox);
      }
  });
});

app.get('/livebox/info', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=358&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json(livebox);
      }
  });
});

app.get('/livebox/ok', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=352&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json(livebox);
      }
  });
});

app.get('/livebox/up', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=103&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json(livebox);
      }
  });
})

app.get('/livebox/down', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=108&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json(livebox);
      }
  });
});

app.get('/livebox/left', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=105&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json(livebox);
      }
  });
});

app.get('/livebox/right', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=106&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json(livebox);
      }
  });
});

app.get('/livebox/return', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=158&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json(livebox);
      }
  });
});

app.get('/livebox/mute', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=113&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json(livebox);
      }
  });
});


var numberChannel = new Array(3);
function ChangeChannel(){
  var number = '';
  for(var i = 0; i < numberChannel.length; i++){
    number = number + numberChannel[i].toString();
    if(i == numberChannel.length-1){
      numberChannel = [];
      livebox.channel = parseInt(number);
    }
  }
}

app.get('/livebox/:channel', function(req, res){
  var channel = parseInt(req.params.channel) + 512;
  numberChannel.push(channel);
  setTimeout(ChangeChannel, 3000);
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key="+channel+"&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json(livebox);
      }
  });
})



Etatbox();
setInterval(Etatbox, 1000);



http.listen(8094, function(){
  console.log('listening on : 8094');
});