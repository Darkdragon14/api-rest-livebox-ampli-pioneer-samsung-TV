/*
Next time add a recovery of state of system 
*/
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var exec = require('child_process').exec;

var adrblth = "AC:E6:4B:07:00:66";
var childb = exec('gatttool -b '+adrblth+' -I');

var mipow = {
  color: '',
  connect: false,
  effect: '',
}

app.get('/mipow/connect', function(req, res){
  childb.stdin.write('connect\n');
  mipow.connect = true;
  res.json(mipow);
});

app.get('/mipow/disconnect', function(req, res){
  childb.stdin.write('disconnect\n');
  mipow.connect = false;
  res.json(mipow);
});

app.get('/mipow/modecandleon', function(req, res){
  childb.stdin.write('char-write-cmd 0x0014 00'+color+'04000000\n');
  mipow.effect = "candle";
  res.json(mipow);
});

app.get('/mipow/moderainbow', function(req, res){
  childb.stdin.write('char-write-cmd 0x0014 00'+color+'03000000\n');
  mipow.effect = "rainbow";
  res.json(mipow);
});

app.get('/mipow/modeflash', function(req, res){
  childb.stdin.write('char-write-cmd 0x0014 00'+color+'00006300\n');
  mipow.effect = "flash";
  res.json(mipow);
});

app.get('/mipow/effectoff', function(req, res){
  childb.stdin.write('char-write-cmd 0x0014 00'+color+'F4000000\n');
  mipow.effect = "none";
  res.json(mipow);
});

app.get('/mipow/:color', function(req, res){ 
  mipow.color = req.params.color;
  childb.stdin.write('char-write-cmd 0x0016 00'+req.params.color+'\n');
  res.json(mipow);
});


http.listen(8092, function(){
  console.log('listening on : 8092');
});