var EventEmitter = require('events').EventEmitter;
var util = require('util');

function bus(){
    EventEmitter.call(this);
}

util.inherits(bus, EventEmitter);

module.exports = new bus();