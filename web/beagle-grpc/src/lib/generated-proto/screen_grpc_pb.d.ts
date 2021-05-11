// package: beagle
// file: screen.proto

import * as grpc from 'grpc';
import * as screen_pb from './screen_pb';
import * as messages_pb from './messages_pb';

interface IScreenServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getScreen: IScreenServiceService_IgetScreen;
}

interface IScreenServiceService_IgetScreen {
  path: string; // "/beagle.ScreenService/getScreen"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<messages_pb.ScreenRequest>;
  requestDeserialize: grpc.deserialize<messages_pb.ScreenRequest>;
  responseSerialize: grpc.serialize<messages_pb.ViewNode>;
  responseDeserialize: grpc.deserialize<messages_pb.ViewNode>;
}

export const ScreenServiceService: IScreenServiceService;
export interface IScreenServiceServer {
  getScreen: grpc.handleUnaryCall<messages_pb.ScreenRequest, messages_pb.ViewNode>;
}

export interface IScreenServiceClient {
  getScreen(request: messages_pb.ScreenRequest, callback: (error: Error | null, response: messages_pb.ViewNode) => void): grpc.ClientUnaryCall;
  getScreen(request: messages_pb.ScreenRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: messages_pb.ViewNode) => void): grpc.ClientUnaryCall;
}

export class ScreenServiceClient extends grpc.Client implements IScreenServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  public getScreen(request: messages_pb.ScreenRequest, callback: (error: Error | null, response: messages_pb.ViewNode) => void): grpc.ClientUnaryCall;
  public getScreen(request: messages_pb.ScreenRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: messages_pb.ViewNode) => void): grpc.ClientUnaryCall;
}

