var WebSocket = require('ws');
var argv = require('minimist')(process.argv.slice(2));
var ws = new WebSocket('ws://'+argv.host+':8080');

ws.on('open', function open() {
    console.log('Connected!');
});

ws.on('message', function(data, flags) {
    console.log(data,flags);
});