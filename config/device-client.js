var argv = require('minimist')(process.argv.slice(2));
var port = argv['device-port'] || 8080;
var WebSocket = require('ws');
var uuid = require('uuid');
var bus = require('./events');

var devices = {};

var deviceClient = {
    connect:function(deviceAddress,cb){
        console.log('Now connecting',deviceAddress);
        var ws = new WebSocket('ws://'+deviceAddress+':'+port);
        var id = uuid.v4();
        devices[id] = ws;
        ws.on('open', function open() {

            console.log('Now listening',deviceAddress);
            if(cb)cb();
        });

        ws.on('message', function(payload) {

        });

        ws.on('close', function close() {
            console.log('disconnected'+id,deviceAddress);
            delete devices[id];
        });

    }
}

bus.on('command:register', function(data){
    var ip = data.ips[0];
    deviceClient.connect(ip);
});


bus.on('command:switch', function(data){
    var payload = JSON.stringify(data);
    Object.keys(devices).forEach(function(key){
        var device = devices[key];
        device.send(payload);
    });
});

module.exports = deviceClient;