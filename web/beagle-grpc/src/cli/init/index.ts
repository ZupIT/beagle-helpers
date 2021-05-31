import { configFileExists, createNewConfigurationFile } from '../configs'
import { CONFIG_FILE_NAME } from '../configs/constants'
import { getConfigCwdPath } from '../configs/path'
import { logger, exitProcess, grpcDepsCommandsExists, envVariableExists } from '../utils'

export async function init(): Promise<void> {
  try {
    logger.info('> Initializing "beagle-web-grpc"...')
    logger.info(`Checking if ${CONFIG_FILE_NAME} exists...`)

    const configExists = await configFileExists()
    if (configExists) {
      throw new Error('Configuration file already exists!')
    }

    logger.info('> Configuration file does not exist, creating a new one...')

    const fileCreated = await createNewConfigurationFile()
    if (!fileCreated) {
      throw new Error('Unable to create the configuration file!')
    }

    await grpcDepsCommandsExists()

    if (!envVariableExists('GOPATH')) {
      logger.warn(`env var 'GOPATH' is not specified on your environment, please specify it and add it to the configuration file`)
    }

    logger.info(`> NEXT STEP: Please review the configuration file and fill it with your environment info, also, follow the remaining instructions in the documentation`)
    logger.info(`> ${CONFIG_FILE_NAME} file created at "${getConfigCwdPath()}"`)

    exitProcess()
  } catch (error) {
    exitProcess(error)
  }
}
