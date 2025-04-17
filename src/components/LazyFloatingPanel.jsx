// src/components/LazyFloatingPanel.jsx
import { useThree } from '@react-three/fiber'
import { useState, useEffect } from 'react'
import FloatingPanel from './FloatingPanel'
import * as THREE from 'three'
import PropTypes from 'prop-types'

const LazyFloatingPanel = ({ position, rotation, galleryContent, icon, scale }) => {
  const { camera } = useThree()
  const [visible, setVisible] = useState(false)
  const panelPos = new THREE.Vector3(...position)

  useEffect(() => {
    const checkVisibility = () => {
      const distance = camera.position.distanceTo(panelPos)
      setVisible(distance < 2) // Solo renderiza si está cerca (ajustable)
    }

    checkVisibility()
    const interval = setInterval(checkVisibility, 500)
    return () => clearInterval(interval)
  }, [camera, panelPos])

  if (!visible) return null
  return <FloatingPanel position={position} rotation={rotation} galleryContent={galleryContent} icon={icon} scale={scale} />
}

LazyFloatingPanel.propTypes = {
  position: PropTypes.array.isRequired,
  rotation: PropTypes.array.isRequired,
  galleryContent: PropTypes.array.isRequired,
  icon: PropTypes.string.isRequired,
  scale: PropTypes.number,
}

export default LazyFloatingPanel
