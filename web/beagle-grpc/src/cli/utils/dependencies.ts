import { REQUIRED_DEPENDENCIES } from '../configs/constants';
import { logger } from './logger'
import { pathCommandExists } from './shell'

export async function grpcDepsCommandsExists(dependenciesCommands?: string[]): Promise<boolean> {
  try {
    const deps = [...(dependenciesCommands || []), ...REQUIRED_DEPENDENCIES]

    if (deps && deps.length > 0) {
      let missingCommands: string[] = []

      const verifyPathCommand = async (index: number = 0) => {
        if (index < deps.length) {
          const command = deps[index]
          const commandExists = await pathCommandExists(command)
          if (!commandExists) {
            missingCommands.push(command)
          }        

          ++index
          await verifyPathCommand(index)
        }
      };

      await verifyPathCommand()

      const missingCommandsExists = (missingCommands && missingCommands.length > 0)
      if (missingCommandsExists) {
        missingCommands.forEach(command => {
          logger.error(`"${command}" is not recognized as an internal or external command, please provide the command on your system`)
        })
      }

      return !missingCommandsExists
    }

    throw new Error('No dependency was provided')
  } catch (error) {
    logger.error(error)

    return false
  }
}
