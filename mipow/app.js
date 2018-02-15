var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var exec = require('child_process').exec;

var adrblth = "AC:E6:4B:07:00:66";
var childb = exec('gatttool -b '+adrblth+' -I');
var color;
var connect = false;
var effect;

app.get('/mipow/connect', function(req, res){
  childb.stdin.write('connect\n');
  connect = true;
  res.send(connect);
});

app.get('/mipow/disconnect', function(req, res){
  childb.stdin.write('disconnect\n');
  connect = false;
  res.send(connect);
});

app.get('/mipow/modecandleon', function(req, res){
  childb.stdin.write('char-write-cmd 0x0014 00'+color+'04000000\n');
  effect = "candle";
  res.send(effect);
});

app.get('/mipow/moderainbow', function(req, res){
  childb.stdin.write('char-write-cmd 0x0014 00'+color+'03000000\n');
  effect = "rainbow";
  res.send(effect);
});

app.get('/mipow/modeflash', function(req, res){
  childb.stdin.write('char-write-cmd 0x0014 00'+color+'00006300\n');
  effect = "flash";
  res.send(effect);
});

app.get('/mipow/effectoff', function(req, res){
  childb.stdin.write('char-write-cmd 0x0014 00'+color+'F4000000\n');
  effect = "none";
  res.send(effect);
});

app.get('/mipow/:color', function(req, res){ 
  color = req.params.color;
  childb.stdin.write('char-write-cmd 0x0016 00'+req.params.color+'\n');
  res.send(color);
});


http.listen(8092, function(){
  console.log('listening on : 8092');
});