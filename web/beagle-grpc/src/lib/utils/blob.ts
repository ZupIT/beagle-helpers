export function createBlob(content: string, type: string): Blob {
  return new Blob([content], { type })
}
