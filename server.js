var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var exec = require('child_process').exec;
var samsungRemote = require('samsung-remote');
/*var serialport = require('serialport');
var portName = "/dev/ttyACM0";*/
var request = require("request");
var io = require('socket.io')(http);

//evite l'erreur du crossdomain
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/*
--------------------------------------------------
Partie Ampli
--------------------------------------------------
 */

var son;
var source;
var power;
var mute;

//Your IP
var ipAmpli = "XXX.XXX.XXX.XXX";
var child = exec('telnet '+ipAmpli+' 8102');

child.stdout.on('data', function (data) {
  //console.log(data);
  if(data.substring(0, 3) == "VOL"){
    son = data;
    console.log("son : "+son);
  }
  if(data.substring(0, 3) == "PWR"){
    power = data;
    console.log("power : "+power);
    amplipower();
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
});

app.get('/pioneer/voldown', function(req, res){
  child.stdin.write('VD\n');
});

app.get('/pioneer/muteon', function(req, res){
  child.stdin.write('MO\n');
  mute = "MUT0";
});

app.get('/pioneer/muteoff', function(req, res){
  child.stdin.write('MF\n');
  mute = "MUT1";
});


app.get('/pioneer/sourceup', function(req, res){
  child.stdin.write('FU\n');
});

app.get('/pioneer/sourcedown', function(req, res){
  child.stdin.write('FD\n');
});

app.get('/pioneer/BD', function(req, res){
  child.stdin.write('25FN\n');
});

app.get('/pioneer/DVD', function(req, res){
  child.stdin.write('04FN\n');
});

app.get('/pioneer/SAT', function(req, res){
  child.stdin.write('06FN\n');
});

app.get('/pioneer/DVR', function(req, res){
  child.stdin.write('15FN\n');
});

app.get('/pioneer/video', function(req, res){
  child.stdin.write('10FN\n');
});

app.get('/pioneer/game', function(req, res){
  child.stdin.write('49FN\n');
});

app.get('/pioneer/netradio', function(req, res){
  child.stdin.write('38FN\n');
});

app.get('/pioneer/server', function(req, res){
  child.stdin.write('44FN\n');
});

app.get('/pioneer/favorite', function(req, res){
  child.stdin.write('45FN\n');
});

app.get('/pioneer/usb', function(req, res){
  child.stdin.write('17FN\n');
});

app.get('/pioneer/tv', function(req, res){
  child.stdin.write('05FN\n');
});

app.get('/pioneer/cd', function(req, res){
  child.stdin.write('01FN\n');
});

app.get('/pioneer/tuner', function(req, res){
  child.stdin.write('02FN\n');
});

app.get('/pioneer/adapter', function(req, res){
  child.stdin.write('33FN\n');
});

app.get('/pioneer/off', function(req, res){
    child.stdin.write('PF\n');
    power = "PWR2";
});

app.get('/pioneer/on', function(req, res){
    child.stdin.write('PO\n');
    power = "PWR0";
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
});

app.get('/pioneer/alc', function(re, res){
  child.stdin.write('0010SR\n');
});

app.get('/pioneer/advsurround', function(re, res){
  child.stdin.write('0100SR\n');
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

/*
--------------------------------------------------
Partie Tv
--------------------------------------------------
 */

var remote = new samsungRemote({
    ip: 'XXX.XXX.XXX.XXX' // required: IP address of your Samsung Smart TV 
});

app.get('/samsung/voldown', function(req, res){
  	remote.send('KEY_VOLDOWN', function callback(err) {
	});
});

app.get('/samsung/volup', function(req, res){
    remote.send('KEY_VOLUP', function callback(err) {
  });
});

app.get('/samsung/voloff', function(req, res){
    remote.send('KEY_MUTE', function callback(err) {
  });
});

app.get('/samsung/1', function(req, res){
    remote.send('KEY_1', function callback(err) {
  });
});

app.get('/samsung/2', function(req, res){
    remote.send('KEY_2', function callback(err) {
  });
});

app.get('/samsung/3', function(req, res){
    remote.send('KEY_3', function callback(err) {
  });
});

app.get('/samsung/4', function(req, res){
    remote.send('KEY_4', function callback(err) {
  });
});


app.get('/samsung/5', function(req, res){
    remote.send('KEY_5', function callback(err) {
  });
});

app.get('/samsung/6', function(req, res){
    remote.send('KEY_6', function callback(err) {
  });
});

app.get('/samsung/7', function(req, res){
    remote.send('KEY_7', function callback(err) {
  });
});

app.get('/samsung/8', function(req, res){
    remote.send('KEY_8', function callback(err) {
  });
});

app.get('/samsung/9', function(req, res){
    remote.send('KEY_9', function callback(err) {
  });
});

app.get('/samsung/0', function(req, res){
    remote.send('KEY_0', function callback(err) {
  });
});

app.get('/samsung/0', function(req, res){
    remote.send('KEY_0', function callback(err) {
  });
});

app.get('/samsung/chup', function(req, res){
    remote.send('KEY_CHUP', function callback(err) {
  });
});

app.get('/samsung/chdown', function(req, res){
    remote.send('KEY_CHDOWN', function callback(err) {
  });
});

app.get('/samsung/chp', function(req, res){
    remote.send('KEY_PRECH', function callback(err) {
  });
});

app.get('/samsung/src', function(req, res){
    remote.send('KEY_SOURCE', function callback(err) {
  });
});

app.get('/samsung/menu', function(req, res){
    remote.send('KEY_MENU', function callback(err) {
  });
});

app.get('/samsung/up', function(req, res){
    remote.send('KEY_UP', function callback(err) {
  });
});

app.get('/samsung/down', function(req, res){
    remote.send('KEY_DOWN', function callback(err) {
  });
});

app.get('/samsung/left', function(req, res){
    remote.send('KEY_LEFT', function callback(err) {
  });
});

app.get('/samsung/right', function(req, res){
    remote.send('KEY_RIGHT', function callback(err) {
  });
});
/*
app.get('/samsung/?', function(req, res){
    remote.send('KEY_EXT2', function callback(err) {
  });
});
*/
/*remote.isAlive(function(err) {
    if (err) {
        //throw new Error('TV is offline');
    } else {
        console.log('TV is ALIVE!');
    }
});
*/
var etattv = 0;
var oldetattv = 0;
function TVon() {
  remote.isAlive(function(err) {
    if (err) {
        //throw new Error('TV is offline');
        etattv = 0;
    } else {
        //console.log('TV is ALIVE!');
        etattv = 1;
    }
  });
  if(etattv!=oldetat){
    console.log('TV change');
    io.emit("TVonoff", etattv);
    oldetattv = etattv;
  }
}

app.get('/samsung/etat', function(req, res){
    res.send("TV"+etattv);
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

/*
--------------------------------------------------
Partie candle
--------------------------------------------------
 */
var adrblth = "AC:E6:4B:07:00:66";
var childb = exec('gatttool -b '+adrblth+' -I');

var color;

app.get('/candle/connect', function(req, res){
  childb.stdin.write('connect\n');
});

app.get('/candle/disconnect', function(req, res){
  childb.stdin.write('disconnect\n');
});

app.get('/candle/modecandleon', function(req, res){
  childb.stdin.write('char-write-cmd 0x0014 00'+color+'04000000\n');
});

app.get('/candle/moderainbow', function(req, res){
  childb.stdin.write('char-write-cmd 0x0014 00'+color+'03000000\n');
});

app.get('/candle/modeflash', function(req, res){
  childb.stdin.write('char-write-cmd 0x0014 00'+color+'00006300\n');
});

app.get('/candle/effectoff', function(req, res){
  childb.stdin.write('char-write-cmd 0x0014 00'+color+'F4000000\n');
});

app.get('/candle/:color', function(req, res){
  console.log(req.params.color);  
  color = req.params.color;
    childb.stdin.write('char-write-cmd 0x0016 00'+req.params.color+'\n');
});



/*
--------------------------------------------------
Partie Arduino
--------------------------------------------------
 */
/*
var sp = new serialport.SerialPort(portName, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\r\n")
});
var temp;
sp.on('data', function(input) {
    console.log(input);
    temp = input;
});

app.get('/temp', function(re, res){
  res.send("TEMP"+temp);
});

*/
/*
--------------------------------------------------
Partie TvBox
--------------------------------------------------
 */

//Your IP
var url = "http://XXX.XXX.XXX.XX:8080/remoteControl/cmd?operation=10"
var etatbox;
var oldetat = "1";
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
app.get('/etatbox', function(re, res) {
  res.send("etatbox"+etatbox);
});

Etatbox();

function amplipower() {
  io.emit("amplionoff", power.substring(3));
}

/*
--------------------------------------------------
Etat de chaque appareil
--------------------------------------------------
 */

function Etatbox1() {
  request({
      url: url,
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
          if (body.result.data.activeStandbyState != etatbox) {
          etatbox = body.result.data.activeStandbyState; // Print the json response
          io.emit('boxonoff', etatbox);
          console.log("test");
        }
      }
  });
}
setInterval(Etatbox1, 1000);





/*
--------------------------------------------------
Serveur web
--------------------------------------------------
 */

http.listen(8085, function(){
  console.log('listening on : 8085');
});
