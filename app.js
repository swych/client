var webServerClient = require('./config/server-client');
var deviceServer = require('./config/device-server');

webServerClient.connect(function(){
    deviceServer.listen();
});