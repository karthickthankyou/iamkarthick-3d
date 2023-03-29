import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box3, ColorRepresentation, Vector3 } from 'three'

interface ColliderProps {
  size?: [number, number, number]
  position: [number, number, number]
  color?: ColorRepresentation
  repulsionForce?: number
}
export const Collider = ({
  size = [1, 0.1, 1],
  position,
  color = 'black',
  repulsionForce = 2,
}: ColliderProps) => {
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame(({ scene }) => {
    const box = new Box3().setFromObject(mesh.current)
    const rectangleBox = new Box3().setFromObject(scene.userData.rectangle)

    if (box.intersectsBox(rectangleBox)) {
      const overlap = new Vector3()
      box.getCenter(overlap).sub(rectangleBox.getCenter(new Vector3()))

      scene.userData.rectanglePosition.current.x -= overlap.x * repulsionForce
      scene.userData.rectanglePosition.current.z -= overlap.z * repulsionForce
    }
  })

  return (
    <mesh name="box" ref={mesh} position={position}>
      <boxBufferGeometry args={size} />
      <meshBasicMaterial color={color} opacity={0.1} />
    </mesh>
  )
}
