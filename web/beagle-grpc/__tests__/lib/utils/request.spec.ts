import 'isomorphic-fetch'
import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals'
import JestMock from 'jest-mock'
import { BrowserHeaders } from 'browser-headers'
import { grpc } from '@improbable-eng/grpc-web'
import { ScreenRequest, ViewNode } from '../../../src/lib/generated-proto/messages_pb'
import * as request from '../../../src/lib/utils/request'
import { FetchRequest } from '../../../src/lib/models/fetch-request'
import * as parameters from '../../../src/lib/parameters'
import { ScreenServiceClient } from '../../../src/lib/generated-proto/screen_pb_service'

describe('src/lib/utils/request.ts', () => {
  const _MOCK_PROXY_ADDRESS_ = 'http://localhost:6692/'
  const _MOCK_GRPC_URL_ = 'http://localhost:9266/grpc'

  describe('getRequest', () => {
    test('it should return an object with what the user sent, when the arg is only a string', () => {
      let url = 'https://localhost:6692/grpc/'
      let result = request.getRequest(url)
      expect(result).toEqual({ url })

      url = 'my test path - even invalid it must work'
      result = request.getRequest(url)
      expect(result).toEqual({ url })
    })

    test('it should return an object containing "{ url, method, headers, body }" when the arg is an object', () => {
      let url: any = {
        url: 'https://localhost:6692/grpc/',
        method: 'post',
        body: 'my request body',
        headers: [{ 'Content-Type': 'application/json' }],
        credentials: 'my=credentials',
        cache: '7d'
      }
      let result = request.getRequest(url as any)

      expect(result).toEqual({
        url: 'https://localhost:6692/grpc/',
        method: 'post',
        body: 'my request body',
        headers: [{ 'Content-Type': 'application/json' }]
      })


      url = {
        url: 'https://localhost:6692/grpc/',
        method: 'get'
      }
      result = request.getRequest(url as any)

      expect(result).toEqual({
        url: 'https://localhost:6692/grpc/',
        method: 'get',
        body: undefined,
        headers: undefined
      })
    })

    test('it should return null when no arg is provided or is null/undefined', () => {
      let result = request.getRequest(null as any)
      expect(result).toBe(null)

      result = request.getRequest(undefined as any)
      expect(result).toBe(null)
    })

    test('it should return null when the arg set is not a string or object', () => {
      let result = request.getRequest(1.2 as any)
      expect(result).toBe(null)

      result = request.getRequest(true as any)
      expect(result).toBe(null)
    })
  })

  describe('getView', () => {
    const screenRequestProto = ScreenRequest.prototype
    const screenRequestOriginalProto = Object.assign({}, ScreenRequest.prototype)
    const screenServiceClientProto = ScreenServiceClient.prototype
    const screenServiceClientOriginalProto = Object.assign({}, ScreenServiceClient.prototype)
    const screenName = 'screen-name'
    const viewNode = new ViewNode()

    let screenRequestSetNameSpy: JestMock.Mock<void, [value: string]>
    let screenRequestSetParametersSpy: JestMock.Mock<void, [value: string]>
    let screenServiceClientGetScreenSpy: JestMock.Mock<any, any[]>
    let client: ScreenServiceClient

    const fetchRequest: FetchRequest = {
      url: _MOCK_GRPC_URL_,
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    }

    beforeAll(() => {
      screenRequestSetNameSpy = screenRequestProto.setName = jest.fn()
      screenRequestSetParametersSpy = screenRequestProto.setParameters = jest.fn()
    })

    describe('normal flow', () => {
      let getParametersSpy: JestMock.SpyInstance<string, [fetchReq: FetchRequest]>

      beforeAll(async () => {
        getParametersSpy = jest.spyOn(parameters, 'getParameters')
        screenServiceClientGetScreenSpy = screenServiceClientProto.getScreen = jest.fn<any, any[]>()
          .mockImplementation((requestMessage: ScreenRequest, metadata: BrowserHeaders, callback: (error: any, responseMessage: ViewNode) => void) => {
            callback(undefined, viewNode)
            return {
              cancel: jest.fn()
            }
          })

        client = new ScreenServiceClient(_MOCK_PROXY_ADDRESS_)

        await request.getView(screenName, client, fetchRequest)
      })

      test('it should create a request setting the name', () => {
        expect(screenRequestSetNameSpy).toHaveBeenCalledTimes(1)
        expect(screenRequestSetNameSpy).toHaveBeenCalledWith(screenName)
      })

      test('it should create a request setting the parameters', () => {
        expect(screenRequestSetParametersSpy).toHaveBeenCalledTimes(1)

        expect(getParametersSpy).toHaveBeenCalledTimes(1)
        expect(getParametersSpy).toHaveBeenCalledWith(fetchRequest)
      })

      test('it should get the screen using the client', () => {
        expect(screenServiceClientGetScreenSpy).toHaveBeenCalledTimes(1)
      })

      test('it should get the screen with a ScreenRequest', () => {
        expect(screenServiceClientGetScreenSpy.mock.calls[0][0] instanceof ScreenRequest).toBeTruthy()
      })

      test('it should get the screen with a ScreenRequest', () => {
        expect(screenServiceClientGetScreenSpy.mock.calls[0][1] instanceof grpc.Metadata).toBeTruthy()
      })

      test('it should resolve the view node after succeeded', async () => {
        await expect(request.getView(screenName, client, fetchRequest)).resolves.toBe(viewNode)
      })

      afterAll(() => {
        screenRequestSetNameSpy.mockRestore()
        screenRequestSetParametersSpy.mockRestore()
        getParametersSpy.mockRestore()
      })
    })

    describe('error handling', () => {
      describe('something went wrong', () => {
        test('it should reject when something went wrong', async () => {
          await expect(request.getView(screenName, (null as any), fetchRequest)).rejects.toThrow()
        })
      })

      describe('error and response undefined', () => {
        beforeAll(() => {
          screenServiceClientGetScreenSpy = screenServiceClientProto.getScreen = jest.fn<any, any[]>()
            .mockImplementation((requestMessage: ScreenRequest, metadata: BrowserHeaders, callback: (error: any, responseMessage: ViewNode) => void) => {
              callback(undefined, (undefined as any))
              return {
                cancel: jest.fn()
              }
            })

          client = new ScreenServiceClient(_MOCK_PROXY_ADDRESS_)
        })

        test('it should reject when there is no error or response', async () => {
          await expect(request.getView(screenName, client, fetchRequest)).rejects.toThrow(new Error(`Failed to get the screen named "${screenName}"`))
        })
      })

      describe('error and response defined', () => {
        beforeAll(() => {
          screenServiceClientGetScreenSpy = screenServiceClientProto.getScreen = jest.fn<any, any[]>()
            .mockImplementation((requestMessage: ScreenRequest, metadata: BrowserHeaders, callback: (error: any, responseMessage: ViewNode) => void) => {
              callback({ message: 'Custom test error message' } as any, viewNode)
              return {
                cancel: jest.fn()
              }
            })

          client = new ScreenServiceClient(_MOCK_PROXY_ADDRESS_)
        })

        test('it should reject when there is any error even with response', async () => {
          await expect(request.getView(screenName, client, fetchRequest)).rejects.toEqual({ message: 'Custom test error message' } as any)
        })
      })
    })

    afterAll(() => {
      screenRequestProto.setName = screenRequestOriginalProto.setName
      screenRequestProto.setParameters = screenRequestOriginalProto.setParameters
      screenServiceClientProto.getScreen = screenServiceClientOriginalProto.getScreen
    })
  })
})
