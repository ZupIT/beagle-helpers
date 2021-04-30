import { logger } from '../../../cli/utils'
import { ViewNode } from '../../generated-proto/messages_pb'

export function getParsed<T>(fn: () => string | ViewNode | T | undefined, defaultValue: T, parser?: (view: ViewNode) => T): T {
  try {
    const value = fn()
    if (!value) {
      return defaultValue
    }

    if (parser) {
      return parser(value as ViewNode)
    } else if (typeof value === 'string') {
      return JSON.parse(value as string)  
    }

    return value as T
  } catch (error) {
    logger.error(error)
    return defaultValue
  }
}
