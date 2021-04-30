import { jest, describe, test, expect, beforeAll, afterAll } from '@jest/globals'
import JestMock from 'jest-mock'
import { mockProcessExit } from 'jest-mock-process'
import { logger } from '../../../src/cli/utils/logger'

const mockExit = mockProcessExit()

import { exitProcess } from '../../../src/cli/utils/process'

describe('src/cli/utils/process.ts', () => {
  let errorSpy: JestMock.SpyInstance<void, any[]>

  beforeAll(() => {
    errorSpy = jest.spyOn(logger, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    mockExit.mockClear()
  })

  describe('exitProcess', () => {
    test('It should exit the process successfully without error code when no error message is provided', () => {
      exitProcess()
      expect(errorSpy).not.toHaveBeenCalled()
      expect(mockExit).toHaveBeenCalledTimes(1)
      expect(mockExit.mock.calls[0].length).toBe(0)
    })

    test('It should log error messages, separately, before exiting', () => {
      const errors = ['test', { message: 'error message' }, 2]
      exitProcess(...errors)
      expect(errorSpy).toHaveBeenCalledTimes(3)
      
      expect(errorSpy).toHaveBeenNthCalledWith(1, errors[0])
      expect(errorSpy).toHaveBeenNthCalledWith(2, errors[1])
      expect(errorSpy).toHaveBeenNthCalledWith(3, errors[2])
      
      expect(mockExit).toHaveBeenCalledTimes(1)
      expect(mockExit).toHaveBeenCalledWith(1)
      expect(mockExit.mock.calls[0].length).toBe(1)
    })
  })

  afterAll(() => {
    errorSpy.mockRestore()
    mockExit.mockRestore()
  })
})
