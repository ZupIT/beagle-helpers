import { jest, describe, test, expect, beforeAll, afterAll, afterEach } from '@jest/globals'
import { GRPC_WEB_GIT_URL, GRPC_WEB_GO_PATH, MOD_WEB_PROXY_PATH } from '../../../src/cli/configs/constants'
import fs from 'fs'
import fsPromises from 'fs/promises'
import JestMock from 'jest-mock'
import * as shell from '../../../src/cli/utils/shell'
import * as process from '../../../src/cli/utils/process'
import { logger } from '../../../src/cli/utils/logger'
import { ExecOptions } from 'child_process'
import { installGrpcWebProxy } from '../../../src/cli/start-proxy/install-proxy'

describe('src/cli/start-proxy/install-proxy.ts', () => {
  const goPath = `${shell.getEnvVariable('GOPATH')}/${GRPC_WEB_GO_PATH}`
  let exitProcessSpy: JestMock.SpyInstance<void, any[]>

  beforeAll(() => {
    exitProcessSpy = jest.spyOn(process, 'exitProcess').mockImplementation(() => { })
    logger.disable()
  })

  describe('installGrpcWebProxy', () => {
    describe('Everything is fine', () => {
      let accessSpy: JestMock.SpyInstance<Promise<void>, [path: fs.PathLike, mode?: number]>
      let execShellCommandSpy: JestMock.SpyInstance<Promise<void>, [command: string, options?: ExecOptions]>

      beforeAll(async () => {
        accessSpy = jest.spyOn(fsPromises, 'access').mockImplementation(() => Promise.reject({ name: 'Error', message: 'Message' }))
        execShellCommandSpy = jest.spyOn(shell, 'execShellCommand').mockImplementation(() => Promise.resolve())        

        await installGrpcWebProxy()
      })

      test('It should verify if the "grpc-web" folder already exists', () => {
        expect(accessSpy).toHaveBeenCalled()
        expect(accessSpy.mock.calls[0][0]).toBe(goPath)
      })

      test('It should clone the "grpc-web" project from Github', () => {
        expect(execShellCommandSpy).toHaveBeenNthCalledWith(1, `git clone ${GRPC_WEB_GIT_URL} ${goPath}`)
      })

      test('It should use "dep init" to initialize the project dependencies, validating them', () => {
        expect(execShellCommandSpy).toHaveBeenNthCalledWith(2, 'dep init', { cwd: goPath })
      })

      test('It should ensure that the "grpc-web" dependency is installed and can work as expected, using "dep"', () => {
        expect(execShellCommandSpy).toHaveBeenNthCalledWith(3, 'dep ensure', { cwd: goPath })
      })

      test('It should install the "grpcwebproxy" go library, using "go"', () => {
        expect(execShellCommandSpy).toHaveBeenNthCalledWith(4, `go install --mod=mod ${MOD_WEB_PROXY_PATH}`, { cwd: goPath })
      })

      test('It should not exit the process when the installation was succeeded', () => {
        expect(exitProcessSpy).not.toHaveBeenCalled()
      })

      afterAll(() => {
        accessSpy.mockRestore()
        execShellCommandSpy.mockRestore()
      })
    })

    describe('"grpc-web" folder already exists', () => {
      let accessSpy: JestMock.SpyInstance<Promise<void>, [path: fs.PathLike, mode?: number]>
      let execShellCommandSpy: JestMock.SpyInstance<Promise<void>, [command: string, options?: ExecOptions]>

      beforeAll(async () => {
        accessSpy = jest.spyOn(fsPromises, 'access').mockImplementation(() => Promise.resolve())
        execShellCommandSpy = jest.spyOn(shell, 'execShellCommand').mockImplementation(() => Promise.resolve())

        await installGrpcWebProxy()
      })

      test('It should verify if the "grpc-web" folder already exists', () => {
        expect(accessSpy).toHaveBeenCalled()
        expect(accessSpy.mock.calls[0][0]).toBe(goPath)
      })

      test('It should not clone the "grpc-web" project from Github when the folder already exists', () => {
        expect(execShellCommandSpy).not.toHaveBeenNthCalledWith(1, `git clone ${GRPC_WEB_GIT_URL} ${goPath}`)
      })

      test('It should use "dep init" to initialize the project dependencies, validating them', () => {
        expect(execShellCommandSpy).toHaveBeenNthCalledWith(1, 'dep init', { cwd: goPath })
      })

      test('It should ensure that the "grpc-web" dependency is installed and can work as expected, using "dep"', () => {
        expect(execShellCommandSpy).toHaveBeenNthCalledWith(2, 'dep ensure', { cwd: goPath })
      })

      test('It should install the "grpcwebproxy" go library, using "go"', () => {
        expect(execShellCommandSpy).toHaveBeenNthCalledWith(3, `go install --mod=mod ${MOD_WEB_PROXY_PATH}`, { cwd: goPath })
      })

      test('It should not exit the process when the installation was succeeded', () => {
        expect(exitProcessSpy).not.toHaveBeenCalled()
      })

      afterAll(() => {
        accessSpy.mockRestore()
        execShellCommandSpy.mockRestore()
      })
    })

    describe('Something does not works', () => {      
      let _access: typeof fsPromises.access
      let execShellCommandSpy: JestMock.SpyInstance<Promise<void>, [command: string, options?: ExecOptions]>

      beforeAll(async () => {
        const _access = fsPromises.access
        fsPromises.access = ((null as unknown) as typeof _access)
        execShellCommandSpy = jest.spyOn(shell, 'execShellCommand').mockImplementation(() => {
          throw 'Unknown Error'
        })

        await installGrpcWebProxy()
      })

      test('It should install the "grpc-web" even if it fails to verify the folder', () => {
        expect(exitProcessSpy).toHaveBeenCalled()
      })

      test('It should exit the process when it fails to execute a command', () => {
        expect(execShellCommandSpy).toHaveBeenCalled()
        expect(exitProcessSpy).toHaveBeenCalled()
      })

      afterAll(() => {
        execShellCommandSpy.mockRestore()
        fsPromises.access = _access
      })
    })

    afterAll(() => {
      exitProcessSpy.mockRestore()
      logger.enable()
    })
  })
})
