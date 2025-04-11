/* eslint-disable react/no-unknown-property */
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

const CircularPath = () => {
  const groupRef = useRef()
  const scroll = useScroll()

  useFrame(() => {
    if (groupRef.current) {
      // Usar scroll invertido para la rotación
      const invertedOffset = 1 + scroll.offset
      const angle = invertedOffset * Math.PI * 20
      groupRef.current.rotation.y = angle
    }
  })

  const numSpheres = 30
  const radii = [5.2, 5, 4.8, 4.6, 5.4] // Tres hileras paralelas con diferentes radios

  return (
    <group ref={groupRef}>
      {radii.map((radius, rowIndex) =>
        Array.from({ length: numSpheres }).map((_, i) => {
          const angle = (i / numSpheres) * Math.PI * 2
          const hue = (i / numSpheres + scroll.offset) % 1 // Color dinámico
          return (
            <mesh key={`${rowIndex}-${i}`} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
              <sphereGeometry args={[0.02, 16, 1]} />
              <meshStandardMaterial
                color={`hsl(${hue * 360}, 70%, 50%)`}
                emissive="#3fffff" // Luz emitida
                emissiveIntensity={0.5} // Intensidad del brillo
                metalness={0.5} // Nivel de metal
                roughness={0.1} // Suavidad del material
              />
            </mesh>
          )
        })
      )}
    </group>
  )
}

export default CircularPath
