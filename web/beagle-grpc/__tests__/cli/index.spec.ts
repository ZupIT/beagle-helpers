import { jest, describe, test, expect, beforeAll } from '@jest/globals'
import * as main from '../../src/cli/main'
import cli from '../../src/cli'

jest.mock('../../src/cli/main', () => ({
  main: jest.fn().mockImplementation(() => Promise.resolve())
}))

describe('src/cli/index.ts', () => {
  beforeAll(async () => {
    await cli
  })

  test('it should self invoke a function that starts the application with "main" function', () => {
    expect(main.main).toHaveBeenCalledTimes(1)
  })
})
