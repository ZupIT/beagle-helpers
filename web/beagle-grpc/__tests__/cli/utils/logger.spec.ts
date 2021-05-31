import { jest, describe, test, expect, beforeAll, afterAll, afterEach } from '@jest/globals'
import chalk from 'chalk'
import JestMock from 'jest-mock'
import { logger } from '../../../src/cli/utils/logger'

describe('src/cli/utils/logger.ts', () => {
  const testMessages = ['test message', { test: 'object' }, []]
  let consoleSpy: { [key: string]: JestMock.SpyInstance<void, [message?: any, ...optionalParams: any[]]> }

  beforeAll(() => {
    consoleSpy = {
      info: jest.spyOn(console, 'info').mockImplementation((...data: any[]) => jest.fn()),
      warn: jest.spyOn(console, 'warn').mockImplementation((...data: any[]) => jest.fn()),
      error: jest.spyOn(console, 'error').mockImplementation((...data: any[]) => jest.fn())
    }
  })

  afterEach(() => {
    consoleSpy.info.mockClear()
    consoleSpy.warn.mockClear()
    consoleSpy.error.mockClear()
  })

  describe('info', () => {
    test('It should log an info and the color should be chalk.cyanBright', () => {
      logger.info(...testMessages)
      expect(consoleSpy.info).toHaveBeenCalledWith(chalk.cyanBright(...testMessages))
    })
  })

  describe('warn', () => {
    test('It should log an warn and the color should be chalk.yellowBright', () => {
      logger.warn(...testMessages)
      expect(consoleSpy.warn).toHaveBeenCalledWith(chalk.yellowBright(...testMessages))
    })
  })

  describe('error', () => {
    test('It should log an error and the color should be chalk.redBright', () => {
      logger.error(...testMessages)
      expect(consoleSpy.error).toHaveBeenCalledWith(chalk.redBright(...testMessages))
    })
  })

  describe('success', () => {
    test('It should log a success message and the color should be chalk.greenBright', () => {
      logger.success(...testMessages)
      expect(consoleSpy.info).toHaveBeenCalledWith(chalk.greenBright(...testMessages))
    })
  })

  describe('disabled/enabled', () => {
    test('It should not log any kind of message when it is disabled', () => {
      consoleSpy.info.mockReset()
      consoleSpy.warn.mockReset()
      consoleSpy.error.mockReset()

      logger.disable()

      logger.info(testMessages)
      logger.warn(testMessages)
      logger.error(testMessages)
      logger.success(testMessages)

      expect(consoleSpy.info).not.toHaveBeenCalled()
      expect(consoleSpy.warn).not.toHaveBeenCalled()
      expect(consoleSpy.error).not.toHaveBeenCalled()
    })

    test('It should log any kind of message when it is enabled', () => {
      logger.enable()

      logger.info(testMessages)
      logger.warn(testMessages)
      logger.error(testMessages)
      logger.success(testMessages)

      expect(consoleSpy.info).toHaveBeenCalledTimes(2)
      expect(consoleSpy.warn).toHaveBeenCalledTimes(1)
      expect(consoleSpy.error).toHaveBeenCalledTimes(1)
    })
  })

  afterAll(() => {
    consoleSpy.info.mockRestore()
    consoleSpy.warn.mockRestore()
    consoleSpy.error.mockRestore()
  })
})
