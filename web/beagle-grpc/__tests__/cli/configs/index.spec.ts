import { jest, describe, test, expect, beforeAll, afterAll, afterEach } from '@jest/globals'
import { configFileExists, createNewConfigurationFile, getConfigs } from '../../../src/cli/configs'
import fs from 'fs'
import fsPromises from 'fs/promises'
import { logger } from '../../../src/cli/utils/logger'
import JestMock from 'jest-mock'
import { baseConfigs } from '../../../src/cli/configs/models/configs'

describe('src/cli/configs/index.ts', () => {
  beforeAll(() => {
    logger.disable()
  })

  describe('createNewConfigurationFile', () => {
    let writeFileSpy: JestMock.SpyInstance<Promise<void>, any>
    const mockWriteFileImplementation = (err: NodeJS.ErrnoException | null): JestMock.SpyInstance<Promise<void>, any> => {
      return jest.spyOn(fsPromises, "writeFile").mockImplementation((path: unknown, content: unknown) => err ? Promise.reject(err) : Promise.resolve())
    }

    afterEach(() => {
      writeFileSpy.mockRestore()
    })

    test('It should call writeFile and resolve telling if the file was created', async () => {
      writeFileSpy = mockWriteFileImplementation(null)
      const fileCreated = await createNewConfigurationFile()
      expect(writeFileSpy).toHaveBeenCalledTimes(1)
      expect(fileCreated).toBeTruthy()
    })

    test('It should call writeFile and resolve telling that the file was not created when something wrong happens', async () => {
      writeFileSpy = mockWriteFileImplementation({ path: 'src/cli/configs/index.ts', message: 'File not created', name: 'error' })
      const fileCreated = await createNewConfigurationFile()
      expect(writeFileSpy).toHaveBeenCalledTimes(1)
      expect(fileCreated).toBeFalsy()
    })

    test('It should resolve false even when it crashes', async () => {
      const _writeFile = fsPromises.writeFile
      fsPromises.writeFile = ((null as unknown) as typeof _writeFile)

      const fileCreated = await createNewConfigurationFile()
      expect(fileCreated).toBeFalsy()

      fsPromises.writeFile = _writeFile
    })
  })

  describe('configFileExists', () => {
    let accessSpy: JestMock.SpyInstance<Promise<void>, [path: fs.PathLike, mode?: number]>

    afterEach(() => {
      accessSpy.mockRestore()
    })

    test('It should call access and resolve telling that the file exists', async () => {
      accessSpy = jest.spyOn(fsPromises, "access").mockImplementation(() => Promise.resolve())

      const fileExists = await configFileExists()
      expect(accessSpy).toHaveBeenCalledTimes(1)
      expect(fileExists).toBeTruthy()
    })

    test('It should call access and resolve telling that the file does not exists', async () => {
      accessSpy = jest.spyOn(fsPromises, "access").mockImplementation(() => Promise.reject())

      const fileExists = await configFileExists()
      expect(accessSpy).toHaveBeenCalledTimes(1)
      expect(fileExists).toBeFalsy()
    })

    test('It should resolve false even when it crashes', async () => {
      const _access = fsPromises.access
      fsPromises.access = ((null as unknown) as typeof _access)

      const fileExists = await configFileExists()
      expect(fileExists).toBeFalsy()

      fsPromises.access = _access
    })

    afterAll(() => {
      accessSpy.mockRestore()
    })
  })

  describe('getConfigs', () => {
    let readFileSpy: JestMock.SpyInstance<Promise<string | Buffer>, any>

    afterEach(() => {
      readFileSpy.mockRestore()
    })

    test('It should call readFile and resolve the required configuration', async () => {
      readFileSpy = jest.spyOn(fsPromises, "readFile").mockImplementation(() => Promise.resolve(JSON.stringify(baseConfigs, null, 2)))
      
      const config = await getConfigs('development')
      expect(readFileSpy).toHaveBeenCalledTimes(1)
      expect(config).toBeDefined()
      expect(config).toStrictEqual(baseConfigs.configs.find(c => c.mode === 'development'))
    })

    test('It should call readFile and resolve undefined when the mode does not exists', async () => {
      readFileSpy = jest.spyOn(fsPromises, "readFile").mockImplementation(() => Promise.resolve(JSON.stringify(baseConfigs, null, 2)))

      const config = await getConfigs('test-mock')
      expect(readFileSpy).toHaveBeenCalledTimes(1)
      expect(config).toBeUndefined()
    })

    test('It should call readFile and resolve undefined when the configuration file does not exists', async () => {
      readFileSpy = jest.spyOn(fsPromises, "readFile").mockImplementation(() => Promise.resolve(''))

      const config = await getConfigs('development')
      expect(readFileSpy).toHaveBeenCalledTimes(1)
      expect(config).toBeUndefined()
    })

    test('It should resolve undefined even when it crashes', async () => {
      const _readFile = fsPromises.readFile
      fsPromises.readFile = ((null as unknown) as typeof _readFile)

      const config = await getConfigs('development')
      expect(config).toBeUndefined()

      fsPromises.readFile = _readFile
    })

    afterAll(() => {
      readFileSpy.mockRestore()
    })
  })

  afterAll(() => {
    logger.enable()
  })
})
