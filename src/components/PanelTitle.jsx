/* eslint-disable react/no-unknown-property */
import { Text } from '@react-three/drei'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { IconFloating } from './IconFloating'
import { ParticlesSphere } from './effects/ParticlesSphere'

export const PanelTitle = ({ video_title, title, subtitle, position, rotation, scale = 1, transitionProgress }) => {
  const titleRef = useRef()
  const subtitleRef = useRef()
  const videoTitleRef = useRef()
  const sphereRef = useRef()
  const barRef = useRef()
  const shockwaveRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [clickAnimProgress, setClickAnimProgress] = useState(0)
  const [showShockwave, setShowShockwave] = useState(false)
  const [particleSize, setParticleSize] = useState(1)
  const initialY = useRef(1)
  const timeOffset = useRef(Math.random() * 1000)
  const [particlesVisible, setParticlesVisible] = useState(true)

  useFrame((state, delta) => {
    // Animación de entrada/salida
    const opacity = 1 - Math.abs(transitionProgress - 0.5) * 2

    titleRef.current.material.opacity = opacity
    subtitleRef.current.material.opacity = opacity
    videoTitleRef.current.material.opacity = opacity

    // Animación base flotante
    sphereRef.current.position.y = initialY.current + Math.sin(state.clock.elapsedTime * 2 + timeOffset.current) * 0.1

    // Efecto de click
    if (clicked) {
      setClickAnimProgress((prev) => Math.min(prev + delta * 5, 1))

      // Escala animada con curva de bounce
      const bounceScale = 1 + Math.sin(clickAnimProgress * Math.PI) * 0.5
      sphereRef.current.scale.set(bounceScale, bounceScale, bounceScale)
    } else {
      // Reset de animaciones
      sphereRef.current.scale.x = THREE.MathUtils.damp(sphereRef.current.scale.x, 1, 6, delta)
      sphereRef.current.scale.y = THREE.MathUtils.damp(sphereRef.current.scale.y, 1, 6, delta)
    }

    // Animación de tamaño de partículas
    if (particleSize !== 1) {
      setParticleSize(THREE.MathUtils.damp(particleSize, 1, 6, delta))
    }

    // Animación de onda de choque
    if (showShockwave && shockwaveRef.current) {
      shockwaveRef.current.scale.x = THREE.MathUtils.damp(shockwaveRef.current.scale.x, 5, 4, delta)
      shockwaveRef.current.scale.y = THREE.MathUtils.damp(shockwaveRef.current.scale.y, 5, 4, delta)
      shockwaveRef.current.material.opacity = THREE.MathUtils.damp(shockwaveRef.current.material.opacity, 0, 4, delta)
    }

    // Animación de la barra
    barRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(barRef.current.material.emissiveIntensity, hovered ? 2 : 0.5, 0.1)
  })

  const handleClick = (e) => {
    e.stopPropagation()
    setClicked(true)
    setShowShockwave(true)
    setParticleSize(5) // Tamaño máximo de partículas
    setParticlesVisible(true)

    // Resetear efectos después de 0.3s para mayor velocidad
    setTimeout(() => {
      setClicked(false)
      setClickAnimProgress(0)
      setShowShockwave(false)
      setParticleSize(1) // Tamaño máximo de partículas
      shockwaveRef.current.scale.set(0.1, 0.1, 0.1)
      shockwaveRef.current.material.opacity = 1
    }, 500)
  }

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Text
        ref={videoTitleRef}
        position={[0, 0.5, 0]} // Ajustado a la derecha
        fontSize={0.5}
        color="#3fffff"
        anchorX="left"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#99ffff"
        strokeWidth={0.005}
        strokeColor="#ffffff"
        depthOffset={1}
        letterSpacing={0.05}
        transparent
      >
        {video_title}
      </Text>
      <Text
        ref={titleRef}
        position={[0, -0.2, 0]} // Ajustado a la derecha
        fontSize={0.3}
        color="#cceeff"
        anchorX="left"
        anchorY="middle"
        lineHeight={1.2}
        textAlign="right"
        fillOpacity={0.8}
        outlineWidth={0.01}
        outlineColor="#66ccff"
        depthOffset={0.5}
        letterSpacing={0.03}
        transparent
      >
        {title}
      </Text>

      <Text
        ref={subtitleRef}
        position={[0, -0.7, 0]} // Ajustado a la derecha
        fontSize={0.3}
        color="#cceeff"
        anchorX="left"
        anchorY="middle"
        lineHeight={1.2}
        textAlign="right"
        fillOpacity={0.8}
        outlineWidth={0.01}
        outlineColor="#66ccff"
        depthOffset={0.5}
        letterSpacing={0.03}
        transparent
      >
        {subtitle}
      </Text>

      {/* Barra interactiva */}
      <mesh ref={barRef} position={[-0.6, -0.3, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <cylinderGeometry args={[0.03, 0.03, 2, 32]} />
        <meshPhongMaterial color="#00ffff" emissive="#00ff88" emissiveIntensity={0.5} />
      </mesh>

      {/* Esfera principal */}
      <mesh
        ref={sphereRef}
        position={[-0.6, initialY.current, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshPhongMaterial color="#00ffff" emissive="#006666" emissiveIntensity={0.8} shininess={100} />
      </mesh>

      <IconFloating
        ref={sphereRef}
        position={[-0.6, initialY.current, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      />

      {/* Onda de choque */}
      {showShockwave && (
        <mesh ref={shockwaveRef} position={[-0.6, initialY.current, 0]}>
          <ringGeometry args={[0.1, 0.15, 32]} />
          <meshStandardMaterial color="#00ffff" transparent opacity={1} emissive="#00ffff" emissiveIntensity={2} />
        </mesh>
      )}

      {/* Efecto de partículas ajustado */}
      <ParticlesSphere
        position={[-0.6, initialY.current, 0]}
        size={particleSize}
        visible={particlesVisible}
        radius={0.3}
        color="#00ffff"
        speed={1.5}
      />
    </group>
  )
}

PanelTitle.propTypes = {
  texto: PropTypes.string,
  position: PropTypes.array,
  rotation: PropTypes.array,
  scale: PropTypes.number,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  video_title: PropTypes.string,
  transitionProgress: PropTypes.func.isRequired,
}

PanelTitle.defaultProps = {
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  scale: 1,
}
