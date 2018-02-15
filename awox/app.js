var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var exec = require('child_process').exec;

var state = {
  on: 0,
  color: "000000",
  white: "00"
}
exec('gatttool -b C4:BE:84:C7:8C:44 --char-read -a 0x021', function(error, stdout, stderr){
  state.on = parseInt(stdout.substring(33, 35));
  exec('gatttool -b C4:BE:84:C7:8C:44 --char-read -a 0x04b', function(error, stdout, stderr){
    state.color = stdout.substring(33, 41).replace(/ /g, '');
    exec('gatttool -b C4:BE:84:C7:8C:44 --char-read -a 0x036', function(error, stdout, stderr){
      state.white = stdout.substring(33, 35);
    });
  });
});
app.get('/awox/readstate', function(req, res){
  res.send(state);
});

app.get('/awox/onoff', function(req, res){
  if(state.on == 1){
    exec('gatttool -b C4:BE:84:C7:8C:44 --char-write-req -a 0x0021 -n 00');
    state.on = 0;    
  }
  else{
    exec('gatttool -b C4:BE:84:C7:8C:44 --char-write-req -a 0x0021 -n 01');
    state.on = 1;  
  }
  res.send(state);
});

app.get('/awox/color/:color', function(req, res){
  exec('gatttool -b C4:BE:84:C7:8C:44 --char-write-req -a 0x004b -n '+req.params.color);
  state.color = req.params.color;
  res.send(state);
});

app.get('/awox/typewhite/:white', function(req, res){
  exec('gatttool -b C4:BE:84:C7:8C:44 --char-write-req -a 0x0036 -n '+req.params.white);
  state.white = req.params.white;
  res.send(state);
});

http.listen(8093, function(){
  console.log('listening on : 8093');
});