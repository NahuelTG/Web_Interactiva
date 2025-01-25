import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import useSmoothRotation from '../hooks/useSmoothRotation' // Importamos el hook

const CircularPath = () => {
  const groupRef = useRef()
  const scroll = useScroll()
  const targetRotation = useSmoothRotation(scroll, 0.1) // Usamos el hook con suavizado

  // Usamos el valor interpolado del hook para rotar el grupo
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = targetRotation.current // Aplicamos la rotación suave
    }
  })

  const radius = 5
  const numSpheres = 30

  useFrame(() => {
    if (groupRef.current) {
      const angle = scroll.offset * Math.PI * 20
      groupRef.current.rotation.y = angle

      // Ajustar opacidad según el progreso
      groupRef.current.children.forEach((child, index) => {
        const fadeFactor = 1 - Math.abs(index / groupRef.current.children.length - angle)
        child.material.opacity = Math.max(0, fadeFactor) // Suavizamos opacidad
        child.material.transparent = true
      })
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: numSpheres }).map((_, i) => {
        const angle = (i / numSpheres) * Math.PI * 2
        const hue = (i / numSpheres + scroll.offset) % 1 // Color dinámico
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color={`hsl(${hue * 360}, 70%, 50%)`}
              emissive="white" // Luz emitida
              emissiveIntensity={0.3} // Intensidad del brillo
              metalness={0.5} // Nivel de metal
              roughness={0.1} // Suavidad del material
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default CircularPath
