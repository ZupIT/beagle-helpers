import { getConfigs } from '../configs'
import { execShellCommand, logger, exitProcess } from '../utils'
import { validateDependencies, verifyProxy } from './validation'

export interface StartProxyOptions {
  mode: string
}

export async function startProxy(options: StartProxyOptions): Promise<void> {
  try {
    logger.info('> Initializing "beagle-web-grpc" proxy...')

    logger.info(`>> Verifying if configuration file exists and configured for the mode "${options.mode}"`)
    const configs = await getConfigs(options.mode)
    if (!configs) {
      throw new Error(`Configuration for the mode "${options.mode}" does not exists`)
    }
    logger.info(`>> Configuration for the mode "${options.mode}" exists!`)

    logger.info('>> Validating dependencies...')
    const dependenciesAreFine = await validateDependencies()
    if (!dependenciesAreFine) {
      throw new Error('Not all dependencies are installed')
    }
    logger.info('>> Dependencies are fine!')

    logger.info('>>> Verifying if "grpcwebproxy" is installed')
    await verifyProxy()
    logger.info('>>> "grpcwebproxy" is installed!')    

    const tls = configs.tlsCertificatePath && configs.tlsKeyPath
      ? `--server_tls_cert_file=${configs.tlsCertificatePath} --server_tls_key_file=${configs.tlsKeyPath}`
      : '--run_tls_server=false'

    logger.info('>> Starting Beagle gRPC Proxy...')
    logger.info(' ')
    logger.success(`Beagle gRPC Proxy running at localhost:${configs.runProxyOnPort}`)

    await execShellCommand(`grpcwebproxy --backend_addr=${configs.grpcBackendAddress} --allow_all_origins ${tls} --server_http_debug_port=${configs.runProxyOnPort}`)
  } catch (error) {
    exitProcess(error, ' ', 'Failed to install and start the application. Please make sure that all external dependencies are installed')
  }
}
