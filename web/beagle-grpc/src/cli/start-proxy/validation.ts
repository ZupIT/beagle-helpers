import { configFileExists } from '../configs'
import { CONFIG_FILE_NAME } from '../configs/constants'
import { logger, grpcDepsCommandsExists, pathCommandExists, envVariableExists } from '../utils'
import { installGrpcWebProxy } from './install-proxy'

interface DependencyValidator {
  fn: () => Promise<boolean>,
  message: string
}

const validators: DependencyValidator[] = [
  {
    fn: () => Promise.resolve(envVariableExists('GOPATH')),
    message: `env var 'GOPATH' is not specified on your environment, please specify it by installing go-lang or setting an env var`
  },
  {
    fn: async () => await grpcDepsCommandsExists(),
    message: `Not all required dependencies exists on your environment, please check if you have all of them: "git", "go", "dep", "protoc"`
  },
  {
    fn: async () => await configFileExists(),
    message: `Configuration file "${CONFIG_FILE_NAME}" does not exist! Please run "beagle-web-grpc init" at the root path of your project to create one`
  }
]

export async function validateDependencies(): Promise<boolean> {
  const missingDependenciesMessages: string[] = []
  for (const validator of validators) {
    !(await validator.fn()) && missingDependenciesMessages.push(validator.message)
  }

  if (missingDependenciesMessages.length > 0) {
    logger.error(...missingDependenciesMessages)
    return false
  }

  return true
}

export async function verifyProxy(): Promise<void> {
  const grpcProxyExists = await pathCommandExists('grpcwebproxy')
  if (!grpcProxyExists) {
    logger.info('>>> "grpcwebproxy" does not exist, installing...')
    await installGrpcWebProxy()
  }
}
