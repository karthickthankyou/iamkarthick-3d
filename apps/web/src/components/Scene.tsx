import {
  Billboard,
  CameraShake,
  Float,
  Grid,
  PerspectiveCamera,
} from '@react-three/drei'

import { Text, Stats } from '@react-three/drei'

import { Trigger } from './Trigger'
import { Rectangle } from './Rectangle'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame, useThree, useLoader } from 'react-three-fiber'
import { useState } from 'react'
import * as THREE from 'three'
import { radians } from '@zillow/util'

import useSound from 'use-sound'
import { BuildingProps } from './Building'

import { Collider } from './Collider'

export const Karthick3D = () => {
  const gltf = useLoader(GLTFLoader, '/3d/karthick.glb')
  //   const model = gltf.scene.clone()

  //   // You can set the desired color for the shader here
  //   const color = new THREE.Color('#aaa')

  //   const modelWithShader = applyShaderToModel(model, color)

  return <primitive scale={[1, 0.03, 1]} object={gltf.scene} />
}

// function TrailScene() {
//   const group = useRef<Mesh>(null!)
//   const sphere = useRef<Mesh>(null!)
//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime()

//     group.current.rotation.z = t

//     sphere.current.position.x = Math.sin(t * 2) * 2
//     sphere.current.position.z = Math.cos(t * 2) * 2
//   })

//   return (
//     <>
//       <group ref={group}>
//         <Trail
//           width={1}
//           length={4}
//           color={'#F8D628'}
//           attenuation={(t: number) => {
//             return t * t
//           }}
//         >
//           <Sphere ref={sphere} args={[0.1, 32, 32]} position-y={3}>
//             <meshNormalMaterial />
//           </Sphere>
//         </Trail>
//       </group>

//       <PerspectiveCamera makeDefault position={[5, 5, 5]} />
//       <axesHelper />
//     </>
//   )
// }

function Rig() {
  const [vec] = useState(() => new THREE.Vector3())
  const { camera, mouse } = useThree()
  useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, 1, 60), 0.05))
  return (
    <CameraShake
      maxYaw={0.01}
      maxPitch={0.01}
      maxRoll={0.01}
      yawFrequency={0.5}
      pitchFrequency={0.5}
      rollFrequency={0.4}
    />
  )
}

// const generateCity = ({
//   rows,
//   cols,
//   blockSize,
// }: {
//   rows: number
//   cols: number
//   blockSize: number
// }) => {
//   const cityBlocks = []
//   const repulsionForce = 4
//   const color = 'blue'

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       const height = Math.random() * 10
//       const position = [
//         i * blockSize - (rows * blockSize) / 2,
//         height / 2,
//         j * blockSize - (cols * blockSize) / 2,
//       ] as [number, number, number]
//       const size = [blockSize, height, blockSize] as [number, number, number]

//       cityBlocks.push(
//         <Collider
//           key={`${i}-${j}`} // Add a unique key for each block
//           repulsionForce={repulsionForce}
//           color={color}
//           position={position}
//           size={size}
//         />,
//       )
//     }
//   }

//   return cityBlocks
// }

const buildings: BuildingProps[] = [
  { position: [-10, 0, -20], size: [50, 10, 50], color: '#000' },
  { position: [0, 0, -20], size: [50, 15, 50], color: '#000' },
  { position: [10, 0, -20], size: [50, 7, 50], color: '#000' },
]

export const Scene = () => {
  const [playEntrySound, { stop }] = useSound('/sounds/love.mp3', {
    volume: 1.0,
  })
  const [playCheckmateMusic, { stop: stopCheckmateMusic }] = useSound(
    '/sounds/Checkmate - Nathan Moore.mp3',
    {
      volume: 1.0,
      loop: true,
    },
  )
  //   useFrame(({ camera, scene }) => {
  //     // Loop through all triggers
  //     const triggers = scene.getObjectsByProperty('name', 'trigger')

  //     // console.log('triggers', triggers)

  //     triggers?.forEach((trigger) => {
  //       // Get the trigger mesh

  //       // Check if the trigger is not visible
  //       if (trigger && !isTriggerVisible(trigger as THREE.Mesh, camera)) {
  //         // Do something when the trigger is not visible
  //         console.log('Trigger not visible:', trigger)
  //       }
  //     })
  //   })

  //   const cityBlocks = generateCity({ rows: 5, cols: 5, blockSize: 10 })

  return (
    <>
      <Grid
        cellSize={1}
        sectionSize={10}
        infiniteGrid
        cellColor={'gray'}
        sectionColor={'lightgray'}
      />
      {/* {cityBlocks}

      <OrbitControls />
      {/* <YouTubeScreen videoId="" /> */}

      <PerspectiveCamera
        makeDefault
        position={[20, 20, 20]}
        rotation={[radians(135), 0, 0]}
        frustumCulled
        fov={45}
        // zoom={0.8}
        // left={-5}
        // right={5}
        // top={5}
        // bottom={-5}
        near={0.1}
        far={1000}
      />
      <group rotation={new THREE.Euler(radians(90), 0, 0)}>
        <Karthick3D />
      </group>
      {/* <Dice /> */}
      {/* <Trail
        width={10}
        length={20}
        color={'#000000'}
        attenuation={(t: number) => {
          return t * t
        }}
      >
      </Trail> */}
      <Rectangle />
      {/* {buildings.map((building, index) => (
        <Building key={index} {...building} />
      ))} */}
      {/* <Text3D font={'black'}>Hello</Text3D> */}
      <Trigger
        size={[10, 0.1, 10]}
        position={[5, 0, 5]}
        color="#aaa"
        onEntry={() => {
          playEntrySound()
        }}
        onExit={() => {
          stop()
        }}
      />
      {/* <Collider opacity={0.4} repulsionForce={10} x={20} z={-20} />
      {/* <Collider
        color={'burlywood'}
        size={[300, 0, 300]}
        opacity={0.4}
        repulsionForce={10}
        x={-60}
        z={-90}
      /> */}
      {/* <Collider
        opacity={0.4}
        color="#bbb"
        size={[10, 4, 10]}
        repulsionForce={2}
        x={-40}
        z={-35}
      />

      <Collider
        opacity={0.4}
        color="#bbb"
        size={[10, 2, 10]}
        repulsionForce={2}
        x={-30}
        z={-35}
        y={3}
      />  */}

      {/*
      <Collider repulsionForce={4} color={'pink'} x={-5} z={35} />
      <Collider repulsionForce={4} color={'pink'} x={25} z={-35} />
      <Collider
        repulsionForce={4}
        color={'blue'}
        x={25}
        z={-35}
        size={[10, 2, 10]}
      />
      <Collider
        repulsionForce={4}
        color={'white'}
        x={5}
        z={-35}
        size={[10, 4, 10]}
      />
      <Collider
        repulsionForce={4}
        color={'white'}
        x={15}
        z={-35}
        size={[10, 2, 10]}
      /> */}

      <Collider
        opacity={0}
        color="#bbb"
        size={[100, 40, 100]}
        repulsionForce={0.2}
        x={-20}
        z={-35}
      />
      <Trigger
        size={[20, 2, 20]}
        position={[25, 0, 20]}
        color="#fff000"
        onEntry={() => {
          playCheckmateMusic()
        }}
        onExit={() => {
          stopCheckmateMusic()
        }}
      />
      <Text
        scale={1}
        position={[0, 0, 0]}
        // fontSize={0.5}
        color={'blue'}
        anchorX="center"
        anchorY="bottom"
      >
        Ikea clone
      </Text>
      <Float speed={1} floatIntensity={1}>
        <Text
          scale={1}
          position={[0, 0, 0]}
          // fontSize={0.5}
          color={'blue'}
          anchorX="center"
          anchorY="bottom"
        >
          Ikea clone
        </Text>
      </Float>

      {/* <TrailScene /> */}
      <Billboard>Hello</Billboard>
      <Stats showPanel={0} className="stats" />

      {/* <Rig /> */}
      {/* <DirectionalSign position={[10, 0, 0]} labelText={'Zillow clone'} /> */}
    </>
  )
}
