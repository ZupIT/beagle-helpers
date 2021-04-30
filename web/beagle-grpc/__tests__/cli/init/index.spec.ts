import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals'
import * as configs from '../../../src/cli/configs'
import { init } from '../../../src/cli/init'
import JestMock from 'jest-mock'
import { logger } from '../../../src/cli/utils/logger'
import { mockProcessExit } from 'jest-mock-process'
import * as dependencies from '../../../src/cli/utils/dependencies'
import * as shell from '../../../src/cli/utils/shell'
import * as process from '../../../src/cli/utils/process'

mockProcessExit()

describe('src/cli/init/index.ts', () => {
  beforeAll(() => {
    logger.disable()
  })

  describe('init', () => {
    describe('Configuration file does not exists', () => {
      let configFileExistsSpy: JestMock.SpyInstance<Promise<boolean>, []>
      let createNewConfigurationFileSpy: JestMock.SpyInstance<Promise<boolean>, []>
      let grpcDepsCommandsExistsSpy: JestMock.SpyInstance<Promise<boolean>, [dependeciesCommands?: string[]]>
      let envVariableExistsSpy: JestMock.SpyInstance<boolean, [variable: string]>
      let warnSpy: JestMock.SpyInstance<void, any[]>
      let exitProcessSpy: JestMock.SpyInstance<void, any[]>

      beforeAll(async () => {
        configFileExistsSpy = jest.spyOn(configs, 'configFileExists').mockImplementation(() => Promise.resolve(false))
        createNewConfigurationFileSpy = jest.spyOn(configs, 'createNewConfigurationFile').mockImplementation(() => Promise.resolve(true))
        grpcDepsCommandsExistsSpy = jest.spyOn(dependencies, 'grpcDepsCommandsExists').mockImplementation(() => Promise.resolve(true))
        envVariableExistsSpy = jest.spyOn(shell, 'envVariableExists').mockImplementation(() => true)
        warnSpy = jest.spyOn(logger, 'warn')
        exitProcessSpy = jest.spyOn(process, 'exitProcess').mockImplementation(() => true)
        
        await init()
      })

      test('It should verify if the configuration file exists', () => {
        expect(configFileExistsSpy).toBeCalledTimes(1)
      })

      test('It should create a new configuration file', () => {
        expect(createNewConfigurationFileSpy).toBeCalledTimes(1)
      })

      test('It should call grpcDepsCommandsExists to verify the library external dependencies', () => {
        expect(grpcDepsCommandsExistsSpy).toBeCalledTimes(1)
      })

      test('It should verify if the global env var "GOPATH" is defined', () => {
        expect(envVariableExistsSpy).toBeCalledTimes(1)
        expect(envVariableExistsSpy).toBeCalledWith('GOPATH')
      })
      
      test('It should warn the user about "GOPATH"', () => {
        expect(warnSpy).not.toHaveBeenCalled()
      })

      test('It should exit the process after all done', () => {
        expect(exitProcessSpy).toBeCalledTimes(1)
      })

      afterAll(() => {
        configFileExistsSpy.mockRestore()
        createNewConfigurationFileSpy.mockRestore()
        grpcDepsCommandsExistsSpy.mockRestore()
        envVariableExistsSpy.mockRestore()
        exitProcessSpy.mockRestore()
        warnSpy.mockRestore()
      })
    })

    describe('Configuration file exists', () => {
      let configFileExistsSpy: JestMock.SpyInstance<Promise<boolean>, []>
      let exitProcessSpy: JestMock.SpyInstance<void, any[]>

      beforeAll(async () => {
        configFileExistsSpy = jest.spyOn(configs, 'configFileExists').mockImplementation(() => Promise.resolve(true))
        exitProcessSpy = jest.spyOn(process, 'exitProcess').mockImplementation(() => true)
        
        await init()
      })

      test('It should check if the file already exists', () => {
        expect(configFileExistsSpy).toBeCalledTimes(1)
      })

      test('It should exit the process if the configuration file already exists', () => {
        expect(exitProcessSpy).toBeCalledTimes(1)
        expect(exitProcessSpy).toHaveBeenCalledWith('Configuration file already exists!')
      })      

      afterAll(() => {
        configFileExistsSpy.mockRestore()
        exitProcessSpy.mockRestore()
      })
    })

    describe('Failed to create a new configuration file', () => {
      let configFileExistsSpy: JestMock.SpyInstance<Promise<boolean>, []>
      let createNewConfigurationFileSpy: JestMock.SpyInstance<Promise<boolean>, []>
      let exitProcessSpy: JestMock.SpyInstance<void, any[]>

      beforeAll(async () => {
        configFileExistsSpy = jest.spyOn(configs, 'configFileExists').mockImplementation(() => Promise.resolve(false))
        createNewConfigurationFileSpy = jest.spyOn(configs, 'createNewConfigurationFile').mockImplementation(() => Promise.resolve(false))
        exitProcessSpy = jest.spyOn(process, 'exitProcess').mockImplementation(() => true)
        
        await init()
      })

      test('It should check if the file already exists', () => {
        expect(configFileExistsSpy).toBeCalledTimes(1)
      })

      test('It should try to create a new configuration file', () => {
        expect(createNewConfigurationFileSpy).toBeCalledTimes(1)
      })      

      test('It should exit the process if was not possible to create a new configuration file', () => {
        expect(exitProcessSpy).toBeCalledTimes(1)
        expect(exitProcessSpy).toHaveBeenCalledWith('Unable to create the configuration file!')
      })

      afterAll(() => {
        configFileExistsSpy.mockRestore()
        createNewConfigurationFileSpy.mockRestore()
        exitProcessSpy.mockRestore()
      })
    })

    describe('Warn user about "GOPATH"', () => {
      let configFileExistsSpy: JestMock.SpyInstance<Promise<boolean>, []>
      let createNewConfigurationFileSpy: JestMock.SpyInstance<Promise<boolean>, []>
      let grpcDepsCommandsExistsSpy: JestMock.SpyInstance<Promise<boolean>, [dependeciesCommands?: string[]]>
      let envVariableExistsSpy: JestMock.SpyInstance<boolean, [variable: string]>
      let warnSpy: JestMock.SpyInstance<void, any[]>

      beforeAll(async () => {
        configFileExistsSpy = jest.spyOn(configs, 'configFileExists').mockImplementation(() => Promise.resolve(false))
        createNewConfigurationFileSpy = jest.spyOn(configs, 'createNewConfigurationFile').mockImplementation(() => Promise.resolve(true))
        grpcDepsCommandsExistsSpy = jest.spyOn(dependencies, 'grpcDepsCommandsExists').mockImplementation(() => Promise.resolve(true))
        envVariableExistsSpy = jest.spyOn(shell, 'envVariableExists').mockImplementation(() => false)
        warnSpy = jest.spyOn(logger, 'warn')
        
        await init()
      })

      test('It should verify if the global env var "GOPATH" is defined', () => {
        expect(envVariableExistsSpy).toBeCalledTimes(1)
        expect(envVariableExistsSpy).toBeCalledWith('GOPATH')
      })
      
      test('It should warn the user about "GOPATH"', () => {
        expect(warnSpy).toHaveBeenCalled()
      })

      afterAll(() => {
        configFileExistsSpy.mockRestore()
        createNewConfigurationFileSpy.mockRestore()
        grpcDepsCommandsExistsSpy.mockRestore()
        envVariableExistsSpy.mockRestore()
        warnSpy.mockRestore()
      })
    })
  })

  afterAll(() => {
    logger.enable()
  })
})
