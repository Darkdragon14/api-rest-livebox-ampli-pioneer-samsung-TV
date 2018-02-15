var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var exec = require('child_process').exec;

//evite l'erreur du crossdomain
/*app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

var son;
var source;
var power;
var mute;

//Your IP
var ipAmpli = "192.168.1.70";
var child = exec('telnet '+ipAmpli+' 8102');

child.stdout.on('data', function (data) {
  if(data.substring(0, 3) == "VOL"){
    son = data;
    console.log("son : "+son);
  }
  if(data.substring(0, 3) == "PWR"){
    power = data;
    console.log("power : "+power);
  }
  if(data.substring(0, 2) == "FN"){
    source = data;
    console.log("source : "+source);
  }
  if(data.substring(0, 3) == "MUT"){
    mute = data;
    console.log("mute : "+mute);
  }
});

app.get('/pioneer/volup', function(req, res){
  child.stdin.write('VU\n');
  res.send(son);
});

app.get('/pioneer/voldown', function(req, res){
  child.stdin.write('VD\n');
  res.send(son);
});

app.get('/pioneer/muteon', function(req, res){
  child.stdin.write('MO\n');
  mute = "MUT0";
  res.send(mute);
});

app.get('/pioneer/muteoff', function(req, res){
  child.stdin.write('MF\n');
  mute = "MUT1";
  res.send(mute);
});


app.get('/pioneer/sourceup', function(req, res){
  child.stdin.write('FU\n');
  res.send(source);
});

app.get('/pioneer/sourcedown', function(req, res){
  child.stdin.write('FD\n');
  res.send(source);
});

app.get('/pioneer/BD', function(req, res){
  child.stdin.write('25FN\n');
  res.send(source);
});

app.get('/pioneer/DVD', function(req, res){
  child.stdin.write('04FN\n');
  res.send(source);
});

app.get('/pioneer/SAT', function(req, res){
  child.stdin.write('06FN\n');
  res.send(source);
});

app.get('/pioneer/DVR', function(req, res){
  child.stdin.write('15FN\n');
  res.send(source);
});

app.get('/pioneer/video', function(req, res){
  child.stdin.write('10FN\n');
  res.send(source);
});

app.get('/pioneer/game', function(req, res){
  child.stdin.write('49FN\n');
  res.send(source);
});

app.get('/pioneer/netradio', function(req, res){
  child.stdin.write('38FN\n');
  res.send(source);
});

app.get('/pioneer/server', function(req, res){
  child.stdin.write('44FN\n');
  res.send(source);
});

app.get('/pioneer/favorite', function(req, res){
  child.stdin.write('45FN\n');
  res.send(source);
});

app.get('/pioneer/usb', function(req, res){
  child.stdin.write('17FN\n');
  res.send(source);
});

app.get('/pioneer/tv', function(req, res){
  child.stdin.write('05FN\n');
  res.send(source);
});

app.get('/pioneer/cd', function(req, res){
  child.stdin.write('01FN\n');
  res.send(source);
});

app.get('/pioneer/tuner', function(req, res){
  child.stdin.write('02FN\n');
  res.send(source);
});

app.get('/pioneer/adapter', function(req, res){
  child.stdin.write('33FN\n');
  res.send(source);
});

app.get('/pioneer/off', function(req, res){
    child.stdin.write('PF\n');
    power = "PWR2";
    res.send(power);
});

app.get('/pioneer/on', function(req, res){
    child.stdin.write('PO\n');
    power = "PWR0";
    res.send(power);
});

app.get('/pioneer/volume', function(re, res){
  child.stdin.write('?V\n');
  res.send(son);
});

app.get('/pioneer/power', function(re, res){
  child.stdin.write('?P\n');
  res.send(power);
});

app.get('/pioneer/source', function(re, res){
  child.stdin.write('?F\n');
  res.send(source);
});

app.get('/pioneer/etatmute', function(re, res){
  child.stdin.write('?M\n');
  res.send(mute);
});

app.get('/pioneer/autodirect', function(re, res){
  child.stdin.write('0005SR\n');
  res.send('ok');
});

app.get('/pioneer/alc', function(re, res){
  child.stdin.write('0010SR\n');
  res.send('ok');
});

app.get('/pioneer/advsurround', function(re, res){
  child.stdin.write('0100SR\n');
  res.send('ok');
});

/*
enverser quand on veut changer le canal
input
BD 			FN25 
DVD 		FN04
SAT/CBL 	FN06
DVR/BDR		FN15
Video		FN10
Game		FN49
NetRadio	FN38
M.Server	FN44
Favorite	FN45
IPod/USB	FN17
TV 			FN05
CD 			FN01
Tuner		FN02
Adaptater	FN33
QUERY INPUT	?F 
SOURCE_UP	FU
SOURCE_DOWN	FD

Power
QUERY STATUS?P
AmpliOff 	PF

Mute
MUTE 		MO
UNMUTE		MF
MUTE_QUERY	?M

Surround Sound:
0100SR Advanced Surround
0005SR Auto/Direct
0010SR ALC/Standard
?SR Query surround ????

*/

http.listen(8090, function(){
  console.log('listening on : 8090');
});