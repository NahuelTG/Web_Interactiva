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
  const APPEAR_DISTANCE = 5 // Comenzar a aparecer

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

    // Si está entrando en rango de visibilidad
    if (distance < APPEAR_DISTANCE && !isVisible) {
      // Primero aseguramos que se renderice
      setShouldRender(true)
      // Pequeño timeout para asegurar que el componente está montado
      setTimeout(() => {
        setIsVisible(true)
      }, 10)
    }

    // Si está saliendo del rango de visibilidad
    if (distance > APPEAR_DISTANCE && isVisible) {
      // Iniciamos la animación de salida
      setIsVisible(false)
      // El desmontaje se hará en onRest cuando la animación termine
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
