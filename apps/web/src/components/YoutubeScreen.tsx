import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import YouTube from 'react-youtube'
import THREE from 'three'

export const YouTubeScreen = ({
  videoId,
  width = 16,
  height = 9,
}: {
  videoId: string
  width?: number
  height?: number
}) => {
  const videoRef = useRef<THREE.Mesh>()
  const { gl } = useThree()
  const [videoTexture, setVideoTexture] = useState(null)

  useEffect(() => {
    // @ts-ignore
    const videoEl = videoRef?.current?.getInternalPlayer()
    const texture = new THREE.VideoTexture(videoEl)
    // @ts-ignore
    setVideoTexture(texture)
  }, [])

  useFrame(() => {
    if (videoTexture) {
      // @ts-ignore
      videoTexture.needsUpdate = true
    }
  })

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      fs: 0,
    },
  }

  return (
    <>
      {/* @ts-ignore */}
      <YouTube ref={videoRef} videoId={videoId} opts={opts} />
      {videoTexture && (
        <mesh>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial map={videoTexture} />
        </mesh>
      )}
    </>
  )
}
