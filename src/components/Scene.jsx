/* eslint-disable react/no-unknown-property */
import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import * as THREE from 'three'
import CircularPath from './CircularPath'
import Particles from './Particles'
import FloatingText from './FloatingText'
import BackgroundParticles from './BackgroundParticles'
import { CameraController } from './CameraController'
import FloatingPanel from './FloatingPanel'
import { galleryContent } from '../assets/data/galleryContent'

// Custom ScrollControls wrapper to reverse scroll direction
const ReverseScrollControls = (props) => {
  const scroll = useScroll()

  useEffect(() => {
    const handleWheel = (event) => {
      // Reverse the scroll direction
      event.preventDefault()
      scroll.el.scrollTop -= event.deltaY
    }

    const scrollContainer = scroll.el
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel)
    }
  }, [scroll])

  return props.children
}

const Scene = () => {
  return (
    <Canvas
      camera={{
        position: [0, 8, 10],
        fov: 50,
      }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.Fog('#0d0d1a', 10, 30)
      }}
      gl={{ antialias: true }}
      frameloop="always"
      style={{ position: 'fixed' }}
    >
      <BackgroundParticles />
      <Particles />
      <FloatingText texto={'Hola mundo'} position={[-7, 0, -7]} />
      <FloatingText texto={'De vuelta'} position={[5, 2, 6]} rotation={[0, THREE.MathUtils.degToRad(170), 0]} />

      <ScrollControls
        pages={30}
        damping={0.2}
        style={{
          position: 'absolute',
          transform: 'scaleY(-1)',
        }}
      >
        {/* Wrap children with ReverseScrollControls */}
        <ReverseScrollControls>
          <CameraController />
          <CircularPath />
          <FloatingPanel
            position={[5.15, 0.35, 1.5]}
            rotation={[0, THREE.MathUtils.degToRad(180), 0]}
            galleryContent={galleryContent}
            title={'Experiencias inmersivas'}
            subtitle={'Summergo Lab'}
          />
        </ReverseScrollControls>
      </ScrollControls>

      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </Canvas>
  )
}

export default Scene
