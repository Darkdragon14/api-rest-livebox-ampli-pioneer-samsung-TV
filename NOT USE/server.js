var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var exec = require('child_process').exec;
var samsungRemote = require('samsung-remote');
/*var serialport = require('serialport');
var portName = "/dev/ttyACM0";*/
var request = require("request");

//evite l'erreur du crossdomain
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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
var url = "http://192.168.1.10:8080/remoteControl/cmd?operation=10"
var etatbox = "0";
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
setInterval(Etatbox, 1000);





/*
--------------------------------------------------
Serveur web
--------------------------------------------------
 */

http.listen(8085, function(){
  console.log('listening on : 8085');
});
