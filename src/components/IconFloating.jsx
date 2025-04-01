/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import ARIcon from '../assets/images/Icons/AR.png' // Asegúrate que la ruta sea correcta

export const IconFloating = ({ onClick, onPointerOver, onPointerOut }) => {
  const coinRef = useRef()
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const texture = useLoader(THREE.TextureLoader, ARIcon)

  // Configuración inicial de rotación horizontal
  const initialRotation = new THREE.Euler(-Math.PI / 2, 0, 0)

  useFrame((state, delta) => {
    // Rotación horizontal continua
    coinRef.current.rotation.z += delta * 3

    // Animación de hover
    coinRef.current.position.y = hovered ? Math.sin(state.clock.elapsedTime * 8) * 0.15 : 0

    // Escala animada
    coinRef.current.scale.lerp(new THREE.Vector3(hovered ? 1.2 : 1, hovered ? 1.2 : 1, 1), 0.1)

    // Efecto de click
    groupRef.current.scale.lerp(new THREE.Vector3(clicked ? 0.8 : 1, clicked ? 0.8 : 1, 1), 0.2)
  })

  return (
    <group
      ref={groupRef}
      rotation={initialRotation}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        onPointerOver?.(e)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
        onPointerOut?.(e)
      }}
      onClick={(e) => {
        e.stopPropagation()
        setClicked(true)
        setTimeout(() => setClicked(false), 200)
        onClick?.(e)
      }}
    >
      <mesh ref={coinRef}>
        {/* Geometría de moneda */}
        <cylinderGeometry args={[0.4, 0.4, 0.05, 64]} />

        {/* Material para ambas caras con icono */}
        <meshStandardMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
          metalness={0.9}
          roughness={0.1}
          emissive="#00ffff"
          emissiveIntensity={0.5}
          alphaTest={0.1}
        />

        {/* Borde luminoso */}
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.45, 0.02, 16, 100]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.5} transparent opacity={0.8} />
        </mesh>
      </mesh>
    </group>
  )
}
