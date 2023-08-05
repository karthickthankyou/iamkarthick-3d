import { useRef } from 'react'
import { ColorRepresentation } from 'three'

interface PathProps {
  h?: number
  w: number
  l: number
  x: number
  y?: number
  z: number
  color?: ColorRepresentation
  repulsionForce?: number
  opacity?: number
}
export const Path = ({
  w,
  l,
  h = 0,
  x,
  y = -0.01,
  z,
  color = 'blanchedalmond',
  opacity = 0.1,
}: PathProps) => {
  const mesh = useRef<THREE.Mesh>(null!)

  return (
    <mesh name="box" ref={mesh} position={[x, y, z]}>
      <boxGeometry args={[w, h, l]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
