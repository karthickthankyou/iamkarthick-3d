import { useRef, useState, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { Vector3 } from 'three'

export const useSmoothMovement = ({
  position1,
  position2,
  duration,
}: {
  position1: [number, number, number]
  position2: [number, number, number]
  duration: number
}) => {
  const startTime = useRef(0)
  const [isForward, setIsForward] = useState(true)

  const pos1 = useRef(new Vector3(...position1))
  const pos2 = useRef(new Vector3(...position2))

  useEffect(() => {
    startTime.current = performance.now()
  }, [])

  useFrame(() => {
    const currentTime = performance.now()
    const elapsedTime = currentTime - startTime.current
    const t = elapsedTime / duration

    if (isForward) {
      if (t <= 1) {
        return pos1.current.lerp(pos2.current, t)
      } else {
        setIsForward(false)
        startTime.current = currentTime
      }
    } else {
      if (t <= 1) {
        return pos2.current.lerp(pos1.current, t)
      } else {
        setIsForward(true)
        startTime.current = currentTime
      }
    }
  })

  return isForward ? pos1.current : pos2.current
}
