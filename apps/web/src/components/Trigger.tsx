import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box3, ColorRepresentation, Vector3 } from 'three'
import { DirectionalSign } from './DirectionSign'
import { Edges } from '@react-three/drei'
import useSound from 'use-sound'

interface TriggerProps {
  size?: [number, number, number]
  position?: [number, number, number]
  color?: ColorRepresentation
  onEntry: () => void
  onExit: () => void
}

export const Trigger: React.FC<TriggerProps> = ({
  size = [1, 1, 1],
  position = [0, 0, 0],
  color = 'blue',
  onEntry,
  onExit,
}) => {
  const mesh = useRef<THREE.Mesh>(null!)
  const [isInside, setIsInside] = useState(false)
  const box = new Box3()

  useFrame(({ scene }) => {
    const rectangle = scene.getObjectByName('rectangle') as THREE.Mesh
    if (rectangle) {
      const rectangleBox = new Box3().setFromObject(rectangle)
      box.setFromObject(mesh.current)
      if (box.intersectsBox(rectangleBox)) {
        if (!isInside) {
          console.log('Rectangle entered the trigger area')
          ;(rectangle.material as THREE.MeshBasicMaterial).color.set(color)
          onEntry()

          setIsInside(true)
        }
      } else {
        if (isInside) {
          console.log('Rectangle exited the trigger area')

          onExit()
          ;(rectangle.material as THREE.MeshBasicMaterial).color.set('black')
          setIsInside(false)
        }
      }
    }
  })

  return (
    <mesh name="trigger" ref={mesh} position={position}>
      <boxBufferGeometry args={size} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
      {isInside ? (
        <DirectionalSign position={[11, 0, 0]} labelText={'Zillow clone'} />
      ) : null}
      <Edges
        scale={1}
        threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
        color={'black'}
      />
    </mesh>
  )
}
