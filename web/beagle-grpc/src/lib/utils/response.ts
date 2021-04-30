export function createResponse(blob: Blob, status: number, statusText: string): Response {
  return new Response(blob, { status, statusText })
}
