import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals'
import { ViewNode } from '../../../../src/lib/generated-proto/messages_pb'
import { getParsed } from '../../../../src/lib/utils/beagle/common'

describe('src/lib/utils/beagle/common.ts', () => {
  let originalError: (...data: any[]) => void

  beforeAll(() => {
    originalError = console.error
    console.error = jest.fn()
  })

  describe('getParsed', () => {
    test('it should return an parsed object when the function returns a string', () => {
      const mockResponse = { prop: 'value', other: 'prop' }
      const _object_ = { fn: (): string => JSON.stringify(mockResponse) }
      const returnedValue = getParsed<typeof mockResponse>(_object_.fn(), { prop: 'default', other: 'value' })

      expect(returnedValue).toEqual(mockResponse)
    })

    test('it should use the parser when the function returned a value and parser was passed', () => {
      const mockResponse = new ViewNode()
      const _object_ = { fn: () => mockResponse, parser: (obj: ViewNode) => Object.keys(obj) }
      const parserSpy = jest.spyOn(_object_, 'parser')
      const returnedValue = getParsed<string[]>(_object_.fn(), [''], _object_.parser)

      expect(parserSpy).toHaveBeenCalledTimes(1)
      expect(returnedValue).toEqual(Object.keys(mockResponse))
    })

    test('it should return the returned value when there is no parser and the object is not a string', () => {
      const mockResponse = 6692
      const _object_ = { fn: () => mockResponse }
      const returnedValue = getParsed<number>(_object_.fn(), 123)

      expect(returnedValue).toEqual(mockResponse)
    })

    test('it should return the default value when there is no returned value', () => {
      const mockResponse = 123
      const _object_ = { fn: () => undefined }
      const returnedValue = getParsed<number>(_object_.fn(), mockResponse)

      expect(returnedValue).toEqual(mockResponse)
    })

    test('it should return the default value when something goes wrong', () => {
      const mockResponse = new ViewNode()
      const defaultResponse = ['']
      const _object_ = { fn: () => mockResponse, parser: (obj: ViewNode) => { throw new Error('error message') } }
      const returnedValue = getParsed<string[]>(_object_.fn(), defaultResponse, _object_.parser)

      expect(returnedValue).toEqual(defaultResponse)
    })
  })

  afterAll(() => {
    console.error = originalError
  })
})