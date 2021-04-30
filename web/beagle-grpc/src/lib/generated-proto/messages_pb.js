// source: messages.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.beagle.DataContext', null, global);
goog.exportSymbol('proto.beagle.ScreenRequest', null, global);
goog.exportSymbol('proto.beagle.ViewNode', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.beagle.ScreenRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.beagle.ScreenRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.beagle.ScreenRequest.displayName = 'proto.beagle.ScreenRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.beagle.DataContext = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.beagle.DataContext, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.beagle.DataContext.displayName = 'proto.beagle.DataContext';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.beagle.ViewNode = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.beagle.ViewNode.repeatedFields_, null);
};
goog.inherits(proto.beagle.ViewNode, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.beagle.ViewNode.displayName = 'proto.beagle.ViewNode';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.beagle.ScreenRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.beagle.ScreenRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.beagle.ScreenRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.beagle.ScreenRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    parameters: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.beagle.ScreenRequest}
 */
proto.beagle.ScreenRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.beagle.ScreenRequest;
  return proto.beagle.ScreenRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.beagle.ScreenRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.beagle.ScreenRequest}
 */
proto.beagle.ScreenRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setParameters(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.beagle.ScreenRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.beagle.ScreenRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.beagle.ScreenRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.beagle.ScreenRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getParameters();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.beagle.ScreenRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.beagle.ScreenRequest} returns this
 */
proto.beagle.ScreenRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string parameters = 2;
 * @return {string}
 */
proto.beagle.ScreenRequest.prototype.getParameters = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.beagle.ScreenRequest} returns this
 */
proto.beagle.ScreenRequest.prototype.setParameters = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.beagle.DataContext.prototype.toObject = function(opt_includeInstance) {
  return proto.beagle.DataContext.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.beagle.DataContext} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.beagle.DataContext.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    value: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.beagle.DataContext}
 */
proto.beagle.DataContext.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.beagle.DataContext;
  return proto.beagle.DataContext.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.beagle.DataContext} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.beagle.DataContext}
 */
proto.beagle.DataContext.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.beagle.DataContext.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.beagle.DataContext.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.beagle.DataContext} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.beagle.DataContext.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getValue();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.beagle.DataContext.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.beagle.DataContext} returns this
 */
proto.beagle.DataContext.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string value = 2;
 * @return {string}
 */
proto.beagle.DataContext.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.beagle.DataContext} returns this
 */
proto.beagle.DataContext.prototype.setValue = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.beagle.ViewNode.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.beagle.ViewNode.prototype.toObject = function(opt_includeInstance) {
  return proto.beagle.ViewNode.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.beagle.ViewNode} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.beagle.ViewNode.toObject = function(includeInstance, msg) {
  var f, obj = {
    beaglecomponent: jspb.Message.getFieldWithDefault(msg, 1, ""),
    id: jspb.Message.getFieldWithDefault(msg, 2, ""),
    context: (f = msg.getContext()) && proto.beagle.DataContext.toObject(includeInstance, f),
    childrenList: jspb.Message.toObjectList(msg.getChildrenList(),
    proto.beagle.ViewNode.toObject, includeInstance),
    child: (f = msg.getChild()) && proto.beagle.ViewNode.toObject(includeInstance, f),
    style: jspb.Message.getFieldWithDefault(msg, 6, ""),
    attributes: jspb.Message.getFieldWithDefault(msg, 7, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.beagle.ViewNode}
 */
proto.beagle.ViewNode.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.beagle.ViewNode;
  return proto.beagle.ViewNode.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.beagle.ViewNode} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.beagle.ViewNode}
 */
proto.beagle.ViewNode.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setBeaglecomponent(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 3:
      var value = new proto.beagle.DataContext;
      reader.readMessage(value,proto.beagle.DataContext.deserializeBinaryFromReader);
      msg.setContext(value);
      break;
    case 4:
      var value = new proto.beagle.ViewNode;
      reader.readMessage(value,proto.beagle.ViewNode.deserializeBinaryFromReader);
      msg.addChildren(value);
      break;
    case 5:
      var value = new proto.beagle.ViewNode;
      reader.readMessage(value,proto.beagle.ViewNode.deserializeBinaryFromReader);
      msg.setChild(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setStyle(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setAttributes(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.beagle.ViewNode.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.beagle.ViewNode.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.beagle.ViewNode} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.beagle.ViewNode.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBeaglecomponent();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getContext();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.beagle.DataContext.serializeBinaryToWriter
    );
  }
  f = message.getChildrenList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.beagle.ViewNode.serializeBinaryToWriter
    );
  }
  f = message.getChild();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.beagle.ViewNode.serializeBinaryToWriter
    );
  }
  f = message.getStyle();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getAttributes();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional string beagleComponent = 1;
 * @return {string}
 */
proto.beagle.ViewNode.prototype.getBeaglecomponent = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.beagle.ViewNode} returns this
 */
proto.beagle.ViewNode.prototype.setBeaglecomponent = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string id = 2;
 * @return {string}
 */
proto.beagle.ViewNode.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.beagle.ViewNode} returns this
 */
proto.beagle.ViewNode.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional DataContext context = 3;
 * @return {?proto.beagle.DataContext}
 */
proto.beagle.ViewNode.prototype.getContext = function() {
  return /** @type{?proto.beagle.DataContext} */ (
    jspb.Message.getWrapperField(this, proto.beagle.DataContext, 3));
};


/**
 * @param {?proto.beagle.DataContext|undefined} value
 * @return {!proto.beagle.ViewNode} returns this
*/
proto.beagle.ViewNode.prototype.setContext = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.beagle.ViewNode} returns this
 */
proto.beagle.ViewNode.prototype.clearContext = function() {
  return this.setContext(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.beagle.ViewNode.prototype.hasContext = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * repeated ViewNode children = 4;
 * @return {!Array<!proto.beagle.ViewNode>}
 */
proto.beagle.ViewNode.prototype.getChildrenList = function() {
  return /** @type{!Array<!proto.beagle.ViewNode>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.beagle.ViewNode, 4));
};


/**
 * @param {!Array<!proto.beagle.ViewNode>} value
 * @return {!proto.beagle.ViewNode} returns this
*/
proto.beagle.ViewNode.prototype.setChildrenList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.beagle.ViewNode=} opt_value
 * @param {number=} opt_index
 * @return {!proto.beagle.ViewNode}
 */
proto.beagle.ViewNode.prototype.addChildren = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.beagle.ViewNode, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.beagle.ViewNode} returns this
 */
proto.beagle.ViewNode.prototype.clearChildrenList = function() {
  return this.setChildrenList([]);
};


/**
 * optional ViewNode child = 5;
 * @return {?proto.beagle.ViewNode}
 */
proto.beagle.ViewNode.prototype.getChild = function() {
  return /** @type{?proto.beagle.ViewNode} */ (
    jspb.Message.getWrapperField(this, proto.beagle.ViewNode, 5));
};


/**
 * @param {?proto.beagle.ViewNode|undefined} value
 * @return {!proto.beagle.ViewNode} returns this
*/
proto.beagle.ViewNode.prototype.setChild = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.beagle.ViewNode} returns this
 */
proto.beagle.ViewNode.prototype.clearChild = function() {
  return this.setChild(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.beagle.ViewNode.prototype.hasChild = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional string style = 6;
 * @return {string}
 */
proto.beagle.ViewNode.prototype.getStyle = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.beagle.ViewNode} returns this
 */
proto.beagle.ViewNode.prototype.setStyle = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string attributes = 7;
 * @return {string}
 */
proto.beagle.ViewNode.prototype.getAttributes = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.beagle.ViewNode} returns this
 */
proto.beagle.ViewNode.prototype.setAttributes = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


goog.object.extend(exports, proto.beagle);
