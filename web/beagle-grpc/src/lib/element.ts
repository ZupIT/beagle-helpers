import { BeagleUIElement } from '@zup-it/beagle-web'
import { ViewNode } from './generated-proto/messages_pb'
import { getAttributes, getChild, getChildrenList, getContext, getStyle } from './utils/beagle/attributes'

export function toBeagleUIElement(view: ViewNode): BeagleUIElement {
  const element: BeagleUIElement = {
    _beagleComponent_: view.getBeaglecomponent(),
    context: getContext(view),
    style: getStyle(view),
    child: getChild(view, toBeagleUIElement),
    children: getChildrenList(view, toBeagleUIElement)
  }

  return { ...element, ...getAttributes(view) }
}
