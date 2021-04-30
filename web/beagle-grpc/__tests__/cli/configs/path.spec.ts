import { describe, test, expect } from '@jest/globals'
import { getConfigCwdPath } from '../../../src/cli/configs/path'
import { CONFIG_FILE_NAME } from '../../../src/cli/configs/constants'

describe('src/cli/configs/path.ts', () => {
  describe('getConfigCwdPath', () => {
    test('It should return the execution path with the name of the configuration file concatenated', () => {
      expect(getConfigCwdPath()).toBe(`${process.cwd()}\\${CONFIG_FILE_NAME}`)
    })
  })
})