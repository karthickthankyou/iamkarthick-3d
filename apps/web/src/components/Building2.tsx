import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { radians } from '@zillow/util'

export const Building: React.FC<{
  floors?: number
  radius?: number
  position?: THREE.Vector3
  sides?: number
}> = ({
  floors = 1,
  radius = 10,
  position = new THREE.Vector3(0, 0, 0),
  sides = 6,
}) => {
  const buildingRef = useRef<THREE.Group>(new THREE.Group())
  const rotationAngle = (Math.PI * 2) / sides

  const [rotatingFloors, setRotatingFloors] = useState<number[]>([])

  useEffect(() => {
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
    })

    for (let i = 0; i < floors; i++) {
      const geometry = new THREE.CylinderGeometry(
        radius - 0.5,
        radius,
        1,
        sides,
      )
      const floor = new THREE.Mesh(geometry, material)
      floor.position.y = i * 2 + 4
      floor.position.x = position.x
      floor.position.z = position.z
      buildingRef.current.add(floor)
    }

    // Select one or more floors randomly
    setRotatingFloors([Math.floor(Math.random() * floors)])
  }, [floors, radius, position, sides])

  useFrame((_, delta) => {
    // Rotate the selected floors by 90 degrees in one second
    rotatingFloors.forEach((floorIndex) => {
      const floor = buildingRef.current.children[floorIndex] as THREE.Mesh
      if (floor) {
        floor.rotation.y += rotationAngle * delta
        // Reset the rotation if it has reached or exceeded 90 degrees
        if (floor.rotation.y >= rotationAngle) {
          floor.rotation.y = 0
          // Select new floor(s) to rotate
          setRotatingFloors([Math.floor(Math.random() * floors)])
        }
      }
    })
  })

  return (
    <group>
      <primitive object={buildingRef.current} />
      {/* Shadow as a child */}
      <mesh position={[0, 0, 0]} rotation={[radians(180), 0, 0]}>
        <planeGeometry args={[10, 20]} />
        <meshBasicMaterial
          map={new THREE.TextureLoader().load('shadow.png')}
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}
