import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals'
import commander from 'commander'
import JestMock from 'jest-mock'
import * as init from '../../src/cli/init'
import * as proxy from '../../src/cli/start-proxy'
import * as program from '../../src/cli/program'

describe('src/cli/program.ts', () => {
  const commandProto = commander.Command.prototype
  const commandOriginalProto = Object.assign({}, commander.Command.prototype)
  const propsToMock = ['action', 'command', 'version', 'option', 'usage', 'description', 'alias', 'name']

  let _commands_: Record<string, JestMock.Mock<unknown, unknown[]>>

  beforeAll(() => {
    const getNewMockedImplementation = () => jest.fn().mockImplementation((...args) => new commander.Command())
    _commands_ = propsToMock.reduce((result, key) => ({ ...result, [key]: commandProto[key] = getNewMockedImplementation() }), {})
    _commands_.parseAsync = commandProto.parseAsync = jest.fn().mockImplementation((...args) => Promise.resolve(new commander.Command()))
  })

  describe('createProgramCLI', () => {       
    let initSpy: JestMock.SpyInstance<Promise<void>, []>
    let startProxySpy: JestMock.SpyInstance<Promise<void>, [options: proxy.StartProxyOptions]>
    let _program_: commander.Command

    beforeAll(() => {
      initSpy = jest.spyOn(init, 'init').mockImplementation(() => Promise.resolve())
      startProxySpy = jest.spyOn(proxy, 'startProxy').mockImplementation((options: proxy.StartProxyOptions) => Promise.resolve())

      _program_ = program.createProgramCLI()
    })

    describe('CLI creation', () => {
      test('it should create the cli command as "beagle-web-grpc"', () => {
        expect(_commands_.name).toHaveBeenCalledTimes(1)
        expect(_commands_.name).toHaveBeenCalledWith('beagle-web-grpc')
      })

      test('it should describe the cli', () => {
        expect(_commands_.description).toHaveBeenNthCalledWith(1, 'A GRPC support lib for Beagle Web with CLI')
      })

      test('it should provide an usage command', () => {
        expect(_commands_.usage).toHaveBeenCalledTimes(1)
        expect(_commands_.usage).toHaveBeenCalledWith('[global options] command')
      })

      test('it should have an version', () => {
        expect(_commands_.version).toHaveBeenCalledTimes(1)
      })

      describe('Commands', () => {
        describe('init', () => {
          test('it should create a command named "init"', () => {
            expect(_commands_.command).toHaveBeenNthCalledWith(1, 'init')
          })

          test('it should create an alias for this command to be easier to write', () => {
            expect(_commands_.alias).toHaveBeenNthCalledWith(1, 'i')
          })

          test('it should describe the command', () => {
            expect(_commands_.description).toHaveBeenNthCalledWith(2, 'Create the configuration file for the GRPC Support')
          })

          test('it should set the method "init()" from "src/cli/init/index.ts" as action for this command', () => {
            expect(_commands_.action).toHaveBeenNthCalledWith(1, init.init)
          })
        })

        describe('start-proxy', () => {
          test('it should create a command named "start-proxy"', () => {
            expect(_commands_.command).toHaveBeenNthCalledWith(2, 'start-proxy')
          })

          test('it should create an alias for this command to be easier to write', () => {
            expect(_commands_.alias).toHaveBeenNthCalledWith(2, 'spx')
          })

          describe('option mode to execute on a specific configuration', () => {
            test('it should create the option with the "option" method of "commander"', () => {
              expect(_commands_.option).toHaveBeenCalled()
            })

            test('it should provide the option named "-m --mode <mode>"', () => {
              expect(_commands_.option.mock.calls[0][0]).toBe('-m, --mode <mode>')
            })

            test('it should describe the option to be used on the "usage"', () => {
              expect(_commands_.option.mock.calls[0][1]).toBe('set the mode to be used on the configuration file')
            })

            test('it should have "development as the default value of this option"', () => {
              expect(_commands_.option.mock.calls[0][2]).toBe('development')
            })
          })

          test('it should describe the command', () => {
            expect(_commands_.description).toHaveBeenNthCalledWith(3, 'It starts the gRPC proxy to handle the requests between your gRPC server and your Beagle Web Frontend (you must have the required dependencies and other ones will be installed automatically if not found)')
          })

          test('it should set the method "startProxy()" from "src/cli/start-proxy/index.ts" as action for this command', () => {
            expect(_commands_.action).toHaveBeenNthCalledWith(2, proxy.startProxy)
          })
        })
      })

      test('it should have available two commands', () => {
        expect(_commands_.command).toHaveBeenCalledTimes(2)
      })

      test('it should have defined an alias for the cli and the two commands', () => {
        expect(_commands_.alias).toHaveBeenCalledTimes(2)
      })

      test('it should have defined the description for the cli and the two commands', () => {
        expect(_commands_.description).toHaveBeenCalledTimes(3)
      })

      test('it should have defined an action for each of the two commands', () => {
        expect(_commands_.action).toHaveBeenCalledTimes(2)
      })

      test('it should have called "option" only one time for "start-proxy"', () => {
        expect(_commands_.option).toHaveBeenCalledTimes(1)
      })
    })

    test('it should return a "commander.Command" program', () => {
      expect(_program_ instanceof commander.Command).toBeTruthy()
    })

    afterAll(() => {
      initSpy.mockRestore()
      startProxySpy.mockRestore()
    })
  })

  afterAll(() => {
    propsToMock.forEach(key => {
      commandProto[key].mockRestore()
      _commands_[key].mockRestore()
    })

    propsToMock.forEach(key => {
      commandProto[key] = commandOriginalProto[key]
    })
  })
})
