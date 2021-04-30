export interface BeagleGrpcConfig {
  mode: string
  grpcBackendAddress: string
  tlsCertificatePath: string
  tlsKeyPath: string
  runProxyOnPort: number
}

export interface BeagleGrpc {
  configs: BeagleGrpcConfig[]
}

export const baseConfigs: BeagleGrpc = {
  configs: [
    {
      mode: 'development',
      grpcBackendAddress: 'localhost:50051',
      tlsCertificatePath: '',
      tlsKeyPath: '',
      runProxyOnPort: 8081
    },
    {
      mode: 'production',
      grpcBackendAddress: 'https://my-grpc.backend.com/address',
      tlsCertificatePath: '',
      tlsKeyPath: '',
      runProxyOnPort: 8081
    }
  ]
}
