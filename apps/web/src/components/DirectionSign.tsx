import { Text } from '@react-three/drei'
import { ColorRepresentation } from 'three'

export type IDirectionalSign = {
  position: [number, number, number]
  rotation?: [number, number, number]
  labelText: string
  textColor?: ColorRepresentation
}

export const DirectionalSign = ({
  position,
  rotation = [0, 0, 0],
  labelText,
  textColor = 'black',
}: IDirectionalSign) => {
  return (
    <group position={position} rotation={rotation}>
      <Text
        scale={3}
        position={[0, 0, 0]}
        fontSize={0.5}
        color={textColor}
        anchorX="center"
        anchorY="middle"
      >
        {labelText}
      </Text>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.25, 1, 16]} />
        <meshBasicMaterial color={textColor} />
      </mesh>
    </group>
  )
}
