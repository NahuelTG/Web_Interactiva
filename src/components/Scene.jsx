/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from 'react'
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

// Define las posiciones para cada tamaño de pantalla
// Necesitarás ajustar estas posiciones 'small' según tu diseño
const panelPositions = {
  large: [
    [3.5, 0.3, 3.8], // Panel 1 (VR)
    [0, 0.3, 4.7], // Panel 2 (MD)
    [-3, 0.3, 3], // Panel 3 (AR)
    [-4, 0.3, 0.3], // Panel 4 (AudioRuta)
    [-3.2, 0.3, -2.5], // Panel 5 (RV)
    [-0, 0.3, -4.2], // Panel 6 (PA)
  ],
  small: [
    [3, 0.35, 3.3], // Panel 1 (VR)
    //[3.5, 0.3, 3.8]
    [0.5, 0.35, 4.15], // Panel 2 (MD)
    [-2.525, 0.35, 3], // Panel 3 (AR)
    [-3.82, 0.35, 0.3], // Panel 4 (AudioRuta)
    [-3, 0.35, -2.5], // Panel 5 (RV)
    [-0.5, 0.35, -4.08], // Panel 6 (PA)
  ],
}

const panelRotations = {
  large: [
    [0, THREE.MathUtils.degToRad(87), 0], // Panel 1 (VR)
    [0, THREE.MathUtils.degToRad(65), 0], // Panel 2 (MD)
    [0, THREE.MathUtils.degToRad(40), 0], // Panel 3 (AR)
    [0, THREE.MathUtils.degToRad(10), 0], // Panel 4 (AudioRuta)
    [0, THREE.MathUtils.degToRad(-10), 0], // Panel 5 (RV)
    [0, THREE.MathUtils.degToRad(-40), 0], // Panel 6 (PA)
  ],
  small: [
    [0, THREE.MathUtils.degToRad(75), 0], // Panel 1 (VR)
    [0, THREE.MathUtils.degToRad(55), 0], // Panel 2 (MD)
    [0, THREE.MathUtils.degToRad(30), 0], // Panel 3 (AR)
    [0, THREE.MathUtils.degToRad(0), 0], // Panel 4 (AudioRuta)
    [0, THREE.MathUtils.degToRad(-25), 0], // Panel 5 (RV)
    [0, THREE.MathUtils.degToRad(-50), 0], // Panel 6 (PA)
  ],
}

const Scene = ({ onScrollUpdate }) => {
  // State for responsive scale
  const [panelScale, setPanelScale] = useState(0.5)
  const [currentPanelPositions, setCurrentPanelPositions] = useState(panelPositions.large)
  const [currentPanelRotations, setCurrentPanelRotations] = useState(panelRotations.large)
  const [PositionAbout, setPositionAbout] = useState([])
  const [RotationAbout, setRotationAbout] = useState()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPanelScale(0.3)
        setCurrentPanelPositions(panelPositions.small) // Cambia al conjunto de posiciones 'small'
        setCurrentPanelRotations(panelRotations.small) // Cambia al conjunto de posiciones 'small'
        setPositionAbout([4.825, 0.1, -1.5])
        setRotationAbout([0, THREE.MathUtils.degToRad(198), 0])
      } else {
        setPanelScale(0.5)
        setCurrentPanelPositions(panelPositions.large) // Cambia al conjunto de posiciones 'large'
        setCurrentPanelRotations(panelRotations.large) // Cambia al conjunto de posiciones 'large'
        setPositionAbout([5, -0.5, -1.5])
        setRotationAbout([0, THREE.MathUtils.degToRad(200), 0])
      }
    }

    // Set initial scale
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty dependency array means this effect runs once on mount and cleans up on unmount
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
          <AboutUs position={PositionAbout} rotation={RotationAbout} />
          <LazyFloatingPanel
            position={currentPanelPositions[0]}
            rotation={currentPanelRotations[0]}
            galleryContent={galleryContent[0].VR}
            icon={galleryContent[0].Icon}
            scale={panelScale}
          />

          <LazyFloatingPanel
            position={currentPanelPositions[1]}
            rotation={currentPanelRotations[1]}
            galleryContent={galleryContent[1].MD}
            icon={galleryContent[1].Icon}
            scale={panelScale}
          />
          <LazyFloatingPanel
            position={currentPanelPositions[2]}
            rotation={currentPanelRotations[2]}
            galleryContent={galleryContent[2].AR}
            icon={galleryContent[2].Icon}
            scale={panelScale}
          />
          <LazyFloatingPanel
            position={currentPanelPositions[3]}
            rotation={currentPanelRotations[3]}
            galleryContent={galleryContent[3].AudioRuta}
            icon={galleryContent[3].Icon}
            scale={panelScale}
          />
          <LazyFloatingPanel
            position={currentPanelPositions[4]}
            rotation={currentPanelRotations[4]}
            galleryContent={galleryContent[4].RV}
            icon={galleryContent[4].Icon}
            scale={panelScale}
          />
          <LazyFloatingPanel
            position={currentPanelPositions[5]}
            rotation={currentPanelRotations[5]}
            galleryContent={galleryContent[5].PA}
            icon={galleryContent[5].Icon}
            scale={panelScale}
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
