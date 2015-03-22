var argv = require('minimist')(process.argv.slice(2));
var port = argv['device-port'] || 8080;
var WebSocketServer = require('ws').Server;
var uuid = require('uuid');
var bus = require('./events');

module.exports = {
    listen:function(){
        var wss = new WebSocketServer({ port: port }),
            clients = {};

        wss.on('connection', function connection(ws) {

            var connectionId = uuid.v4();
            clients[connectionId] = {connection:ws};

            ws.on('message', function incoming(message) {
                console.log('Message from board: %s', message);
            });

            ws.on('close', function close() {
                console.log('disconnected');
                delete clients[connectionId];
            });

            //TODO: get device ID in handshake

            bus.on('command:switch', function(data){
                var payload = JSON.stringify(data);
                //TODO: replace with ID filter
                Object.keys(clients).forEach(function(id){
                    var client = clients[id];
                    client.connection.send(payload);
                });
            });


        });

        console.log('Server will open on next tick for localhost:'+port);

    }
}