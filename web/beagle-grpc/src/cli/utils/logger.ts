import chalk from 'chalk'

function createLogger() {
  let isEnabled = true

  function log(type: 'info' | 'warn' | 'error', ...args: any[]) {
    if (isEnabled) {
      console[type](...args)
    }
  }

  return {
    info: (...args: any[]) => log('info', chalk.cyanBright(...args)),
    warn: (...args: any[]) => log('warn', chalk.yellowBright(...args)),
    error: (...args: any[]) => log('error', chalk.redBright(...args)),
    success: (...args: any[]) => log('info', chalk.greenBright(...args)),
    disable: () => isEnabled = false,
    enable: () => isEnabled = true,
  }
}

export const logger = createLogger()
