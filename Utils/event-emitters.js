const emitter = require('events').EventEmitter;
const requestEmitter = new emitter();

let request;

requestEmitter.on("newRequest", (req) => {
    request = req;
});

exports.requestEmitter = requestEmitter;
exports.getCurrentRequest = () => {
    return request;
} 