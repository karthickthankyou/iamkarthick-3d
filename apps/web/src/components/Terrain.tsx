import * as THREE from 'three'
import React, { useMemo } from 'react'
import { radians } from '@zillow/util'
import { getShaderMaterial } from '@zillow/shaders/terrain'
import { useFrame } from 'react-three-fiber'

interface TerrainProps {
  top?: number
  right?: number
  bottom?: number
  left?: number

  minHeight?: number
  maxHeight?: number
  segments?: number
  sizeX?: number
  sizeY?: number
  position?: THREE.Vector3
  color?: THREE.ColorRepresentation
}

export const Terrain: React.FC<TerrainProps> = ({
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
  segments,
  minHeight = 0, // Minimum height
  maxHeight = 10, // Maximum height
  position = new THREE.Vector3(0, 0, 0),
  sizeX = 20,
  sizeY = 20,
  color = 'darkgray',
}) => {
  const segmentsX = segments || sizeX / 4
  const segmentsY = segments || sizeY / 4
  const geomFloor = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(sizeX, sizeY, segmentsX, segmentsY)
    const positionAttribute = geometry.getAttribute('position')
    const vertex = new THREE.Vector3()

    for (let i = 0; i < positionAttribute.count; i++) {
      // @ts-ignore
      vertex.fromBufferAttribute(positionAttribute, i)

      if (i < segmentsX + 1) {
        vertex.z = top
      } else if (i % (segmentsX + 1) === 0) {
        vertex.z = left
      } else if (i % (segmentsX + 1) === segmentsX) {
        vertex.z = right
      } else if (i > positionAttribute.count - (segmentsX + 1)) {
        vertex.z = bottom
      } else {
        const randomFloorVertexPos = Math.floor(
          Math.random() * (maxHeight - minHeight) + minHeight,
        )
        vertex.z = randomFloorVertexPos
      }

      // @ts-ignore
      positionAttribute.setZ(i, vertex.z)
    }

    positionAttribute.needsUpdate = true

    return geometry
  }, [
    bottom,
    minHeight,
    maxHeight,
    left,
    right,
    segmentsX,
    segmentsY,
    sizeX,
    sizeY,
    top,
  ])

  return (
    <mesh
      rotation={new THREE.Euler(radians(-90), 0, 0)}
      geometry={geomFloor}
      position={position}
    >
      <primitive
        object={getShaderMaterial({ color: new THREE.Color(color) })}
        attach="material"
      />
    </mesh>
  )
}
