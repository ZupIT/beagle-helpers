export type FetchType = typeof fetch

export type RequestArgs = [input: RequestInfo, init?: RequestInit | undefined]

export interface BeagleGrpcClientOptions {
  proxyAddress: string,
  redirectGrpcFrom?: string,
  customHttpClient?: FetchType,
}
