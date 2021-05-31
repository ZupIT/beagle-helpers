import { constants } from 'fs'
import { access } from 'fs/promises'
import { GRPC_WEB_GIT_URL, GRPC_WEB_GO_PATH, MOD_WEB_PROXY_PATH } from '../configs/constants'
import { execShellCommand, exitProcess, getEnvVariable, logger } from '../utils'

const goPath = `${getEnvVariable('GOPATH')}/${GRPC_WEB_GO_PATH}`

async function grpcWebGoPathExists(): Promise<boolean> {
  try {
    await access(goPath, constants.F_OK)
    return true
  } catch (error) {
    logger.error(error)
    return false
  }
}

export async function installGrpcWebProxy(): Promise<void> {
  try {
    const goPathExists = await grpcWebGoPathExists()
    if (!goPathExists) {
      await execShellCommand(`git clone ${GRPC_WEB_GIT_URL} ${goPath}`)
    }
    
    await execShellCommand('dep init', { cwd: goPath })
    await execShellCommand('dep ensure', { cwd: goPath })
    await execShellCommand(`go install --mod=mod ${MOD_WEB_PROXY_PATH}`, { cwd: goPath })
  } catch (error) {
    exitProcess(error, '', 'Failed to install "grpcwebproxy"')
  }
}
