// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var messages_pb = require('./messages_pb.js');

function serialize_beagle_ScreenRequest(arg) {
  if (!(arg instanceof messages_pb.ScreenRequest)) {
    throw new Error('Expected argument of type beagle.ScreenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_beagle_ScreenRequest(buffer_arg) {
  return messages_pb.ScreenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_beagle_ViewNode(arg) {
  if (!(arg instanceof messages_pb.ViewNode)) {
    throw new Error('Expected argument of type beagle.ViewNode');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_beagle_ViewNode(buffer_arg) {
  return messages_pb.ViewNode.deserializeBinary(new Uint8Array(buffer_arg));
}


var ScreenServiceService = exports.ScreenServiceService = {
  getScreen: {
    path: '/beagle.ScreenService/getScreen',
    requestStream: false,
    responseStream: false,
    requestType: messages_pb.ScreenRequest,
    responseType: messages_pb.ViewNode,
    requestSerialize: serialize_beagle_ScreenRequest,
    requestDeserialize: deserialize_beagle_ScreenRequest,
    responseSerialize: serialize_beagle_ViewNode,
    responseDeserialize: deserialize_beagle_ViewNode,
  },
};

exports.ScreenServiceClient = grpc.makeGenericClientConstructor(ScreenServiceService);
