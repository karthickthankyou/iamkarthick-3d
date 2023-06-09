import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Scene } from '@zillow/components/Scene'
import { Canvas } from '@react-three/fiber'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{ width: '100vw', height: '100vh' }}>
          <Canvas style={{ backgroundColor: 'white' }}>
            <Scene />
          </Canvas>
        </div>
      </main>
    </>
  )
}
