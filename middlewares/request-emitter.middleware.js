const { requestEmitter } = require("../Utils/event-emitters");

exports.emitNewRequests = (req, res, next) => {
    requestEmitter.emit("newRequest", req);
    next();
}