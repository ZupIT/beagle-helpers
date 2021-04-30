import { BeagleUIElement, DataContext } from '@zup-it/beagle-web'
import { ViewNode } from '../../generated-proto/messages_pb'
import { getParsed } from './common'

export function getStyle(view: ViewNode): Record<string, unknown> | undefined {
  return getParsed<Record<string, unknown> | undefined>(view.getStyle, undefined)
}

export function getAttributes(view: ViewNode): Record<string, unknown> {
  return getParsed<Record<string, unknown>>(view.getAttributes, {})
}

export function getChild(view: ViewNode, parser: (view: ViewNode) => BeagleUIElement): BeagleUIElement | undefined {
  return getParsed<BeagleUIElement | undefined>(view.getChild, undefined, parser)
}

export function getContext(view: ViewNode): DataContext | undefined {
  const viewContext = view.getContext()
  if (viewContext) {
    const context: DataContext = {
      id: viewContext.getId()
    }

    const contextValue = viewContext.getValue()
    if (contextValue) {
      context.value = JSON.parse(contextValue)
    }

    return context
  }
  return undefined
}

export function getChildrenList(view: ViewNode, parser: (view: ViewNode) => BeagleUIElement): BeagleUIElement<Record<string, Record<string, unknown>>>[] | undefined {
  const viewChildrenList = view.getChildrenList()
  if (viewChildrenList && viewChildrenList.length > 0) {
    return viewChildrenList.map(parser)
  }
  return undefined
}
