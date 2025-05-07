// src/components/LazyFloatingPanel.jsx
import { useThree, useFrame } from '@react-three/fiber'
import { useState, useRef } from 'react'
import FloatingPanel from './FloatingPanel'
import * as THREE from 'three'
import PropTypes from 'prop-types'
import { useSpring, animated } from '@react-spring/three'

const LazyFloatingPanel = ({ position, rotation, galleryContent, icon, scale = 0.5 }) => {
  const { camera } = useThree()
  const [shouldRender, setShouldRender] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const panelPos = new THREE.Vector3(...position)
  const groupRef = useRef()

  // Distancias para controlar la visibilidad y la transición
  const APPEAR_DISTANCE = 5.5 // Comenzar a aparecer

  // Configuración de la animación con spring
  const { opacity, panelScale } = useSpring({
    opacity: isVisible ? 1 : 0,
    panelScale: isVisible ? scale : scale * 0.1,
    config: { mass: 1, tension: 120, friction: 14 },
    onRest: () => {
      // Solo desmontamos el componente cuando la animación de salida ha terminado
      if (!isVisible) {
        setShouldRender(false)
      }
    },
  })

  useFrame(() => {
    const distance = camera.position.distanceTo(panelPos)

    if (distance < APPEAR_DISTANCE) {
      if (!shouldRender) {
        setShouldRender(true) // Primero, asegúrate que el DOM virtual exista
      }
      // Una vez que shouldRender es true, el siguiente frame o un micro-task después,
      // el componente interno estará "listo" para la animación.
      // Podrías incluso esperar un frame si es necesario, o simplemente activar isVisible.
      if (shouldRender && !isVisible) {
        // Verifica que shouldRender ya esté activo
        setIsVisible(true)
      }
    } else if (distance > APPEAR_DISTANCE && isVisible) {
      setIsVisible(false)
    }
  })

  // Si no debemos renderizar nada, retornamos null
  if (!shouldRender) return null

  return (
    <animated.group ref={groupRef} position={position} rotation={rotation} scale={panelScale} opacity={opacity}>
      <animated.mesh visible={opacity.to((o) => o > 0.01)}>
        <FloatingPanel position={position} rotation={rotation} galleryContent={galleryContent} icon={icon} scale={scale} />
      </animated.mesh>
    </animated.group>
  )
}

LazyFloatingPanel.propTypes = {
  position: PropTypes.array.isRequired,
  rotation: PropTypes.array.isRequired,
  galleryContent: PropTypes.array.isRequired,
  icon: PropTypes.string.isRequired,
  scale: PropTypes.number,
}

export default LazyFloatingPanel
