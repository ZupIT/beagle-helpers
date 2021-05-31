import { logger } from './logger'

export function exitProcess(...errors: any[]): void {
  if (errors && errors.length > 0) {
    errors.forEach(a => {
      logger.error(a)
    })

    process.exit(1)
  } else {
    process.exit()
  }
}
