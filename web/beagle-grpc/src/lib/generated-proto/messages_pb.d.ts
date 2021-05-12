// package: beagle
// file: messages.proto

import * as jspb from "google-protobuf";

export class ScreenRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getParameters(): string;
  setParameters(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ScreenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ScreenRequest): ScreenRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ScreenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ScreenRequest;
  static deserializeBinaryFromReader(message: ScreenRequest, reader: jspb.BinaryReader): ScreenRequest;
}

export namespace ScreenRequest {
  export type AsObject = {
    name: string,
    parameters: string,
  }
}

export class DataContext extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DataContext.AsObject;
  static toObject(includeInstance: boolean, msg: DataContext): DataContext.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DataContext, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DataContext;
  static deserializeBinaryFromReader(message: DataContext, reader: jspb.BinaryReader): DataContext;
}

export namespace DataContext {
  export type AsObject = {
    id: string,
    value: string,
  }
}

export class ViewNode extends jspb.Message {
  getBeaglecomponent(): string;
  setBeaglecomponent(value: string): void;

  getId(): string;
  setId(value: string): void;

  hasContext(): boolean;
  clearContext(): void;
  getContext(): DataContext | undefined;
  setContext(value?: DataContext): void;

  clearChildrenList(): void;
  getChildrenList(): Array<ViewNode>;
  setChildrenList(value: Array<ViewNode>): void;
  addChildren(value?: ViewNode, index?: number): ViewNode;

  hasChild(): boolean;
  clearChild(): void;
  getChild(): ViewNode | undefined;
  setChild(value?: ViewNode): void;

  getStyle(): string;
  setStyle(value: string): void;

  getAttributes(): string;
  setAttributes(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ViewNode.AsObject;
  static toObject(includeInstance: boolean, msg: ViewNode): ViewNode.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ViewNode, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ViewNode;
  static deserializeBinaryFromReader(message: ViewNode, reader: jspb.BinaryReader): ViewNode;
}

export namespace ViewNode {
  export type AsObject = {
    beaglecomponent: string,
    id: string,
    context?: DataContext.AsObject,
    childrenList: Array<ViewNode.AsObject>,
    child?: ViewNode.AsObject,
    style: string,
    attributes: string,
  }
}

