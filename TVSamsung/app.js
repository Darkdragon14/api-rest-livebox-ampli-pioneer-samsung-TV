var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var samsungRemote = require('samsung-remote');

//evite l'erreur du crossdomain
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var tv = {
  on: false,
}

var remote = new samsungRemote({
    ip: '192.168.1.72' // required: IP address of your Samsung Smart TV 
});

app.get('/samsung/voldown', function(req, res){
  	remote.send('KEY_VOLDOWN', function callback(err) {
	});
  res.json(tv);
});

app.get('/samsung/volup', function(req, res){
    remote.send('KEY_VOLUP', function callback(err) {
  });
});

app.get('/samsung/voloff', function(req, res){
    remote.send('KEY_MUTE', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/1', function(req, res){
    remote.send('KEY_1', function callback(err) {
  });
  res.json(tv);    
});

app.get('/samsung/2', function(req, res){
    remote.send('KEY_2', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/3', function(req, res){
    remote.send('KEY_3', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/4', function(req, res){
    remote.send('KEY_4', function callback(err) {
  });
  res.json(tv);
});


app.get('/samsung/5', function(req, res){
    remote.send('KEY_5', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/6', function(req, res){
    remote.send('KEY_6', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/7', function(req, res){
    remote.send('KEY_7', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/8', function(req, res){
    remote.send('KEY_8', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/9', function(req, res){
    remote.send('KEY_9', function callback(err) {
  });
});

app.get('/samsung/0', function(req, res){
    remote.send('KEY_0', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/0', function(req, res){
    remote.send('KEY_0', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/chup', function(req, res){
    remote.send('KEY_CHUP', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/chdown', function(req, res){
    remote.send('KEY_CHDOWN', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/chp', function(req, res){
    remote.send('KEY_PRECH', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/src', function(req, res){
    remote.send('KEY_SOURCE', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/menu', function(req, res){
    remote.send('KEY_MENU', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/up', function(req, res){
    remote.send('KEY_UP', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/down', function(req, res){
    remote.send('KEY_DOWN', function callback(err) {
  });
});

app.get('/samsung/left', function(req, res){
    remote.send('KEY_LEFT', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/right', function(req, res){
    remote.send('KEY_RIGHT', function callback(err) {
  });
  res.json(tv);
});

app.get('/samsung/off', function(req, res){
    remote.send('KEY_POWEROFF', function callback(err) {
  });
  tv.on = false;
  res.json(tv);
});

function TVon() {
  remote.isAlive(function(err) {
    if (err) {
        //throw new Error('TV is offline');
        tv.on = false;
    } else {
        //console.log('TV is ALIVE!');
        tv.on = true;
    }
  });
}

app.get('/samsung/readstate', function(req, res){
    res.json(tv);
});


setInterval(TVon, 1000);


/*
KEY_MENU
KEY_UP
KEY_DOWN
KEY_LEFT
KEY_RIGHT
KEY_3
KEY_VOLUP
KEY_4
KEY_5
KEY_6
KEY_VOLDOWN
KEY_7
KEY_8
KEY_9
KEY_MUTE
KEY_CHDOWN
KEY_0
KEY_CHUP
KEY_PRECH
KEY_GREEN
KEY_YELLOW
KEY_CYAN
KEY_SOURCE
KEY_INFO
KEY_PIP_ONOFF
KEY_PIP_SWAP
KEY_PMODE
KEY_TTX_MIX
KEY_AD
KEY_PIP_SIZE
KEY_MAGIC_CHANNEL
KEY_PIP_SCAN
KEY_PIP_CHUP
KEY_PIP_CHDOWN
KEY_DEVICE_CONNECT
KEY_HELP
KEY_ANTENA
KEY_CONVERGENCE
KEY_11
KEY_12
KEY_3SPEED
KEY_RSURF
KEY_ASPECT
KEY_TOPMENU
KEY_STILL_PICTURE
KEY_FAVCH
KEY_REWIND
KEY_STOP
KEY_PLAY
KEY_FF
KEY_REC
KEY_PAUSE
KEY_TOOLS
KEY_FF_
KEY_GUIDE
KEY_REWIND_
KEY_ANGLE
KEY_RESERVED1
KEY_ZOOM1
KEY_PROGRAM
KEY_BOOKMARK
KEY_DISC_MENU
KEY_PRINT
KEY_RETURN
KEY_SUB_TITLE
KEY_CLEAR
KEY_VCHIP
KEY_REPEAT
KEY_DOOR
KEY_OPEN
KEY_WHEEL_LEFT
KEY_POWER
KEY_SLEEP
KEY_2
KEY_DMA
KEY_TURBO
KEY_1
KEY_FM_RADIO
KEY_DVR_MENU
KEY_MTS
KEY_PCMODE
KEY_TTX_SUBFACE
KEY_CH_LIST
KEY_RED
KEY_DNIe
KEY_SRS
KEY_CONVERT_AUDIO_MAINSUB
KEY_MDC
KEY_SEFFECT
KEY_DVR
KEY_DTV_SIGNAL
KEY_LIVE
KEY_PERPECT_FOCUS
KEY_HOME
KEY_ESAVING
KEY_WHEEL_RIGHT
KEY_CONTENTS
KEY_CALLER_ID
KEY_SCALE
KEY_ZOOM_MOVE
KEY_CLOCK_DISPLAY
KEY_AV1
KEY_COMPONENT1
KEY_SETUP_CLOCK_TIMER
KEY_MAGIC_BRIGHT
KEY_DVI
KEY_HDMI
KEY_W_LINK
KEY_DTV_LINK
KEY_APP_LIST
KEY_BACK_MHP
KEY_ALT_MHP
KEY_DNSe
KEY_RSS
KEY_ENTERTAINMENT
KEY_ID_INPUT
KEY_ID_SETUP
KEY_ANYNET
KEY_POWEROFF
KEY_POWERON
KEY_ANYVIEW
KEY_MS
KEY_MORE
KEY_PANNEL_POWER
KEY_PANNEL_CHUP
KEY_PANNEL_CHDOWN
KEY_PANNEL_VOLUP
KEY_PANNEL_VOLDOW
KEY_PANNEL_ENTER
KEY_PANNEL_MENU
KEY_PANNEL_SOURCE
KEY_ZOOM2
KEY_PANORAMA
KEY_4_3
KEY_16_9
KEY_DYNAMIC
KEY_STANDARD
KEY_AUTO_FORMAT
KEY_DNET
KEY_NINE_SEPERATE
KEY_ZOOM_IN
KEY_ZOOM_OUT
KEY_MIC
*/


http.listen(8091, function(){
  console.log('listening on : 8091');
});