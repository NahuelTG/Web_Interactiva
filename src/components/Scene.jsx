/* eslint-disable react/no-unknown-property */
import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import * as THREE from 'three'
import CircularPath from './CircularPath'
import { Particles } from './Particles'
import FloatingText from './FloatingText'
import BackgroundParticles from './BackgroundParticles'
import { CameraController } from './CameraController'
import FloatingPanel from './FloatingPanel'
import { galleryContent } from '../assets/data/galleryContent'
import { AboutUs } from './AboutUs'
import scrollService from '../service/ScrollService' // Importar el servicio

// Creamos un contexto para el control de scroll

// Custom ScrollControls wrapper to reverse scroll direction
const ReverseScrollControls = (props) => {
  const scroll = useScroll()

  useEffect(() => {
    // Registrar el elemento de scroll en el servicio
    if (scroll && scroll.el) {
      scrollService.setScrollElement(scroll.el)
    }

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
        fov: 60,
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
      {/* <FloatingText texto={'Hola mundo'} position={[-7, 0, -7]} /> */}
      <FloatingText texto={''} position={[5, 2, 6]} rotation={[0, THREE.MathUtils.degToRad(170), 0]} />

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
          <AboutUs position={[4.7, -0.5, -1.5]} rotation={[0, THREE.MathUtils.degToRad(200), 0]} />
          <FloatingPanel
            position={[4.75, 0.35, 2.5]}
            rotation={[0, THREE.MathUtils.degToRad(170), 0]}
            galleryContent={galleryContent[0].VR}
            icon={galleryContent[0].Icon}
          />
          <FloatingPanel
            position={[-2, 0.35, 5]}
            rotation={[0, THREE.MathUtils.degToRad(80), 0]}
            galleryContent={galleryContent[1].MD}
            icon={galleryContent[1].Icon}
          />
          <FloatingPanel
            position={[-5.45, 0.35, 0]}
            rotation={[0, THREE.MathUtils.degToRad(20), 0]}
            galleryContent={galleryContent[2].AR}
            icon={galleryContent[2].Icon}
          />
          <FloatingPanel
            position={[1, 0.35, -5.3]}
            rotation={[0, THREE.MathUtils.degToRad(-80), 0]}
            galleryContent={galleryContent[3].AudioRuta}
            icon={galleryContent[3].Icon}
          />
        </ReverseScrollControls>
      </ScrollControls>

      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </Canvas>
  )
}

export default Scene
