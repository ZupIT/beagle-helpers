import { createClient } from './lib/client'
import { BeagleGrpcClientOptions, FetchType } from './lib/models/client-options'

const defaultOptions: BeagleGrpcClientOptions = {
  proxyAddress: '',
  redirectGrpcFrom: 'grpc://',
  customHttpClient: fetch,
}

export function usingBeagleGrpcClient(options: BeagleGrpcClientOptions): FetchType {
  return createClient({ ...defaultOptions, ...options })
}
