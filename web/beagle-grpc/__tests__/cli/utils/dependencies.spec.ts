import { jest, describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals'
import { logger } from '../../../src/cli/utils/logger'
import { grpcDepsCommandsExists } from '../../../src/cli/utils/dependencies'
import * as shell from '../../../src/cli/utils/shell'
import JestMock from 'jest-mock'
import * as constants from '../../../src/cli/configs/constants'

const mockConfig = (constants as unknown) as { REQUIRED_DEPENDENCIES: string[], grpcDepsCommandsExists: (dependeciesCommands?: string[]) => Promise<boolean> }

describe('src/cli/utils/dependencies.ts', () => {
  let pathCommandExistsSpy: JestMock.SpyInstance<Promise<boolean>, [command: string]>

  beforeAll(() => {
    logger.disable()
    pathCommandExistsSpy = jest.spyOn(shell, 'pathCommandExists')
  })

  describe('grpcDepsCommandsExists', () => {
    afterEach(() => {
      pathCommandExistsSpy.mockClear()
    })

    test('It should validate the required deps even if no additional command was provided to validate', async () => {
      await grpcDepsCommandsExists()
      expect(pathCommandExistsSpy).toHaveBeenCalledTimes(constants.REQUIRED_DEPENDENCIES.length)

      constants.REQUIRED_DEPENDENCIES.forEach((command: string, index: number) => {
        expect(pathCommandExistsSpy).toHaveBeenNthCalledWith(index + 1, command)
      })
    })

    test('It should test provided deps and required ones', async () => {
      const provided = ['test-command', 'command-test']
      const merged = [...provided, ...constants.REQUIRED_DEPENDENCIES]

      await grpcDepsCommandsExists(provided)
      expect(pathCommandExistsSpy).toHaveBeenCalledTimes(merged.length)

      merged.forEach((command: string, index: number) => {
        expect(pathCommandExistsSpy).toHaveBeenNthCalledWith(index + 1, command)
      })
    })
  })

  describe('grpcDepsCommandsExists - mock', () => {
    beforeAll(() => {
      mockConfig.REQUIRED_DEPENDENCIES = []
    })

    beforeEach(() => {
      pathCommandExistsSpy.mockClear()
    })

    test('It should resolve true when all the deps commands exists', async () => {      
      await expect(grpcDepsCommandsExists(['git', 'node'])).resolves.toBe(true)
      expect(pathCommandExistsSpy).toHaveBeenCalledTimes(2)
    })

    test('It should resolve false when any dep command does not exists', async () => {
      await expect(grpcDepsCommandsExists(['node', 'test-command', 'git'])).resolves.toBe(false)
      expect(pathCommandExistsSpy).toHaveBeenCalledTimes(3)
    })

    test('It should resolve false even when something throws', async () => {
      await expect(grpcDepsCommandsExists([])).resolves.toBe(false)
      expect(pathCommandExistsSpy).toHaveBeenCalledTimes(0)
    })
  })

  afterAll(() => {
    logger.enable()
    pathCommandExistsSpy.mockRestore()
  })
})