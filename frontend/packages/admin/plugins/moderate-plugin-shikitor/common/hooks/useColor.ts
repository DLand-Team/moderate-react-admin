import { useEffect, useRef, useState } from 'react'

export type Color = {
  bg: string
  fg: string
}

export function useColor(
  onColorChange: (
    style: CSSStyleDeclaration,
    color: Color
  ) => void,
  restoreKeys: string[] = []
) {
  const [color, setColor] = useState<{
    bg: string
    fg: string
    [key: string]: string
  }>(() => {
    const style = document.documentElement.style
    return {
      bg: style.getPropertyValue('--bg'),
      fg: style.getPropertyValue('--fg'),
      ...restoreKeys.reduce((acc, key) => ({
        ...acc,
        [key]: style.getPropertyValue(`--${key}`)
      }), {})
    }
  })
  const initialColorRef = useRef(color)
  useEffect(() => {
    const style = document.documentElement.style
    const initialColor = initialColorRef.current
    return () => {
      if (!initialColor) return
      style.setProperty('--bg', initialColor.bg)
      style.setProperty('--fg', initialColor.fg)
      restoreKeys.forEach(key => {
        initialColor[key]
          ? style.setProperty(`--${key}`, initialColor[key])
          : style.removeProperty(`--${key}`)
      })
    }
  }, [restoreKeys])
  useEffect(() => {
    const { bg, fg } = color
    const style = document.documentElement.style
    style.setProperty('--bg', bg)
    style.setProperty('--fg', fg)
    onColorChange(style, color)
  }, [color, restoreKeys, onColorChange])
  return {
    setColor
  }
}
