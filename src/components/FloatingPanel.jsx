/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useState, useRef } from 'react'
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
    }
  })

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
          {/* Imagen actual */}
          <mesh
            onClick={(e) => {
              e.stopPropagation()
              window.open(galleryContent[currentIndex].link, '_blank')
            }}
          >
            <planeGeometry args={[2, 1.2]} />
            <meshStandardMaterial map={textures[currentIndex]} transparent opacity={1 - transitionProgress} />
          </mesh>

          {/* Imagen siguiente */}
          <mesh>
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
          position={[3.2, 0, 0.2]}
          rotation={[0, THREE.MathUtils.degToRad(-30), 0]}
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
