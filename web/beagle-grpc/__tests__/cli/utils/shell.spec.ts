import { describe, test, expect, beforeAll, afterAll } from '@jest/globals'
import { execShellCommand, pathCommandExists, envVariableExists, getEnvVariable } from '../../../src/cli/utils/shell'
import { logger } from '../../../src/cli/utils/logger'

describe('src/cli/utils/shell.ts', () => {
  beforeAll(() => {
    logger.disable()
  })

  describe('envVariableExists', () => {
    test('It should return true when the env var exists', () => {
      expect(envVariableExists('NODE_ENV')).toBe(true)
    })

    test('It should return false when the env var does not exists', () => {
      expect(envVariableExists('MOCK_TEST_VAR_ENV')).toBe(false)
    })

    test('It should return false when something throws', () => {
      expect(envVariableExists('')).toBe(false)
    })
  })

  describe('getEnvVariable', () => {
    test('It should return the value of an environment variable', () => {
      expect(getEnvVariable('NODE_ENV')).toBe(process.env.NODE_ENV)
    })

    test('It should return undefined when the env var does not exists', () => {
      expect(getEnvVariable('MOCK_TEST_VAR_ENV')).toBeUndefined()
    })

    test('It should return undefined when something throws', () => {
      expect(getEnvVariable('')).toBeUndefined()
    })
  })

  describe('pathCommandExists', () => {
    test('It should return true when the command exists', async () => {
      await expect(pathCommandExists('node')).resolves.toBe(true)
    })

    test('It should return false when the command does not exists or something throws', async () => {
      await expect(pathCommandExists('mock-test-command')).resolves.toBe(false)
    })
  })

  describe('execShellCommand', () => {
    test('It should be able to run shell (cmd, terminal...) commands', async () => {
      await expect(execShellCommand('node -v')).resolves.not.toThrow()
    })

    test('It should reject when the command fails/not exists', async () => {
      await expect(execShellCommand('test-command-grpc')).rejects.toThrow()
    })

    test('It should reject when the command is not provided', async () => {
      await expect(execShellCommand('')).rejects.toThrow()
    })
  })

  afterAll(() => {
    logger.enable()
  })
})
