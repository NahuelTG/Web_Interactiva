/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useState, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { PanelTitle } from './PanelTitle'
import { ButtonsNavigationPanel } from './buttons/ButtonstNavigationPanel'
import PropTypes from 'prop-types'

const FloatingPanel = ({ position, rotation, galleryContent, icon, scale = 0.1 }) => {
  const [hovered, setHovered] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [transitionProgress, setTransitionProgress] = useState(1)
  const [targetIndex, setTargetIndex] = useState(0)
  const panelRef = useRef()
  const emissiveIntensity = useRef(0)

  // Precargar todas las texturas
  const textures = useTexture(galleryContent.map((img) => img.img))

  // Animación de transición
  useFrame((state, delta) => {
    // Animación del panel principal
    if (panelRef.current) {
      // Escala suave al hacer hover
      const targetScale = hovered ? 1.02 : 1
      panelRef.current.scale.x = THREE.MathUtils.lerp(panelRef.current.scale.x, targetScale, 0.1)
      panelRef.current.scale.y = THREE.MathUtils.lerp(panelRef.current.scale.y, targetScale, 0.1)

      // Efecto de "levitación" suave
      const floatIntensity = hovered ? 0.02 : 0.01
      panelRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * floatIntensity

      // Efecto emissivo suave
      emissiveIntensity.current = THREE.MathUtils.lerp(emissiveIntensity.current, hovered ? 0.3 : 0, 0.1)
    }

    // Animación de transición
    if (currentIndex !== targetIndex) {
      const newProgress = THREE.MathUtils.damp(transitionProgress, 1, 6, delta)
      setTransitionProgress(newProgress)

      if (newProgress > 0.99) {
        setCurrentIndex(targetIndex)
        setTransitionProgress(1)
      }
    } else if (transitionProgress < 1 && currentIndex === targetIndex) {
      const newProgress = THREE.MathUtils.damp(transitionProgress, 1, 6, delta)
      setTransitionProgress(newProgress)
    }
  })

  //Responsive panel texts
  const [panelTextPositition, setTextPositition] = useState([3.2, 0, 0.2])
  const [panelTitleScale, setTitleScale] = useState(1)
  const [panelTextRotation, setTextRotation] = useState([0, THREE.MathUtils.degToRad(-30), 0])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTextPositition([-1.5, -2.25, 0.2])
        setTextRotation([0, THREE.MathUtils.degToRad(0), 0])
        setTitleScale(0.5)
      } else {
        setTextPositition([3.2, 0, 0.2])
        setTextRotation([0, THREE.MathUtils.degToRad(-30), 0])
        setTitleScale(1)
      }
    }
    handleResize()
    // Add event listener
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <group position={position} scale={scale}>
      <mesh
        rotation={rotation}
        position={[0, 0, 0.1]}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
        ref={panelRef} // Añadir esta referencia
      >
        <boxGeometry args={[4, 2.5, 0.2]} />
        <meshStandardMaterial color="#1a1a2a" emissive="#3ff" emissiveIntensity={emissiveIntensity.current} transparent opacity={0.9} />

        {/* Contenedor de la imagen con transición */}
        <group position={[0, 0, 0.11]} scale={[2, 2.1, 0.1]}>
          {/* Imagen actual (la que se desvanece) */}
          <mesh
            onClick={(e) => {
              e.stopPropagation()
              window.open(galleryContent[targetIndex].link, '_blank')
            }}
          >
            <planeGeometry args={[2, 1.2]} />
            {/* La imagen que se desvanece sigue usando currentIndex */}
            <meshStandardMaterial map={textures[currentIndex]} transparent opacity={1 - transitionProgress} />
          </mesh>

          {/* Imagen siguiente (la que aparece) */}

          <mesh
            onClick={(e) => {
              // También podrías añadir el onClick aquí por si acaso, aunque el de arriba debería cubrirlo
              e.stopPropagation()
              window.open(galleryContent[targetIndex].link, '_blank')
            }}
          >
            <planeGeometry args={[2, 1.2]} />
            <meshStandardMaterial map={textures[targetIndex]} transparent opacity={transitionProgress} />
          </mesh>
        </group>

        <ButtonsNavigationPanel
          position={[0.8, 0, 0.12]}
          galleryContent={galleryContent}
          setTargetIndex={setTargetIndex}
          totalItems={galleryContent.length}
          transitionProgress={transitionProgress}
          setTransitionProgress={setTransitionProgress}
          currentIndex={currentIndex}
        />
        <PanelTitle
          line_1={galleryContent[targetIndex].line_1}
          line_2={galleryContent[targetIndex].line_2}
          line_3={galleryContent[targetIndex].line_3}
          line_4={galleryContent[targetIndex].line_4}
          line_5={galleryContent[targetIndex].line_5}
          video_title={galleryContent[targetIndex].video_title}
          icon={icon}
          scale={panelTitleScale}
          position={panelTextPositition}
          rotation={panelTextRotation}
          transitionProgress={transitionProgress} // Pasar el progreso de transición
        />
      </mesh>
    </group>
  )
}

FloatingPanel.propTypes = {
  position: PropTypes.array,
  rotation: PropTypes.array,
  scale: PropTypes.number,
  line_1: PropTypes.string,
  line_2: PropTypes.string,
  line_3: PropTypes.string,
  line_4: PropTypes.string,
  line_5: PropTypes.string,
  galleryContent: PropTypes.arrayOf(
    PropTypes.shape({
      video_title: PropTypes.string.isRequired,
      line_1: PropTypes.string.isRequired,
      line_2: PropTypes.string.isRequired,
      line_3: PropTypes.string.isRequired,
      line_4: PropTypes.string.isRequired,
      line_5: PropTypes.string.isRequired,
      src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  icon: PropTypes.string.isRequired,
}

export default FloatingPanel
