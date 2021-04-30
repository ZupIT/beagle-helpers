// package: beagle
// file: screen.proto

var screen_pb = require("./screen_pb");
var messages_pb = require("./messages_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ScreenController = (function () {
  function ScreenController() {}
  ScreenController.serviceName = "beagle.ScreenController";
  return ScreenController;
}());

ScreenController.getScreen = {
  methodName: "getScreen",
  service: ScreenController,
  requestStream: false,
  responseStream: false,
  requestType: messages_pb.ScreenRequest,
  responseType: messages_pb.ViewNode
};

exports.ScreenController = ScreenController;

function ScreenControllerClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ScreenControllerClient.prototype.getScreen = function getScreen(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ScreenController.getScreen, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.ScreenControllerClient = ScreenControllerClient;

