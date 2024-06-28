import * as lz from 'lz-string'


const tag = 'shikitor-zip-tag'
export function zipStr(str: string) {
  return lz.compressToEncodedURIComponent(`${tag}:${lz.compressToEncodedURIComponent(str)}`)
}
export function unzipStr(str: string) {
  const firstLevel = lz.decompressFromEncodedURIComponent(str)
  if (!firstLevel.startsWith(`${tag}:`)) {
    throw new Error('Invalid tag, content is not compressed')
  }
  const secondLevel = lz.decompressFromEncodedURIComponent(
    firstLevel.slice(tag.length + 1)
  )
  if (secondLevel === null) {
    throw new Error('Failed to decompress')
  }
  return secondLevel
}
