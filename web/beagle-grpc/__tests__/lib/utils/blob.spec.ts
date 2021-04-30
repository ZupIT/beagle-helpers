import Blob from 'cross-blob'
import { describe, test, expect, beforeAll } from '@jest/globals'
import { createBlob } from '../../../src/lib/utils/blob'

describe('src/lib/utils/blob.ts', () => {
  beforeAll(() => {
    globalThis.Blob = Blob
  })

  describe('createBlob', () => {
    test('it should create a blob', () => {
      const blob = createBlob('content', 'application/json')
      expect(blob instanceof Blob).toBeTruthy()
    })
  })
})
