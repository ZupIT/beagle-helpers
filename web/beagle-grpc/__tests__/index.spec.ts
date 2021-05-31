import { jest, describe, test, expect } from '@jest/globals'
import { BeagleGrpcClientOptions } from '../src/lib/models/client-options'
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

jest.mock('../src/lib/client')
import * as Client from '../src/lib/client'

import { usingBeagleGrpcClient } from '../src'

describe('src/index.ts', () => {
  describe('usingBeagleGrpcClient', () => {
    test('Should start using Beagle Client gRPC with the options defined by the developer', () => {
      let options = {} as BeagleGrpcClientOptions
      const defaultOptions: BeagleGrpcClientOptions = { proxyAddress: '', redirectGrpcFrom: 'grpc://', customHttpClient: fetch }
      const createClientSpy = jest.spyOn(Client, 'createClient')

      usingBeagleGrpcClient(options)

      expect(createClientSpy).toHaveBeenCalledWith(defaultOptions)

      options = {
        proxyAddress: 'http://localhost:9000/'
      }

      usingBeagleGrpcClient(options)

      expect(createClientSpy).toHaveBeenCalledWith({ ...defaultOptions, ...options })
      
      options = {
        proxyAddress: 'http://localhost:6692/',
        redirectGrpcFrom: 'test-grpc://',
        customHttpClient: fetch
      }

      usingBeagleGrpcClient(options)

      expect(createClientSpy).toHaveBeenCalledWith(options)  
    })
  })
})
