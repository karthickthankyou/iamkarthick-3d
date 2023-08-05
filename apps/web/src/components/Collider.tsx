import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  Box3,
  ColorRepresentation,
  ShaderMaterial,
  Vector3,
  Color,
} from 'three'
import useSound from 'use-sound'
import { useSmoothMovement } from '@zillow/pages/hooks/smoothMovement'
import { fragmentShader, vertexShader } from '@zillow/shaders'

interface ColliderProps {
  size?: [number, number, number]
  x: number
  y?: number
  z: number

  color?: ColorRepresentation
  repulsionForce?: number
  opacity?: number
}
export const Collider = ({
  size = [1, 0.1, 1],
  x,
  z,
  y = size[1] / 2,
  color = 'black',
  repulsionForce = 2,
  opacity = 0.1,
}: ColliderProps) => {
  const mesh = useRef<THREE.Mesh>(null!)

  const [playDingSound] = useSound('/sounds/ding.mp3', {
    volume: 1.0,
  })

  useFrame(({ scene }) => {
    const box = new Box3().setFromObject(mesh.current)
    const rectangleBox = new Box3().setFromObject(scene.userData.rectangle)

    if (box.intersectsBox(rectangleBox)) {
      const overlap = new Vector3()
      box.getCenter(overlap).sub(rectangleBox.getCenter(new Vector3()))

      //   playDingSound()

      scene.userData.rectanglePosition.current.x -= overlap.x * repulsionForce
      scene.userData.rectanglePosition.current.z -= overlap.z * repulsionForce
    }
  })

  return (
    <mesh
      onClick={(e) => console.log('Clicked')}
      name="box"
      ref={mesh}
      position={[x, y, z]}
    >
      <boxGeometry args={size} />
    </mesh>
  )
}
