import 'isomorphic-fetch'
import Blob from 'cross-blob'
import { describe, test, expect, beforeAll } from '@jest/globals'
import { createResponse } from '../../../src/lib/utils/response'
import { createBlob } from '../../../src/lib/utils/blob'

describe('src/lib/utils/response.ts', () => {
  beforeAll(() => {
    globalThis.Blob = Blob
  })

  describe('createResponse', () => {
    test('it should create a Response', () => {      
      const response = createResponse(createBlob('content', 'application/json'), 200, 'OK')
      expect(response instanceof Response).toBeTruthy()
    })
  })
})
