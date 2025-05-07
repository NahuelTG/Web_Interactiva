/* eslint-disable react/no-unknown-property */
import { useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll, Preload } from '@react-three/drei'
import * as THREE from 'three'
import CircularPath from './CircularPath'
import { Particles } from './Particles'
import FloatingText from './FloatingText'
import BackgroundParticles from './BackgroundParticles'
import { CameraController } from './CameraController'
import { galleryContent } from '../assets/data/galleryContent'
import { AboutUs } from './AboutUs'
import scrollService from '../service/ScrollService' // Importar el servicio
import LazyFloatingPanel from './LazyFloatingPanel'
import PropTypes from 'prop-types'

// Creamos un contexto para el control de scroll

// --- Componente para reportar el scroll ---
const ScrollReporter = ({ onScrollUpdate }) => {
  const scroll = useScroll()

  // useFrame se ejecuta en cada frame renderizado
  useFrame(() => {
    if (onScrollUpdate) {
      // Llama a la función pasada desde App con el offset actual
      onScrollUpdate(scroll.offset)
    }
  })

  // Este componente no renderiza nada visualmente
  return null
}

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

const Scene = ({ onScrollUpdate }) => {
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
        damping={0.5}
        style={{
          position: 'absolute',
          transform: 'scaleY(-1)',
        }}
      >
        <Preload all />
        <ReverseScrollControls>
          {/* Renderiza el ScrollReporter DENTRO de ScrollControls */}
          <ScrollReporter onScrollUpdate={onScrollUpdate} />
          <CameraController />
          <CircularPath />
          <AboutUs position={[4.7, -0.6, -1.5]} rotation={[0, THREE.MathUtils.degToRad(200), 0]} />
          <LazyFloatingPanel
            position={[3.5, 0.3, 3.8]}
            rotation={[0, THREE.MathUtils.degToRad(87), 0]}
            galleryContent={galleryContent[0].VR}
            icon={galleryContent[0].Icon}
          />

          <LazyFloatingPanel
            position={[0, 0.3, 4.7]}
            rotation={[0, THREE.MathUtils.degToRad(65), 0]}
            galleryContent={galleryContent[1].MD}
            icon={galleryContent[1].Icon}
          />
          <LazyFloatingPanel
            position={[-3, 0.3, 3]}
            rotation={[0, THREE.MathUtils.degToRad(40), 0]}
            galleryContent={galleryContent[2].AR}
            icon={galleryContent[2].Icon}
          />
          <LazyFloatingPanel
            position={[-4, 0.3, 0.3]}
            rotation={[0, THREE.MathUtils.degToRad(10), 0]}
            galleryContent={galleryContent[3].AudioRuta}
            icon={galleryContent[3].Icon}
          />
          <LazyFloatingPanel
            position={[-3.2, 0.3, -2.5]}
            rotation={[0, THREE.MathUtils.degToRad(-10), 0]}
            galleryContent={galleryContent[4].RV}
            icon={galleryContent[4].Icon}
          />
          <LazyFloatingPanel
            position={[-0, 0.3, -4.2]}
            rotation={[0, THREE.MathUtils.degToRad(-40), 0]}
            galleryContent={galleryContent[5].PA}
            icon={galleryContent[5].Icon}
          />
        </ReverseScrollControls>
      </ScrollControls>

      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </Canvas>
  )
}
ScrollReporter.propTypes = {
  onScrollUpdate: PropTypes.func,
}

Scene.propTypes = {
  onScrollUpdate: PropTypes.func,
}

export default Scene
