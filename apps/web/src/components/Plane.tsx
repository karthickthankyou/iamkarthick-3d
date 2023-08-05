import * as THREE from 'three'
import { useMemo } from 'react'
import { radians } from '@zillow/util'

interface PlaneProps {
  color?: THREE.ColorRepresentation
  opacity?: number
  sizeX?: number
  sizeY?: number
  position?: THREE.Vector3
}

export const Plane: React.FC<PlaneProps> = ({
  color = new THREE.Color('white'),
  opacity = 1,
  sizeX = 1,
  sizeY = 1,
  position = new THREE.Vector3(0, 0, 0),
}) => {
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
      }),
    [color, opacity],
  )

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(sizeX, sizeY),
    [sizeX, sizeY],
  )

  return (
    <mesh
      rotation={new THREE.Euler(radians(-90), 0, 0)}
      material={material}
      geometry={geometry}
      position={position}
    />
  )
}
