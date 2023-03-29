import {
  CAMERA_OFFSET,
  FOLLOW_SPEED,
  MAX_SPEED,
  MIN_SPEED,
  radians,
} from '@zillow/util'
import { Trail } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

import { useEffect, useRef, useState } from 'react'
import { useThree, useFrame } from 'react-three-fiber'
import { Box3, Vector3 } from 'three'

const usePressedKeys = () => {
  const [pressedKeys, setPressedKeys] = useState(new Set<string>())

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      pressedKeys.add(event.code)
      setPressedKeys(new Set(pressedKeys))
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeys.delete(event.code)
      setPressedKeys(new Set(pressedKeys))
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [pressedKeys])

  return { pressedKeys }
}

export const Rectangle = () => {
  const mesh = useRef<THREE.Mesh>(null!)
  const { viewport, camera } = useThree()
  const [speed, setSpeed] = useState(() => 0.1)

  const { pressedKeys } = usePressedKeys()

  const targetPosition = useRef(new Vector3())
  const targetRotation = useRef(0)

  useFrame(({ scene }) => {
    scene.userData.rectangle = mesh.current
    scene.userData.rectanglePosition = targetPosition

    if (pressedKeys.has('ArrowUp') || pressedKeys.has('KeyW')) {
      targetPosition.current.x -= speed * Math.cos(mesh.current.rotation.z)
      targetPosition.current.z -= speed * Math.sin(mesh.current.rotation.z)
    }

    if (pressedKeys.has('ArrowDown') || pressedKeys.has('KeyS')) {
      targetPosition.current.x += speed * Math.cos(mesh.current.rotation.z)
      targetPosition.current.z += speed * Math.sin(mesh.current.rotation.z)
    }
    if (pressedKeys.has('ArrowLeft') || pressedKeys.has('KeyA')) {
      targetRotation.current -= speed
    }
    if (pressedKeys.has('ArrowRight') || pressedKeys.has('KeyD')) {
      targetRotation.current += speed
    }
    if (pressedKeys.has('KeyN')) {
      setSpeed((state) => Math.min(MAX_SPEED, state + 0.01))
    }
    if (pressedKeys.has('KeyM')) {
      setSpeed((state) => Math.max(MIN_SPEED, state - 0.01))
    }

    mesh.current.position.x +=
      (targetPosition.current.x - mesh.current.position.x) * FOLLOW_SPEED
    mesh.current.position.z +=
      (targetPosition.current.z - mesh.current.position.z) * FOLLOW_SPEED
    mesh.current.rotation.z +=
      (targetRotation.current - mesh.current.rotation.z) * FOLLOW_SPEED

    // Smoothly make the camera follow the rectangle
    // Adjust this value to control the distance of the camera from the rectangle
    camera.position.x +=
      (mesh.current.position.x + CAMERA_OFFSET - camera.position.x) *
      FOLLOW_SPEED
    camera.position.y +=
      (mesh.current.position.y + CAMERA_OFFSET - camera.position.y) *
      FOLLOW_SPEED
    camera.position.z +=
      (mesh.current.position.z + CAMERA_OFFSET - camera.position.z) *
      FOLLOW_SPEED

    camera.lookAt(mesh.current.position)
    // camera.updateProjectionMatrix()
  })

  return (
    <mesh
      name="rectangle"
      ref={mesh}
      position={[0, 0, 0]}
      rotation={[radians(90), 0, 0]}
    >
      <boxBufferGeometry args={[2, 1, 0.04]} />
      <meshBasicMaterial color={'red'} />
    </mesh>
  )
}
