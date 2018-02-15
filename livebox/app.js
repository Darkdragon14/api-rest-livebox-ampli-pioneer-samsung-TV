var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var request = require("request");

const ip = "192.168.1.10";

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var url = "http://"+ip+":8080/remoteControl/cmd?operation=10"
var etatbox = "0";
var playPause = true;
function Etatbox() {
  request({
      url: url,
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        if (body.result.data.activeStandbyState != etatbox) {
          etatbox = body.result.data.activeStandbyState; // Print the json response
        }
      }
  });
}
app.get('/livebox/etatbox', function(re, res) {
  res.json({etatbox: etatbox});
});

app.get('/livebox/onoff', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=116&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        if(etatbox == 1){
          etatbox = 0;
        }
        else{
          etatbox = 1;
        }
        res.json({etatbox: etatbox});
      }
  });
});

app.get('/livebox/playpause', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=164&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        if(playPause){
          playPause = false;
        }
        else{
          playPause = true;
        }
        res.json({playPause: playPause});
      }
  });
})

app.get('/livebox/channelup', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=402&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json({data: 'ok'});
      }
  });
})

app.get('/livebox/channeldown', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=403&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json({data: 'ok'});
      }
  });
});

app.get('/livebox/volup', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=115&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json({data: 'ok'});
      }
  });
});

app.get('/livebox/voldown', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=114&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json({data: 'ok'});
      }
  });
});

app.get('/livebox/info', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=358&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json({data: 'ok'});
      }
  });
});

app.get('/livebox/ok', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=352&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json({data: 'ok'});
      }
  });
});

app.get('/livebox/up', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=103&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json({data: 'ok'});
      }
  });
})

app.get('/livebox/down', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=108&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json({data: 'ok'});
      }
  });
});

app.get('/livebox/left', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=105&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json({data: 'ok'});
      }
  });
});

app.get('/livebox/right', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=106&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json({data: 'ok'});
      }
  });
});

app.get('/livebox/return', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=158&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json({data: 'ok'});
      }
  });
});

app.get('/livebox/mute', function(req, res){
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key=113&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json({data: 'ok'});
      }
  });
});

app.get('/livebox/:channel', function(req, res){
  var channel = req.params.channel + 512;
  request({
      url: "http://"+ip+":8080/remoteControl/cmd?operation=01&key="+channel+"&mode=0",
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json({data: 'ok'});
      }
  });
})


Etatbox();
setInterval(Etatbox, 1000);


http.listen(8094, function(){
  console.log('listening on : 8094');
});