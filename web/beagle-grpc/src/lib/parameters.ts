import { FetchRequest } from './models/fetch-request'
import { queryParamsToObject } from './utils/url'

export function getParameters(fetchReq: FetchRequest): string {
  if (['POST', 'PUT', 'PATCH'].some(method => method === fetchReq.method)) {   
    return fetchReq.body ? JSON.stringify(fetchReq.body) : ''
  } 
  
  if (fetchReq.url.indexOf('?') >= 0) {
    const objectifiedParams = queryParamsToObject(fetchReq.url)
    return objectifiedParams ? JSON.stringify(objectifiedParams) : ''
  }

  return ''
}
