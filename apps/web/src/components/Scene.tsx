import {
  AsciiRenderer,
  Billboard,
  CameraShake,
  Float,
  Grid,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Sphere,
  Text3D,
  Trail,
} from '@react-three/drei'
import { Physics } from '@react-three/cannon'

import { Text } from '@react-three/drei'

import { Trigger } from './Trigger'
import { Rectangle } from './Rectangle'
import { useFrame, useThree } from 'react-three-fiber'
import { isTriggerVisible } from '@zillow/util/functions'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { radians } from '@zillow/util'
import { Mesh } from 'three'
import useSound from 'use-sound'
import { Collider } from './CollisionBox'

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
  return (
    <>
      <Grid
        cellSize={1}
        sectionSize={10}
        infiniteGrid
        cellColor={'gray'}
        sectionColor={'lightgray'}
      />
      <OrbitControls />
      <OrthographicCamera
        makeDefault
        position={[40, 40, 40]}
        rotation={[radians(45), 0, 0]}
        left={-5}
        right={5}
        top={5}
        bottom={-5}
        near={0.1}
        far={100}
      />
      <Trail
        width={10}
        length={20}
        color={'#000000'}
        attenuation={(t: number) => {
          return t * t
        }}
      >
        <Rectangle />
      </Trail>
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
      <Collider repulsionForce={10} color={'red'} position={[-20, 0, 20]} />
      <Collider repulsionForce={10} color={'red'} position={[-20, 0, 30]} />
      <Collider repulsionForce={4} color={'pink'} position={[-30, 0, 20]} />
      <Collider repulsionForce={4} color={'pink'} position={[-30, 0, 30]} />
      <Trigger
        size={[20, 0.1, 20]}
        position={[20, 0, 20]}
        color="#ddd"
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
      {/* <Rig /> */}
      {/* <DirectionalSign position={[10, 0, 0]} labelText={'Zillow clone'} /> */}
    </>
  )
}
