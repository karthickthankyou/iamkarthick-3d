import { useEffect } from 'react'
import { useThree } from 'react-three-fiber'
import { Color } from 'three'

export const useGradientBackground = (color1: string, color2: string) => {
  const { gl, size } = useThree()

  useEffect(() => {
    const ctx = document.createElement('canvas').getContext('2d')!
    const gradient = ctx.createLinearGradient(0, 0, 0, size.height)
    gradient.addColorStop(0, color1)
    gradient.addColorStop(1, color2)

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size.width, size.height)

    const color = new Color(
      // @ts-ignore
      ctx.getImageData(0, 0, size.width, size.height).data,
    )
    gl.setClearColor(color)
  }, [color1, color2, gl, size])

  return null
}
