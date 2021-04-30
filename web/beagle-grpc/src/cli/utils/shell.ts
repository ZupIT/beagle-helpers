import { exec, ExecOptions } from 'child_process'
import commandExists from 'command-exists'
import { logger } from './logger'

export function envVariableExists(variable: string): boolean {
  try {
    if (variable) {
      return !!process.env[variable]
    }
    throw 'env var was not provided'
  } catch (error) {
    logger.error(error)
    return false
  }
}

export function getEnvVariable(variable: string): string | undefined {
  try {
    if (variable) {
      return process.env[variable]
    }
    throw 'env var was not provided'
  } catch (error) {
    logger.error(error)
    return undefined
  }
}

export async function pathCommandExists(command: string): Promise<boolean> {
  try {
    await commandExists(command)
    return true
  } catch (error) {
    logger.error(error)
    logger.error(' ')
    logger.error(`Command "${command}" is not recognized as an internal or external command`)
    return false
  }
}

export async function execShellCommand(command: string, options?: ExecOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    if (command) {
      const process = exec(command, options, (error, stdout, stderr) => {
        stdout && logger.info(stdout)
        stderr && logger.error(stderr)
        
        if (error) {
          reject(error)
        }
      })
  
      process.on('close', resolve)
    } else {
      reject(new Error('You should provide a valid shell command!'))
    }
  })
}
