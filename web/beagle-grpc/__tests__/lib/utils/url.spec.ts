import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals'
import { isValidURL, queryParamsToObject } from '../../../src/lib/utils/url'

describe('src/lib/utils/url.ts', () => {
  describe('isValidURL', () => {
    test('It should validate an valid url', () => {
      const isValid = isValidURL('https://validurl.com/')
      expect(isValid).toBeTruthy()
    })

    test('It should return false when it is not a valid url', () => {
      const isValid = isValidURL('https://validurl?aa.com/')
      expect(isValid).toBeFalsy()
    })

    test('It should return false when the url is not provided', () => {
      const isValid = isValidURL('')
      expect(isValid).toBeFalsy()
    })
  })

  describe('queryParamsToObject', () => {
    let originalError: typeof console.error

    beforeAll(() => {
      originalError = console.error
      console.error = jest.fn()
    })

    test('It should return the query params as an object when the url has searchParams', () => {
      const objectifiedParams = queryParamsToObject('https://testurl.com?prop1=value%201&prop2=value%202&prop3=value%203')
      expect(objectifiedParams).toEqual({ prop1: 'value 1', prop2: 'value 2', prop3: 'value 3' })
    })

    test('It should return undefined when an valid url do not have params', () => {
      const objectifiedParams = queryParamsToObject('https://validurl.com/')
      expect(Object.keys(objectifiedParams as {}).length).toBe(0)
    })

    test('It should return undefined when it is not a valid url', () => {
      const objectifiedParams = queryParamsToObject('https://validurl?aa.com/')
      expect(objectifiedParams).toBeUndefined()
    })

    test('It should return false when the url is not provided', () => {
      const objectifiedParams = queryParamsToObject('')
      expect(objectifiedParams).toBeUndefined()
    })

    afterAll(() => {
      console.error = originalError
    })
  })
})
