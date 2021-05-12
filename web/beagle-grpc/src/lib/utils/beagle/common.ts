import { ViewNode } from '../../generated-proto/messages_pb'

export function getParsed<T>(value: string | ViewNode | T | undefined, defaultValue: T, parser?: (view: ViewNode) => T): T {
  try {
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
    console.error(error)
    return defaultValue
  }
}
