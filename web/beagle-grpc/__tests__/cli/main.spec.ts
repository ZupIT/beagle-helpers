import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals'
import commander from 'commander'
import JestMock from 'jest-mock'
import figlet from 'figlet'
import { logger } from '../../src/cli/utils'
import * as program from '../../src/cli/program'
import { main } from '../../src/cli/main'

describe('src/cli/main.ts', () => {
  const commandProto = commander.Command.prototype
  const commandOriginalProto = Object.assign({}, commander.Command.prototype)
  const propsToMock = ['action', 'command', 'version', 'option', 'usage', 'description', 'alias', 'name']

  let _commands_: Record<string, JestMock.Mock<unknown, unknown[]>>

  beforeAll(() => {
    const getNewMockedImplementation = () => jest.fn().mockImplementation((...args) => new commander.Command())
    _commands_ = propsToMock.reduce((result, key) => ({ ...result, [key]: commandProto[key] = getNewMockedImplementation() }), {})
    _commands_.parseAsync = commandProto.parseAsync = jest.fn().mockImplementation((...args) => Promise.resolve(new commander.Command()))
  })

  describe('main', () => {
    const textSyncMock = (txt: string, options: figlet.Options) => txt
    const commandMock = { parseAsync: jest.fn().mockImplementation(() => Promise.resolve({  } as commander.Command)) } 

    let infoSpy: JestMock.SpyInstance<any, any[]>
    let textSyncSpy: JestMock.SpyInstance<string, [txt: string, options: figlet.Options]>
    let createProgramCLISpy: JestMock.SpyInstance<commander.Command, []>

    beforeAll(async () => {
      logger.disable()

      infoSpy = jest.spyOn(logger, 'info').mockImplementation((...args) => {})
      textSyncSpy = jest.spyOn(figlet, 'textSync').mockImplementation(textSyncMock)
      createProgramCLISpy = jest.spyOn(program, 'createProgramCLI').mockImplementation(() => commandMock as any)

      await main()
    })

    test('it should clear the current terminal', () => {
    })

    test('it should identify the cli on the terminal with a fancy title', () => {
      expect(infoSpy).toHaveBeenCalledTimes(1)
      expect(infoSpy).toHaveBeenCalledWith('beagle-web-grpc')

      expect(textSyncSpy).toHaveBeenCalledTimes(1)
      expect(textSyncSpy).toHaveBeenCalledWith('beagle-web-grpc', { horizontalLayout: 'fitted' })
    })

    test('it should call "createProgramCLI" to get the program', () => {
      expect(createProgramCLISpy).toHaveBeenCalledTimes(1)
    })

    test('it should call the commander parser asynchronously', () => {
      expect(commandMock.parseAsync).toHaveBeenCalledTimes(1)
      expect(commandMock.parseAsync).toHaveBeenCalledWith(process.argv)
    })

    afterAll(() => {
      infoSpy.mockRestore()
      textSyncSpy.mockRestore()
      createProgramCLISpy.mockRestore()
      logger.enable()
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