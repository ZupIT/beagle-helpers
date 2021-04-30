import clear from 'clear'
import figlet from 'figlet'
import { createProgramCLI } from './program'
import { logger } from './utils'

export async function main(): Promise<void> {
  clear()
  logger.info(figlet.textSync('beagle-web-grpc', { horizontalLayout: 'fitted' }))
  
  const program = createProgramCLI()
  await program.parseAsync(process.argv)
}
