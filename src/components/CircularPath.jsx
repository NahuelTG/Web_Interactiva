import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import useSmoothRotation from '../hooks/useSmoothRotation' // Importamos el hook

const CircularPath = () => {
  const groupRef = useRef()
  const scroll = useScroll()
  const targetRotation = useSmoothRotation(scroll, 0.1) // Usamos el hook con suavizado

  useFrame(() => {
    if (groupRef.current) {
      const angle = -scroll.offset * Math.PI * 20 // Invertimos el sentido de la rotación
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
                emissive="white" // Luz emitida
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
