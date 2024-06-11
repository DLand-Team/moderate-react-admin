import { unzipStr } from './zipStr'

export const DEFAULT_CODE = `
console.log("Hello, World!")

function add(a, b) {
  return a + b
}
`.trimStart()

export function analyzeHash() {
  let code = DEFAULT_CODE
  const [type, content] = location.hash.slice(1).split('/')
  if (content === undefined) {
    // undefined behavior, reset hash to empty
    // and don't jump page
    location.hash = ''
  }
  switch (type) {
    case 'zip-code':
      try {
        code = unzipStr(content)
      } catch (e) {
        console.error(e)
      }
      break
    case 'code':
      code = decodeURIComponent(content)
      break
    case 'base64':
      code = atob(content)
      break
  }
  return { code, type, content }
}
