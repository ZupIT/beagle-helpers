// package: beagle
// file: screen.proto

import * as screen_pb from "./screen_pb";
import * as messages_pb from "./messages_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ScreenControllergetScreen = {
  readonly methodName: string;
  readonly service: typeof ScreenController;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof messages_pb.ScreenRequest;
  readonly responseType: typeof messages_pb.ViewNode;
};

export class ScreenController {
  static readonly serviceName: string;
  static readonly getScreen: ScreenControllergetScreen;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ScreenControllerClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getScreen(
    requestMessage: messages_pb.ScreenRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: messages_pb.ViewNode|null) => void
  ): UnaryResponse;
  getScreen(
    requestMessage: messages_pb.ScreenRequest,
    callback: (error: ServiceError|null, responseMessage: messages_pb.ViewNode|null) => void
  ): UnaryResponse;
}
