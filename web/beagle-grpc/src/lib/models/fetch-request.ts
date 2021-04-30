export interface FetchRequest {
  url: string,
  method?: string,
  headers?: Headers,
  body?: unknown
}