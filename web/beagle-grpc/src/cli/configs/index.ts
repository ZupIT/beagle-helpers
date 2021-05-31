import { access, readFile, writeFile } from 'fs/promises'
import { constants } from 'fs'
import { logger } from '../utils'
import { baseConfigs, BeagleGrpc, BeagleGrpcConfig } from './models/configs'
import { getConfigCwdPath } from './path'

async function createPromisedFsBooleanFn(fn: Function, ...args: unknown[]): Promise<boolean> {
  try {
    await fn(...args)
    return true
  } catch (error) {
    return false
  }
}

export async function createNewConfigurationFile(): Promise<boolean> {
  return createPromisedFsBooleanFn(writeFile, getConfigCwdPath(), JSON.stringify(baseConfigs, null, 2))
}

export async function configFileExists(): Promise<boolean> {
  return createPromisedFsBooleanFn(access, getConfigCwdPath(), constants.F_OK)
}

export async function getConfigs(mode: string): Promise<BeagleGrpcConfig | undefined> {
  try {
    const configCwdPath = getConfigCwdPath()
    const buffer = await readFile(configCwdPath)
    const beagleGrpc = JSON.parse(buffer.toString('utf-8')) as BeagleGrpc
    const modeConfigs = beagleGrpc.configs.find(c => c.mode === mode)

    if (!modeConfigs) {
      throw new Error(`Configuration for mode "${mode}" was not present on the configurations file`)
    }

    return modeConfigs
  } catch (error) {
    logger.error(error)
    logger.error(' ')
    logger.error(`Unable to find a configuration for the mode "${mode}"`)
    return undefined
  }
}
