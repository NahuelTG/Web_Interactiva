/* eslint-disable react/no-unknown-property */
import { useFrame, useLoader } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import ARIcon from '../assets/images/Icons/AR.png'

export const IconFloating = ({ onClick, onPointerOver, onPointerOut, position, rotation }) => {
  const coinRef = useRef()
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const texture = useLoader(THREE.TextureLoader, ARIcon)

  useEffect(() => {
    if (texture) {
      texture.repeat.set(1, 1)
      texture.offset.set(0.2, 0.2)
      texture.center.set(0.4, 0.4)
      texture.wrapS = THREE.ClampToEdgeWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      texture.rotation = Math.PI // Rotación de 180 grados para la cara posterior
    }
  }, [texture])

  const initialRotation = new THREE.Euler(-Math.PI / 2, 0, 0)

  useFrame((state, delta) => {
    coinRef.current.rotation.z += delta * 3
    coinRef.current.position.y = hovered ? Math.sin(state.clock.elapsedTime * 8) * 0.15 : 0
    coinRef.current.scale.lerp(new THREE.Vector3(hovered ? 1.2 : 1, hovered ? 1.2 : 1, 1), 0.1)
    groupRef.current.scale.lerp(new THREE.Vector3(clicked ? 0.8 : 1, clicked ? 0.8 : 1, 1), 0.2)
  })

  return (
    <group
      ref={groupRef}
      position={position}
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
        <cylinderGeometry args={[0.4, 0.4, 0.05, 64]} />

        {/* Cara frontal */}
        <meshStandardMaterial
          map={texture}
          transparent
          side={THREE.FrontSide}
          metalness={0.9}
          roughness={0.1}
          emissive="#00ffff"
          emissiveIntensity={0.5}
          alphaTest={0.1}
        />

        {/* Cara posterior con rotación corregida */}
        <meshStandardMaterial
          map={texture}
          transparent
          side={THREE.BackSide}
          metalness={0.9}
          roughness={0.1}
          emissive="#00ffff"
          emissiveIntensity={0.5}
          alphaTest={0.1}
          rotation={Math.PI} // Rotación adicional de 180 grados
        />

        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.45, 0.02, 16, 100]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.5} transparent opacity={0.8} />
        </mesh>
      </mesh>
    </group>
  )
}
