var WebSocket = require('ws');
var argv = require('minimist')(process.argv.slice(2));
var host = argv.host || 'api.swych.io';
var port = argv.port || 80;
var bus = require('./events');

module.exports = {
    connect: function(cb){
        var ws = new WebSocket('ws://'+host+':'+port);

        ws.on('open', function open() {
            if(cb)cb();
            console.log('Connected!');
        });

        ws.on('message', function(payload) {
            var request = JSON.parse(payload);
            var action = request.command;
            console.log('MESSAGE',payload);
            bus.emit('command:'+action, request.data);
        });
        ws.on('error', function() {
            console.log('error', arguments);

        });
    }
}