import { ScreenServiceClient } from './generated-proto/screen_pb_service'
import { BeagleGrpcClientOptions, FetchType, RequestArgs } from './models/client-options'
import { getRequest } from './utils/request'
import { fetchGrpcView } from './view'

export function createClient(options: BeagleGrpcClientOptions): FetchType {
  const { proxyAddress, redirectGrpcFrom, customHttpClient } = options
  const client = new ScreenServiceClient(proxyAddress)

  const grpcClient: FetchType = (...args: RequestArgs) => {
    try {
      if (args && args[0]) {
        const request = getRequest(args[0])
        if (redirectGrpcFrom && request?.url.startsWith(redirectGrpcFrom)) {
          return fetchGrpcView(request.url.replace(new RegExp(`^${redirectGrpcFrom}`), ''), client, request)
        } else if (customHttpClient) {
          return customHttpClient(...args)
        }
      }
      return fetch(...args)
    } catch (error) {
      console.error(error)
      return fetch(...args)
    }
  } 
  return grpcClient
}
