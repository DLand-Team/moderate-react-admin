
export let passiveSupported = false

export const canUseDom = !!(
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
  

if (canUseDom) {
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        passiveSupported = true
      },
    })
    window.addEventListener('test-passive-supported', null as never, opts)
  } catch (e) {
    // console.log(e)
  }
}
