import { describe, test, expect, beforeAll, afterAll, beforeEach } from '@jest/globals'
import { BeagleUIElement } from '@zup-it/beagle-web'
import { DataContext, ViewNode } from '../../src/lib/generated-proto/messages_pb'
import { toBeagleUIElement } from '../../src/lib/element'

describe('src/lib/element.ts', () => {
  describe('toBeagleUIElement', () => {
    const mockId = 'beagle:test-component'
    const mockStyle = { width: '100%', height: '100%', backgroundColor: '#000' }
    const mockAttrs = { first: 'value 1', second: 'value 2', third: 'value 3' }

    const mockChildrenList = [new ViewNode(), new ViewNode(), new ViewNode()]
      .map((vn, index) => {
        vn.setBeaglecomponent(`beagle:container:${index}`)
        return vn
      })

    const mockChild = new ViewNode()
    mockChild.setBeaglecomponent('beagle:child')

    const mockContext = new DataContext()
    mockContext.setId('mock-context-id')
    mockContext.setValue(JSON.stringify({ value: 'mock-context-value' }))

    let beagleUIElement: BeagleUIElement

    beforeAll(() => {
      const view = new ViewNode()
      view.getBeaglecomponent = () => mockId
      view.getStyle = () => JSON.stringify(mockStyle)
      view.getAttributes = () => JSON.stringify(mockAttrs)
      view.getChild = () => mockChild
      view.getChildrenList = () => mockChildrenList
      view.getContext = () => mockContext

      beagleUIElement = toBeagleUIElement(view)
    })

    test('it should return a BeagleUIElement with ID', () => {
      expect(beagleUIElement._beagleComponent_).toBe(mockId)
    })

    test('it should return a BeagleUIElement with context', () => {
      expect(beagleUIElement.context).toBeDefined()
      expect(beagleUIElement.context?.id).toBe('mock-context-id')
      expect(beagleUIElement.context?.value).toEqual({ value: 'mock-context-value' })
    })

    test('it should return a BeagleUIElement with style', () => {
      expect(beagleUIElement.child).toEqual({ 
        _beagleComponent_: 'beagle:child', 
        child: undefined,
        children: undefined,
        context: undefined,
        style: undefined
      })
    })

    test('it should return a BeagleUIElement with child', () => {
      expect(beagleUIElement.style).toEqual(mockStyle)
    })

    test('it should return a BeagleUIElement with children', () => {
      expect(beagleUIElement.children).toEqual(mockChildrenList.map((child, index) => ({ 
        _beagleComponent_: `beagle:container:${index}`, 
        child: undefined,
        children: undefined,
        context: undefined,
        style: undefined
      })))
    })

    test('it should return a BeagleUIElement with attributes', () => {
      expect(beagleUIElement.first).toBeDefined()
      expect(beagleUIElement.first).toBe('value 1')

      expect(beagleUIElement.second).toBeDefined()
      expect(beagleUIElement.second).toBe('value 2')

      expect(beagleUIElement.third).toBeDefined()
      expect(beagleUIElement.third).toBe('value 3')
    })
  })
})
