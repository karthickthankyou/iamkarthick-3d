import { useMemo } from 'react'
import * as THREE from 'three'

export interface BuildingProps {
  position: [number, number, number]
  size: [number, number, number]
  color: THREE.ColorRepresentation
}

export const Building: React.FC<BuildingProps> = ({
  position,
  size,
  color,
}) => {
  console.log('hello building')
  const gradientMaterial = useMemo(() => {
    const topColor = new THREE.Color(color)
    const bottomColor = topColor.clone().multiplyScalar(0.5)

    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vUv;

        void main() {
          vUv = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;

        varying vec3 vUv;

        void main() {
          float factor = (vUv.y + size.y / 2.0) / size.y;
          vec3 color = mix(bottomColor, topColor, factor);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      uniforms: {
        topColor: { value: topColor },
        bottomColor: { value: bottomColor },
        size: { value: new THREE.Vector3(...size) },
      },
    })
  }, [size, color])

  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <primitive object={gradientMaterial} attach="material" />
    </mesh>
  )
}
