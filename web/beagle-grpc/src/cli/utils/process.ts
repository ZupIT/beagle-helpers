import { logger } from './logger'

export function exitProcess(...args: any[]): void {
  if (args && args.length > 0) {
    args.forEach(a => {
      logger.error(a)
    })

    process.exit(1)
  } else {
    process.exit()
  }
}
