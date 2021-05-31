import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals'
import { BeagleUIElement } from '@zup-it/beagle-web'
import { logger } from '../../../../src/cli/utils'
import { DataContext, ViewNode } from '../../../../src/lib/generated-proto/messages_pb'
import { getStyle, getAttributes, getChild, getContext, getChildrenList } from '../../../../src/lib/utils/beagle/attributes'

describe('src/lib/utils/beagle/common.ts', () => {
  beforeAll(() => {
    logger.disable()
  })

  describe('getStyle', () => {
    test('it should return the style parsed when it has style', () => {
      const mockStyle = { width: '100%', height: '100%', backgroundColor: '#000' }
      const viewNode = new ViewNode()
      viewNode.getStyle = () => JSON.stringify(mockStyle)

      const returnedValue = getStyle(viewNode)
      expect(returnedValue).toEqual(mockStyle)
    })

    test('it should return undefined when it does not has style', () => {
      const viewNode = new ViewNode()
      viewNode.getStyle = () => ''

      const returnedValue = getStyle(viewNode)
      expect(returnedValue).toBeUndefined()
    })
  })

  describe('getAttributes', () => {
    test('it should return the attributes parsed when it has attributes', () => {
      const mockAttrs = { first: 'value 1', second: 'value 2', third: 'value 3' }
      const viewNode = new ViewNode()
      viewNode.getAttributes = () => JSON.stringify(mockAttrs)

      const returnedValue = getAttributes(viewNode)
      expect(returnedValue).toEqual(mockAttrs)
    })

    test('it should return an empty object when it does not has attributes', () => {
      const viewNode = new ViewNode()
      viewNode.getAttributes = () => ''

      const returnedValue = getAttributes(viewNode)
      expect(returnedValue).toBeDefined()
      expect(Object.keys(returnedValue).length).toBe(0)
    })
  })

  describe('getChild', () => {
    test('it should return the child element parsed when it has a child', () => {
      const beagleElementMock: BeagleUIElement = { _beagleComponent_: 'beagle:container' }
      const childViewNode = new ViewNode()
      const viewNode = new ViewNode()
      viewNode.getChild = () => childViewNode

      const _object_ = {
        parser: (view: ViewNode) => beagleElementMock
      }

      const parserSpy = jest.spyOn(_object_, 'parser')

      const returnedValue = getChild(viewNode, _object_.parser)
      expect(returnedValue).toEqual(beagleElementMock)
      expect(parserSpy).toHaveBeenCalledTimes(1)
      expect(parserSpy).toHaveBeenCalledWith(childViewNode)
    })

    test('it should return undefined when it does not have a child', () => {
      const viewNode = new ViewNode()
      viewNode.getChild = () => undefined

      const returnedValue = getChild(viewNode, (view: ViewNode) => ({} as BeagleUIElement))
      expect(returnedValue).toBeUndefined()
    })
  })

  describe('getContext', () => {
    test('it should return the context with the id when a context is returned', () => {
      const mockContextId = 'mock-context-id'
      const mockContext = new DataContext()
      mockContext.setId(mockContextId)

      const viewNode = new ViewNode()
      viewNode.getContext = () => mockContext

      const returnedValue = getContext(viewNode)
      expect(returnedValue).toBeDefined()
      expect(returnedValue?.id).toBe(mockContextId)
      expect(returnedValue?.value).toBeUndefined()
    })

    test('it should return the context with the id and the value parsed when a context is returned and has a value', () => {

      const mockContextId = 'mock-context-id'
      const mockContextValue = { value: 'mock-context-value' }
      const mockContext = new DataContext()
      mockContext.setId(mockContextId)
      mockContext.setValue(JSON.stringify(mockContextValue))

      const viewNode = new ViewNode()
      viewNode.getContext = () => mockContext

      const returnedValue = getContext(viewNode)
      expect(returnedValue).toBeDefined()
      expect(returnedValue?.id).toBe(mockContextId)
      expect(returnedValue?.value).toEqual(mockContextValue)
    })

    test('it should return undefined when it does not have a context', () => {
      const viewNode = new ViewNode()
      viewNode.getContext = () => undefined

      const returnedValue = getContext(viewNode)
      expect(returnedValue).toBeUndefined()
    })
  })

  describe('getChildrenList', () => {
    test('it should return the children list mapped as the parsed passed as parameter', () => {
      const nodes = [new ViewNode(), new ViewNode(), new ViewNode()]
      const viewNode = new ViewNode()
      viewNode.getChildrenList = () => nodes

      const returnedValue = getChildrenList(viewNode, (viewNode: ViewNode) => ({ _beagleComponent_: 'beagle:element', raw: viewNode }))
      expect(returnedValue).toBeDefined()
      expect(returnedValue).toEqual(nodes.map(n => ({ _beagleComponent_: 'beagle:element', raw: n })))
    })

    test('it should return undefined when it does not have a children list', () => {
      const viewNode = new ViewNode()
      viewNode.getChildrenList = () => []

      let returnedValue = getChildrenList(viewNode, () => ({ _beagleComponent_: 'beagle:container' }))
      expect(returnedValue).toBeUndefined()

      viewNode.getChildrenList = () => (undefined as any)

      returnedValue = getChildrenList(viewNode, () => ({ _beagleComponent_: 'beagle:container' }))
      expect(returnedValue).toBeUndefined()
    })
  })

  afterAll(() => {
    logger.enable()
  })
})