import { Canvas } from '@react-three/fiber'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Grid, OrbitControls, OrthographicCamera } from '@react-three/drei'

const radians = (degrees: number) => (degrees * Math.PI) / 180

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

const MAX_SPEED = 1
const MIN_SPEED = 0.01
const followSpeed = 0.1

const Rectangle = () => {
  const mesh = useRef<THREE.Mesh>(null!)
  const { viewport, camera } = useThree()
  const [speed, setSpeed] = useState(() => 0.02)

  const { pressedKeys } = usePressedKeys()

  useFrame(() => {
    if (pressedKeys.has('ArrowUp') || pressedKeys.has('KeyW')) {
      mesh.current.position.x -= speed * Math.cos(mesh.current.rotation.z)
      mesh.current.position.z -= speed * Math.sin(mesh.current.rotation.z)
    }
    if (pressedKeys.has('KeyN')) {
      setSpeed((state) => Math.min(MAX_SPEED, state + 0.01))
    }
    if (pressedKeys.has('KeyM')) {
      setSpeed((state) => Math.max(MIN_SPEED, state - 0.01))
    }
    if (pressedKeys.has('ArrowDown') || pressedKeys.has('KeyS')) {
      mesh.current.position.x += speed * Math.cos(mesh.current.rotation.z)
      mesh.current.position.z += speed * Math.sin(mesh.current.rotation.z)
    }
    if (pressedKeys.has('ArrowLeft') || pressedKeys.has('KeyA')) {
      mesh.current.rotation.z -= speed
    }
    if (pressedKeys.has('ArrowRight') || pressedKeys.has('KeyD')) {
      mesh.current.rotation.z += speed
    }

    // Smoothly make the camera follow the rectangle
    const offset = 20 // Adjust this value to control the distance of the camera from the rectangle
    camera.position.x +=
      (mesh.current.position.x + offset - camera.position.x) * followSpeed
    camera.position.y +=
      (mesh.current.position.y + offset - camera.position.y) * followSpeed
    camera.position.z +=
      (mesh.current.position.z + offset - camera.position.z) * followSpeed

    camera.lookAt(mesh.current.position)
    camera.updateProjectionMatrix()
  })

  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[radians(90), 0, 0]}>
      <boxBufferGeometry args={[2, 1, 0.04]} />
      <meshBasicMaterial color={'red'} />
    </mesh>
  )
}

export const Scene = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas style={{ backgroundColor: 'white' }}>
        <Grid cellSize={1} sectionSize={10} infiniteGrid />;
        <OrbitControls />
        <OrthographicCamera
          makeDefault
          position={[20, 20, 20]}
          left={-5}
          right={5}
          top={5}
          bottom={-5}
          near={0.1}
          far={100}
        />
        <Rectangle />
      </Canvas>
    </div>
  )
}
