import { toBeagleUIElement } from './element'
import { ScreenServiceClient } from './generated-proto/screen_pb_service'
import { FetchRequest } from './models/fetch-request'
import { createBlob } from './utils/blob'
import { getView } from './utils/request'
import { createResponse } from './utils/response'

export async function fetchGrpcView(name: string, client: ScreenServiceClient, fetchReq: FetchRequest): Promise<Response> {
  try {
    const view = await getView(name, client, fetchReq)
    const beagleTree = toBeagleUIElement(view)
    const blob = createBlob(JSON.stringify(beagleTree), 'application/json')

    return createResponse(blob, 200, 'OK')
  } catch (err) {
    const message = err?.message || 'Unknown error'
    const blob = createBlob(message, 'text/plain')

    return createResponse(blob, 500, 'Internal Server Error')
  }
}
