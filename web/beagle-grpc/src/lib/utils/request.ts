import { grpc } from '@improbable-eng/grpc-web'
import { ScreenRequest, ViewNode } from '../generated-proto/messages_pb'
import { ScreenServiceClient } from '../generated-proto/screen_pb_service'
import { FetchRequest } from '../models/fetch-request'
import { getParameters } from '../parameters'

export function getRequest(requestInfo: RequestInfo): FetchRequest | null {
  if (requestInfo) {
    if (typeof requestInfo === 'string') {
      return { url: requestInfo }
    } else if (typeof requestInfo === 'object') {
      const { url, method, headers, body } = requestInfo
      return { url, method, headers, body }
    }
  }
  return null
}

export async function getView(name: string, client: ScreenServiceClient, fetchReq: FetchRequest): Promise<ViewNode> {
  return new Promise<ViewNode>((resolve, reject) => {
    try {
      const request = new ScreenRequest()
      request.setName(name)
      request.setParameters(getParameters(fetchReq))

      client.getScreen(request, new grpc.Metadata(fetchReq.headers), (error, response) => {
        if (error || !response) {
          const rejectContent = error ? error : new Error(`Failed to get the screen named "${name}"`)
          reject(rejectContent)
        } else {
          resolve(response)
        } 
      })
    } catch (error) {
      reject(error)
    }
  })
}
