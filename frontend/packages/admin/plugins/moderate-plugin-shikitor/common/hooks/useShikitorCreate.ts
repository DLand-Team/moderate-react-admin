// @replacer.use.define.__WORKSPACE_DIR__
import { create } from '@shikitor/core'
import { useEffect, useState } from 'react'

export function useShikitorCreate() {
  const [shikitorCreate, setShikitorCreate] = useState(() => create)
  useEffect(() => {
    async function createRemount(newModule: unknown) {
      if (!newModule) return
      setShikitorCreate(() => (newModule as unknown as { create: typeof create }).create)
    }
    if (import.meta.hot) {
      import.meta.hot.accept('/@fs/__WORKSPACE_DIR__/packages/core/src/index.ts', createRemount)
    }
    return () => {
      if (import.meta.hot) {
        import.meta.hot.dispose(createRemount)
      }
    }
  }, [])
  return shikitorCreate
}
