var webServerClient = require('./config/server-client');
var deviceServer = require('./config/device-client');
var request = require('request');
var async = require('async');

request('http://api.swych.io/device/list', function(err, json, body){
    var ipClusters = body && JSON.parse(body);
    console.log('DEVICE LISTING', ipClusters.length);
    var devices = [];
    ipClusters.forEach(function(cluster){
        devices.push(cluster[0]);
    });

    async.each(devices, function(device,cb){
        deviceServer.connect(device,cb);
    }, function(){
        webServerClient.connect(function(){

        });
    });


});
