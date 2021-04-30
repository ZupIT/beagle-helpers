import { jest, describe, test, expect, beforeAll, afterAll, afterEach } from '@jest/globals'
import JestMock from 'jest-mock'
import { logger } from '../../../src/cli/utils/logger'
import * as validation from '../../../src/cli/start-proxy/validation'
import * as shell from '../../../src/cli/utils/shell'
import * as configs from '../../../src/cli/configs'
import * as dependencies from '../../../src/cli/utils/dependencies'
import * as proxy from '../../../src/cli/start-proxy/install-proxy'

describe('src/cli/start-proxy/validation.ts', () => {
  beforeAll(() => {
    logger.disable()
  })

  describe('validateDependencies', () => {
    describe('When everything is fine', () => {
      let envVariableExistsSpy: JestMock.SpyInstance<boolean, [variable: string]>
      let grpcDepsCommandsExistsSpy: JestMock.SpyInstance<Promise<boolean>, [dependeciesCommands?: string[]]>
      let configFileExistsSpy: JestMock.SpyInstance<Promise<boolean>, []>
      let validateDependenciesResult: boolean

      beforeAll(async () => {
        envVariableExistsSpy = jest.spyOn(shell, 'envVariableExists').mockImplementation(() => true)
        grpcDepsCommandsExistsSpy = jest.spyOn(dependencies, 'grpcDepsCommandsExists').mockImplementation(() => Promise.resolve(true))
        configFileExistsSpy = jest.spyOn(configs, 'configFileExists').mockImplementation(() => Promise.resolve(true))
        validateDependenciesResult = await validation.validateDependencies()
      })

      test('It should validate if the "GOPATH" exsists', () => {
        expect(envVariableExistsSpy).toHaveBeenCalledTimes(1)
        expect(envVariableExistsSpy).toHaveBeenCalledWith('GOPATH')
      })

      test('It should validate if the commands "git", "go", "dep", "protoc" exists using method the "grpcDepsCommandsExists"', () => {
        expect(grpcDepsCommandsExistsSpy).toHaveBeenCalledTimes(1)
      })

      test('It should validate if the config file exists', () => {
        expect(configFileExistsSpy).toHaveBeenCalledTimes(1)
      })

      test('It should resolve when everything is fine', () => {
        expect(validateDependenciesResult).toBe(true)
      })

      afterAll(() => {
        envVariableExistsSpy.mockRestore()
        grpcDepsCommandsExistsSpy.mockRestore()
        configFileExistsSpy.mockRestore()
      })
    })

    describe('When some things are not ', () => {
      let envVariableExistsSpy: JestMock.SpyInstance<boolean, [variable: string]>
      let grpcDepsCommandsExistsSpy: JestMock.SpyInstance<Promise<boolean>, [dependeciesCommands?: string[]]>
      let configFileExistsSpy: JestMock.SpyInstance<Promise<boolean>, []>
      let validateDependenciesResult: boolean
      let errorSpy: JestMock.SpyInstance<void, any[]>

      beforeAll(async () => {
        envVariableExistsSpy = jest.spyOn(shell, 'envVariableExists').mockImplementation(() => false)
        grpcDepsCommandsExistsSpy = jest.spyOn(dependencies, 'grpcDepsCommandsExists').mockImplementation(() => Promise.resolve(true))
        configFileExistsSpy = jest.spyOn(configs, 'configFileExists').mockImplementation(() => Promise.resolve(false))
        errorSpy = jest.spyOn(logger, 'error')
        validateDependenciesResult = await validation.validateDependencies()
      })

      test('It should validate if the "GOPATH" exsists', () => {
        expect(envVariableExistsSpy).toHaveBeenCalledTimes(1)
        expect(envVariableExistsSpy).toHaveBeenCalledWith('GOPATH')
      })

      test('It should validate if the commands "git", "go", "dep", "protoc" exists using method the "grpcDepsCommandsExists"', () => {
        expect(grpcDepsCommandsExistsSpy).toHaveBeenCalledTimes(1)
      })

      test('It should validate if the config file exists', () => {
        expect(configFileExistsSpy).toHaveBeenCalledTimes(1)
      })

      test('It should resolve when everything is fine', () => {
        expect(validateDependenciesResult).toBe(false)
      })

      test('It should log as errors the missing depencies', () => {
        expect(errorSpy).toHaveBeenCalledTimes(1)
        expect(errorSpy.mock.calls[0].length).toBe(2)
      })

      afterAll(() => {
        envVariableExistsSpy.mockRestore()
        grpcDepsCommandsExistsSpy.mockRestore()
        configFileExistsSpy.mockRestore()
        errorSpy.mockRestore()
      })
    })
  })

  describe('verifyProxy', () => {
    describe('When the proxy library is already installed', () => {
      let pathCommandExistsSpy: JestMock.SpyInstance<Promise<boolean>, [command: string]>
      let installGrpcWebProxySpy: JestMock.SpyInstance<Promise<void>, []>

      beforeAll(async () => {
        pathCommandExistsSpy = jest.spyOn(shell, 'pathCommandExists').mockImplementation(() => Promise.resolve(true))
        installGrpcWebProxySpy = jest.spyOn(proxy, 'installGrpcWebProxy')

        await validation.verifyProxy()
      })

      test('It should verify if "grpcwebproxy" library is installed using "pathCommandExists"', () => {
        expect(pathCommandExistsSpy).toHaveBeenCalledTimes(1)
        expect(pathCommandExistsSpy).toHaveBeenCalledWith('grpcwebproxy')
      })

      test('It should not install the "grpcwebproxy" libraries', () => {
        expect(installGrpcWebProxySpy).not.toHaveBeenCalled()
      })

      afterAll(() => {
        pathCommandExistsSpy.mockRestore()
        installGrpcWebProxySpy.mockRestore()
      })
    })

    describe('When the proxy library is not installed', () => {
      let pathCommandExistsSpy: JestMock.SpyInstance<Promise<boolean>, [command: string]>
      let installGrpcWebProxySpy: JestMock.SpyInstance<Promise<void>, []>

      beforeAll(async () => {
        pathCommandExistsSpy = jest.spyOn(shell, 'pathCommandExists').mockImplementation(() => Promise.resolve(false))
        installGrpcWebProxySpy = jest.spyOn(proxy, 'installGrpcWebProxy').mockImplementation(() => Promise.resolve())

        await validation.verifyProxy()
      })

      test('It should verify if "grpcwebproxy" library is installed using "pathCommandExists"', () => {
        expect(pathCommandExistsSpy).toHaveBeenCalledTimes(1)
        expect(pathCommandExistsSpy).toHaveBeenCalledWith('grpcwebproxy')
      })

      test('It should install the "grpcwebproxy" libraries when it does not exists, using "installGrpcWebProxy"', () => {
        expect(installGrpcWebProxySpy).toHaveBeenCalled()
      })

      afterAll(() => {
        pathCommandExistsSpy.mockRestore()
        installGrpcWebProxySpy.mockRestore()
      })
    })
  })

  afterAll(() => {
    logger.enable()
  })
})
