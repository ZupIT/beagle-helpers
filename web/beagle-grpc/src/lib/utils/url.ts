import { URL } from 'url'

export function isValidURL(url: string): boolean {
  var pattern = new RegExp('^(http(s)?:\\/\\/)?' + 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$','i')
  return !!pattern.test(url)
}

export function queryParamsToObject(url: string): Record<string, any> | undefined {
  try {
    if (!url || !isValidURL(url)) {
      throw 'A non valid url was provided'
    }

    const urlObj = new URL(url)
    const entries = Array.from(new Set(urlObj.searchParams.entries()))

    const paramsObj: Record<string, unknown> = {}
    entries.forEach(([key, value]) => {
      paramsObj[key] = value
    })

    return paramsObj
  } catch (error) {
    console.error(error)
    return undefined
  }
}
