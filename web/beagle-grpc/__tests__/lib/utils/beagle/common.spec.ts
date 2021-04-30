import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals'
import { logger } from '../../../../src/cli/utils'
import { ViewNode } from '../../../../src/lib/generated-proto/messages_pb'
import { getParsed } from '../../../../src/lib/utils/beagle/common'

describe('src/lib/utils/beagle/common.ts', () => {
  beforeAll(() => {
    logger.disable()
  })

  describe('getParsed', () => {
    test('it should return an parsed object when the function returns a string', () => {
      const mockResponse = { prop: 'value', other: 'prop' }
      const _object_ = { fn: (): string => JSON.stringify(mockResponse) }
      const fnSpy = jest.spyOn(_object_, 'fn')
      const returnedValue = getParsed<typeof mockResponse>(_object_.fn, { prop: 'default', other: 'value' })

      expect(fnSpy).toHaveBeenCalledTimes(1)
      expect(returnedValue).toEqual(mockResponse)
    })

    test('it should use the parser when the function returned a value and parser was passed', () => {
      const mockResponse = new ViewNode()
      const _object_ = { fn: () => mockResponse, parser: (obj: ViewNode) => Object.keys(obj) }
      const fnSpy = jest.spyOn(_object_, 'fn')
      const parserSpy = jest.spyOn(_object_, 'parser')
      const returnedValue = getParsed<string[]>(_object_.fn, [''], _object_.parser)

      expect(fnSpy).toHaveBeenCalledTimes(1)
      expect(parserSpy).toHaveBeenCalledTimes(1)
      expect(returnedValue).toEqual(Object.keys(mockResponse))
    })

    test('it should return the returned value when there is no parser and the object is not a string', () => {
      const mockResponse = 6692
      const _object_ = { fn: () => mockResponse }
      const fnSpy = jest.spyOn(_object_, 'fn')
      const returnedValue = getParsed<number>(_object_.fn, 123)

      expect(fnSpy).toHaveBeenCalledTimes(1)
      expect(returnedValue).toEqual(mockResponse)
    })

    test('it should return the default value when there is no returned value', () => {
      const mockResponse = 123
      const _object_ = { fn: () => undefined }
      const fnSpy = jest.spyOn(_object_, 'fn')
      const returnedValue = getParsed<number>(_object_.fn, mockResponse)

      expect(fnSpy).toHaveBeenCalledTimes(1)
      expect(returnedValue).toEqual(mockResponse)
    })

    test('it should return the default value when something goes wrong', () => {
      const mockResponse = 123
      const _object_ = { fn: () => { throw new Error('error message') } }
      const fnSpy = jest.spyOn(_object_, 'fn')
      const returnedValue = getParsed<number>(_object_.fn, mockResponse)

      expect(fnSpy).toHaveBeenCalledTimes(1)
      expect(returnedValue).toEqual(mockResponse)
    })
  })

  afterAll(() => {
    logger.enable()
  })
})