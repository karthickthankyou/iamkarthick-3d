import { Canvas } from '@react-three/fiber'
import { Grid, OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Trigger } from './Trigger'
import { Rectangle } from './Rectangle'

export const Scene = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas style={{ backgroundColor: 'white' }}>
        <Grid cellSize={1} sectionSize={10} infiniteGrid />
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
        <Trigger
          size={[2, 0.1, 3]}
          position={[1, 0, 1]}
          onEntry={() => console.log('Entered')}
          onExit={() => console.log('Exited')}
        />
        <Trigger
          size={[2, 0.1, 3]}
          position={[8, 0, 4]}
          color="beige"
          onEntry={() => console.log('Entered')}
          onExit={() => console.log('Exited')}
        />
        {/* <DirectionalSign position={[10, 0, 0]} labelText={'Zillow clone'} /> */}
      </Canvas>
    </div>
  )
}
