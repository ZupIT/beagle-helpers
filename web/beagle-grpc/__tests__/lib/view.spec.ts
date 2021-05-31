import 'isomorphic-fetch'
import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals'
import JestMock from 'jest-mock'
import Blob from 'cross-blob'
import * as request from '../../src/lib/utils/request'
import * as element from '../../src/lib/element'
import * as blob from '../../src/lib/utils/blob'
import * as response from '../../src/lib/utils/response'
import * as view from '../../src/lib/view'
import { FetchRequest } from '../../src/lib/models/fetch-request'
import { BeagleUIElement } from '@zup-it/beagle-web'
import { ViewNode } from '../../src/lib/generated-proto/messages_pb'
import { ScreenServiceClient } from '../../src/lib/generated-proto/screen_pb_service'

describe('src/lib/view.ts', () => {
  const _MOCK_PROXY_ADDRESS_ = 'http://localhost:6692/'
  const _MOCK_GRPC_URL_ = 'http://localhost:9266/grpc'
  const screenName = 'screen-name'
  const client = new ScreenServiceClient(_MOCK_PROXY_ADDRESS_)
  const viewNode = new ViewNode()
  const mockBlob = new Blob(['{ "content": "test content" }'], { type: 'application/json' })
  const fetchReq = {
    url: _MOCK_GRPC_URL_,
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json' })
  }
  const beagleTree = {
    _beagleComponent_: 'beagle:container',
    children: [
      {
        _beagleComponent_: 'beagle:text',
        text: 'Test Text'
      }
    ]
  }

  let getViewSpy: JestMock.SpyInstance<Promise<ViewNode>, [name: string, client: ScreenServiceClient, fetchReq: FetchRequest]>
  let toBeagleUIElementSpy: JestMock.SpyInstance<BeagleUIElement<Record<string, Record<string, any>>>, any[]>
  let createBlobSpy: JestMock.SpyInstance<Blob, [content: string, type: string]>
  let createResponseSpy: JestMock.SpyInstance<Response, [blob: Blob, status: number, statusText: string]>
  let fetchGrpcViewSpy: JestMock.SpyInstance<Promise<Response>, [name: string, client: ScreenServiceClient, fetchReq: FetchRequest]>

  beforeAll(async () => {
    globalThis.Blob = Blob

    getViewSpy = jest.spyOn(request, 'getView').mockImplementation(() => Promise.resolve(viewNode))
    toBeagleUIElementSpy = jest.spyOn(element, 'toBeagleUIElement').mockImplementation(() => beagleTree)
    createBlobSpy = jest.spyOn(blob, 'createBlob').mockImplementation(() => mockBlob)
    createResponseSpy = jest.spyOn(response, 'createResponse').mockImplementation(() => Promise.resolve(new Response()))
    fetchGrpcViewSpy = jest.spyOn(view, 'fetchGrpcView')
  })

  describe('normal flow', () => {
    beforeAll(async () => {
      await view.fetchGrpcView(screenName, client, fetchReq)
    })

    test('it should get the view', () => {
      expect(getViewSpy).toHaveBeenCalledTimes(1)
      expect(getViewSpy).toHaveBeenCalledWith(screenName, client, fetchReq)
    })

    test('it should cast the view to a beagleUIElement', () => {
      expect(toBeagleUIElementSpy).toHaveBeenCalledTimes(1)
      expect(toBeagleUIElementSpy).toHaveBeenCalledWith(viewNode)
    })

    test('it should create a blob with the beagle tree stringed and the type should be "application/json"', () => {
      expect(createBlobSpy).toHaveBeenCalledTimes(1)
      expect(createBlobSpy).toHaveBeenCalledWith(JSON.stringify(beagleTree), 'application/json')
    })

    test('it should create a response with it, telling everything is ok', () => {
      expect(createResponseSpy).toHaveBeenCalledTimes(1)
      expect(createResponseSpy).toHaveBeenCalledWith(mockBlob, 200, 'OK')
    })
  })

  describe('error handling', () => {
    describe('an error happened', () => {
      const errorMessage = 'my error'

      beforeAll(async () => {
        createBlobSpy.mockClear()
        createResponseSpy.mockClear()

        getViewSpy = jest.spyOn(request, 'getView').mockImplementation(() => Promise.reject(new Error(errorMessage)))
        await view.fetchGrpcView(screenName, client, fetchReq)
      })

      test('it should create a blob with the error message as plain text', () => {
        expect(createBlobSpy).toHaveBeenCalledTimes(1)
        expect(createBlobSpy).toHaveBeenCalledWith(errorMessage, 'text/plain')
      })

      test('it should create a response with the created blob and send an Internal server to the user', () => {
        expect(createResponseSpy).toHaveBeenCalledTimes(1)
        expect(createResponseSpy).toHaveBeenCalledWith(mockBlob, 500, 'Internal Server Error')
      })
    })

    describe('an unexpected error happened', () => {
      const errorMessage = 'Unknown error'

      beforeAll(async () => {
        createBlobSpy.mockClear()
        createResponseSpy.mockClear()

        getViewSpy = jest.spyOn(request, 'getView').mockImplementation(() => Promise.reject())
        await view.fetchGrpcView(screenName, client, fetchReq)
      })

      test('it should create a blob with the error "Unknown error" as plain text', () => {
        expect(createBlobSpy).toHaveBeenCalledTimes(1)
        expect(createBlobSpy).toHaveBeenCalledWith(errorMessage, 'text/plain')
      })

      test('it should create a response with the created blob and send an Internal server to the user', () => {
        expect(createResponseSpy).toHaveBeenCalledTimes(1)
        expect(createResponseSpy).toHaveBeenCalledWith(mockBlob, 500, 'Internal Server Error')
      })
    })
  })

  afterAll(() => {
    getViewSpy.mockRestore()
    toBeagleUIElementSpy.mockRestore()
    createBlobSpy.mockRestore()
    createResponseSpy.mockRestore()
    fetchGrpcViewSpy.mockRestore()
  })
})
