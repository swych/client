var port = 8080;
var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ port: port }),
    clients = {};
var uuid = require('uuid');

wss.on('connection', function connection(ws) {

    var connectionId = uuid.v4();
    clients[connectionId] = ws;

    ws.on('message', function incoming(message) {
        console.log('Message from board: %s', message);
    });

    ws.on('close', function close() {
        console.log('disconnected');
        delete clients[connectionId];
    });


    ws.send('Message to Board');
});

console.log('Connection will begin on next tick for localhost:'+port);



