import { describe, test, expect, beforeAll, afterAll, afterEach } from '@jest/globals'
import { logger } from '../../src/cli/utils'
import { FetchRequest } from '../../src/lib/models/fetch-request'
import { getParameters } from '../../src/lib/parameters'
import * as url from '../../src/lib/utils/url'

describe('src/lib/parameters.ts', () => {
  describe('getParameters', () => {
    const requestBody = { prop1: 'value 1', prop2: 'value 2', prop3: 'value 3' }
    const stringedRequestBody = JSON.stringify(requestBody)
    const getRequest = (
      method: string,
      body: unknown = { prop1: 'value 1', prop2: 'value 2', prop3: 'value 3' },
      url: string = 'https://localhost:6692'): FetchRequest => {
      return { url, method, body }
    }

    beforeAll(() => {
      logger.disable()
    })

    describe('"POST", "PUT" or "PATCH"', () => {
      test('It should return the fetch request body stringed when the request is "POST", "PUT" or "PATCH"', () => {
        expect(getParameters(getRequest('POST'))).toBe(stringedRequestBody)
        expect(getParameters(getRequest('PUT'))).toBe(stringedRequestBody)
        expect(getParameters(getRequest('PATCH'))).toBe(stringedRequestBody)
      })

      test('It should return the an empty string when the request is "POST", "PUT" or "PATCH", and there is no body', () => {
        expect(getParameters(getRequest('POST', null))).toBe('')
        expect(getParameters(getRequest('PUT', null))).toBe('')
        expect(getParameters(getRequest('PATCH', null))).toBe('')
      })
    })

    describe('Remaining HTTP methods', () => {
      let queryParamsToObjectSpy: jest.SpyInstance<Record<string, any> | undefined, [url: string]>
      
      beforeAll(() => {
        queryParamsToObjectSpy = jest.spyOn(url, 'queryParamsToObject')
      })

      afterEach(() => {
        queryParamsToObjectSpy.mockReset()
      })

      test('It should return the query params as an object when the url has searchParams', () => {
        expect(getParameters(getRequest('GET', null, 'https://testurl.com/?prop1=value%201&prop2=value%202&prop3=value%203'))).toBe(stringedRequestBody)
        expect(queryParamsToObjectSpy).toReturnWith(requestBody)
      })

      test('It should return the query params as an object when the url has searchParams', () => {
        expect(getParameters(getRequest('GET', null, 'https://testurl.com/?'))).toBe('')
        expect(queryParamsToObjectSpy).toReturnWith(undefined)
      })

      test('It should return an empty string when the url is not valid or something is wrong', () => {
        expect(getParameters(getRequest('GET', null, 'httptest://testurl.com/'))).toBe('')
      })

      test('It should return an empty string when the url does not have query params', () => {
        expect(getParameters(getRequest('GET', null, 'https://testurl.com/'))).toBe('')
      })

      afterAll(() => {
        queryParamsToObjectSpy.mockRestore()
      })
    })

    afterAll(() => {
      logger.enable()
    })
  })
})
