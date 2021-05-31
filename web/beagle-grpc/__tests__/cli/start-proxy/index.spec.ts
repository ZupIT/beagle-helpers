import { jest, describe, test, expect, beforeAll, afterAll, afterEach } from '@jest/globals'
import JestMock from 'jest-mock'
import { ExecOptions } from 'child_process'
import { logger } from '../../../src/cli/utils/logger'
import { BeagleGrpcConfig } from '../../../src/cli/configs/models/configs'
import * as configs from '../../../src/cli/configs'
import * as process from '../../../src/cli/utils/process'
import * as shell from '../../../src/cli/utils/shell'
import * as validation from '../../../src/cli/start-proxy/validation'
import { startProxy } from '../../../src/cli/start-proxy'

describe('src/cli/start-proxy/index.ts', () => {
  beforeAll(() => {
    logger.disable()
  })

  describe('startProxy', () => {
    describe('Everything is fine', () => {
      let validateDependenciesSpy: JestMock.SpyInstance<Promise<boolean>, []>
      let verifyProxySpy: JestMock.SpyInstance<Promise<void>, []>
      let getConfigsSpy: JestMock.SpyInstance<Promise<BeagleGrpcConfig | undefined>, [mode: string]>
      let execShellCommandSpy: JestMock.SpyInstance<Promise<void>, [command: string, options?: ExecOptions]>

      const configsMock: BeagleGrpcConfig | undefined = {
        mode: 'development',
        grpcBackendAddress: 'localhost:50051',
        tlsCertificatePath: '',
        tlsKeyPath: '',
        runProxyOnPort: 8081
      }

      beforeAll(async () => {
        validateDependenciesSpy = jest.spyOn(validation, 'validateDependencies').mockImplementation(() => Promise.resolve(true))
        verifyProxySpy = jest.spyOn(validation, 'verifyProxy').mockImplementation(() => Promise.resolve())
        getConfigsSpy = jest.spyOn(configs, 'getConfigs').mockImplementation((mode: string) => Promise.resolve(configsMock))
        execShellCommandSpy = jest.spyOn(shell, 'execShellCommand').mockImplementation(() => Promise.resolve())

        await startProxy({ mode: configsMock.mode })
      })

      test('It should get the configs for the desired mode', () => {
        expect(getConfigsSpy).toHaveBeenCalledTimes(1)
      })

      test('It should validate that all dependencies are fine', () => {
        expect(validateDependenciesSpy).toHaveBeenCalledTimes(1)
      })

      test('It should validate that the proxy exists', () => {
        expect(verifyProxySpy).toHaveBeenCalledTimes(1)
      })

      test('It should start the "grpcwebproxy"', () => {
        expect(execShellCommandSpy).toHaveBeenCalledTimes(1)
        expect(execShellCommandSpy).toHaveBeenCalledWith(`grpcwebproxy --backend_addr=${configsMock.grpcBackendAddress} --allow_all_origins --run_tls_server=false --server_http_debug_port=${configsMock.runProxyOnPort}`)
      })

      afterAll(() => {
        validateDependenciesSpy.mockRestore()
        verifyProxySpy.mockRestore()
        getConfigsSpy.mockRestore()
        execShellCommandSpy.mockRestore()
      })
    })

    describe('Everything is fine with TLS', () => {
      let validateDependenciesSpy: JestMock.SpyInstance<Promise<boolean>, []>
      let verifyProxySpy: JestMock.SpyInstance<Promise<void>, []>
      let getConfigsSpy: JestMock.SpyInstance<Promise<BeagleGrpcConfig | undefined>, [mode: string]>
      let execShellCommandSpy: JestMock.SpyInstance<Promise<void>, [command: string, options?: ExecOptions]>

      const configsMock: BeagleGrpcConfig | undefined = {
        mode: 'development',
        grpcBackendAddress: 'localhost:50059',
        tlsCertificatePath: '/path/to/tls/certificate',
        tlsKeyPath: '/path/to/tls/key',
        runProxyOnPort: 8081
      }

      beforeAll(async () => {
        validateDependenciesSpy = jest.spyOn(validation, 'validateDependencies').mockImplementation(() => Promise.resolve(true))
        verifyProxySpy = jest.spyOn(validation, 'verifyProxy').mockImplementation(() => Promise.resolve())
        getConfigsSpy = jest.spyOn(configs, 'getConfigs').mockImplementation((mode: string) => Promise.resolve(configsMock))
        execShellCommandSpy = jest.spyOn(shell, 'execShellCommand').mockImplementation(() => Promise.resolve())

        await startProxy({ mode: configsMock.mode })
      })

      test('It should get the configs for the desired mode', () => {
        expect(getConfigsSpy).toHaveBeenCalledTimes(1)
      })
      test('It should validate that all dependencies are fine', () => {
        expect(validateDependenciesSpy).toHaveBeenCalledTimes(1)
      })

      test('It should validate that the proxy exists', () => {
        expect(verifyProxySpy).toHaveBeenCalledTimes(1)
      })
      test('It should start the "grpcwebproxy"', () => {
        expect(execShellCommandSpy).toHaveBeenCalledTimes(1)
        expect(execShellCommandSpy).toHaveBeenCalledWith(`grpcwebproxy --backend_addr=${configsMock.grpcBackendAddress} --allow_all_origins --server_tls_cert_file=${configsMock.tlsCertificatePath} --server_tls_key_file=${configsMock.tlsKeyPath} --server_http_debug_port=${configsMock.runProxyOnPort}`)
      })

      afterAll(() => {
        validateDependenciesSpy.mockRestore()
        verifyProxySpy.mockRestore()
        getConfigsSpy.mockRestore()
        execShellCommandSpy.mockRestore()
      })
    })

    describe('Configuration does not exists', () => {
      let validateDependenciesSpy: JestMock.SpyInstance<Promise<boolean>, []>
      let verifyProxySpy: JestMock.SpyInstance<Promise<void>, []>
      let getConfigsSpy: JestMock.SpyInstance<Promise<BeagleGrpcConfig | undefined>, [mode: string]>
      let execShellCommandSpy: JestMock.SpyInstance<Promise<void>, [command: string, options?: ExecOptions]>
      let exitProcessSpy: JestMock.SpyInstance<void, any[]>

      const configsMock: BeagleGrpcConfig | undefined = {
        mode: 'development',
        grpcBackendAddress: 'localhost:50051',
        tlsCertificatePath: '',
        tlsKeyPath: '',
        runProxyOnPort: 8081
      }

      beforeAll(async () => {
        validateDependenciesSpy = jest.spyOn(validation, 'validateDependencies').mockImplementation(() => Promise.resolve(true))
        verifyProxySpy = jest.spyOn(validation, 'verifyProxy').mockImplementation(() => Promise.resolve())
        getConfigsSpy = jest.spyOn(configs, 'getConfigs').mockImplementation((mode: string) => Promise.resolve(undefined))
        execShellCommandSpy = jest.spyOn(shell, 'execShellCommand').mockImplementation(() => Promise.resolve())
        exitProcessSpy = jest.spyOn(process, 'exitProcess').mockImplementation(() => { })

        await startProxy({ mode: configsMock.mode })
      })

      test('It should exit the process and warn the user that the configuration does not exists', () => {
        expect(getConfigsSpy).toHaveBeenCalled()
        expect(exitProcessSpy).toHaveBeenCalled()
        expect(exitProcessSpy.mock.calls[0][0]).toEqual(new Error(`Configuration for the mode "${configsMock.mode}" does not exists`))
      })

      test('It should not proceed on any other method', () => {
        expect(validateDependenciesSpy).not.toHaveBeenCalled()
        expect(verifyProxySpy).not.toHaveBeenCalled()
        expect(execShellCommandSpy).not.toHaveBeenCalled()
      })

      afterAll(() => {
        validateDependenciesSpy.mockRestore()
        verifyProxySpy.mockRestore()
        getConfigsSpy.mockRestore()
        execShellCommandSpy.mockRestore()
        exitProcessSpy.mockRestore()
      })
    })

    describe('Dependencies are not fine', () => {
      let validateDependenciesSpy: JestMock.SpyInstance<Promise<boolean>, []>
      let verifyProxySpy: JestMock.SpyInstance<Promise<void>, []>
      let getConfigsSpy: JestMock.SpyInstance<Promise<BeagleGrpcConfig | undefined>, [mode: string]>
      let execShellCommandSpy: JestMock.SpyInstance<Promise<void>, [command: string, options?: ExecOptions]>
      let exitProcessSpy: JestMock.SpyInstance<void, any[]>

      const configsMock: BeagleGrpcConfig | undefined = {
        mode: 'development',
        grpcBackendAddress: 'localhost:50051',
        tlsCertificatePath: '',
        tlsKeyPath: '',
        runProxyOnPort: 8081
      }

      beforeAll(async () => {
        validateDependenciesSpy = jest.spyOn(validation, 'validateDependencies').mockImplementation(() => Promise.resolve(false))
        verifyProxySpy = jest.spyOn(validation, 'verifyProxy').mockImplementation(() => Promise.resolve())
        getConfigsSpy = jest.spyOn(configs, 'getConfigs').mockImplementation((mode: string) => Promise.resolve(configsMock))
        execShellCommandSpy = jest.spyOn(shell, 'execShellCommand').mockImplementation(() => Promise.resolve())
        exitProcessSpy = jest.spyOn(process, 'exitProcess').mockImplementation(() => { })

        await startProxy({ mode: configsMock.mode })
      })

      test('It should get the configs for the desired mode', () => {
        expect(getConfigsSpy).toHaveBeenCalledTimes(1)
      })

      test('It should exit the process and warn the user when dependencies are not fine', () => {
        expect(validateDependenciesSpy).toHaveBeenCalled()
        expect(exitProcessSpy).toHaveBeenCalled()
        expect(exitProcessSpy.mock.calls[0][0]).toEqual(new Error('Not all dependencies are installed'))
      })

      test('It should not proceed on any other method', () => {
        expect(verifyProxySpy).not.toHaveBeenCalled()
        expect(execShellCommandSpy).not.toHaveBeenCalled()
      })

      afterAll(() => {
        validateDependenciesSpy.mockRestore()
        verifyProxySpy.mockRestore()
        getConfigsSpy.mockRestore()
        execShellCommandSpy.mockRestore()
        exitProcessSpy.mockRestore()
      })
    })

    describe('Something unexpected happens', () => {
      let validateDependenciesSpy: JestMock.SpyInstance<Promise<boolean>, []>
      let verifyProxySpy: JestMock.SpyInstance<Promise<void>, []>
      let getConfigsSpy: JestMock.SpyInstance<Promise<BeagleGrpcConfig | undefined>, [mode: string]>
      let execShellCommandSpy: JestMock.SpyInstance<Promise<void>, [command: string, options?: ExecOptions]>
      let exitProcessSpy: JestMock.SpyInstance<void, any[]>

      const configsMock: BeagleGrpcConfig | undefined = {
        mode: 'development',
        grpcBackendAddress: 'localhost:50051',
        tlsCertificatePath: '',
        tlsKeyPath: '',
        runProxyOnPort: 8081
      }

      beforeAll(async () => {
        validateDependenciesSpy = jest.spyOn(validation, 'validateDependencies').mockImplementation(() => Promise.resolve(true))
        verifyProxySpy = jest.spyOn(validation, 'verifyProxy').mockImplementation(() => Promise.resolve())
        getConfigsSpy = jest.spyOn(configs, 'getConfigs').mockImplementation((mode: string) => Promise.resolve(configsMock))
        execShellCommandSpy = jest.spyOn(shell, 'execShellCommand').mockImplementation(() => { throw new Error('Unexpected error') })
        exitProcessSpy = jest.spyOn(process, 'exitProcess').mockImplementation(() => {})

        await startProxy({ mode: configsMock.mode })
      })

      test('It should get the configs for the desired mode', () => {
        expect(getConfigsSpy).toHaveBeenCalledTimes(1)
      })

      test('It should validate that all dependencies are fine', () => {
        expect(validateDependenciesSpy).toHaveBeenCalledTimes(1)
      })

      test('It should validate that the proxy exists', () => {
        expect(verifyProxySpy).toHaveBeenCalledTimes(1)
      })

      test('It should try to start the "grpcwebproxy"', () => {
        expect(execShellCommandSpy).toHaveBeenCalledTimes(1)
      })

      test('It should exit the process when something unexpected happen', () => {
        expect(exitProcessSpy).toHaveBeenCalledTimes(1)
        expect(exitProcessSpy.mock.calls[0][0]).toEqual(new Error('Unexpected error'))
      })

      afterAll(() => {
        validateDependenciesSpy.mockRestore()
        verifyProxySpy.mockRestore()
        getConfigsSpy.mockRestore()
        execShellCommandSpy.mockRestore()
        exitProcessSpy.mockRestore()
      })
    })
  })

  afterAll(() => {
    logger.enable()
  })
})