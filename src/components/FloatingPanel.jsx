import { Text, Html } from '@react-three/drei'
import { useState } from 'react'
import { useFrame } from '@react-three/fiber'

const FloatingPanel = ({ position = [0, 1.5, -15] }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position}>
      {/* Panel base en 3D */}
      <mesh
        position={[0, 0, 0.1]} // Pequeño offset para el texto
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[4, 2.5, 0.2]} /> {/* Ancho, Alto, Profundidad */}
        <meshStandardMaterial color={hovered ? '#2a2a4a' : '#1a1a2a'} transparent opacity={0.9} />
        {/* Texto principal */}
        <Text
          position={[0, 0.8, 0.11]} // Ligeramente frente al panel
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Panel Informativo
        </Text>
        {/* Lista de items */}
        <Text position={[-1.5, 0, 0.11]} fontSize={0.2} color="#a0a0ff" anchorX="left" anchorY="middle">
          {`• Opción 1\n• Opción 2\n• Opción 3`}
        </Text>
        {/* Botón 3D */}
        <mesh
          position={[1.2, -0.8, 0.11]}
          onClick={(e) => {
            e.stopPropagation()
            console.log('Botón presionado!')
          }}
        >
          <boxGeometry args={[1, 0.4, 0.1]} />
          <meshStandardMaterial color={hovered ? '#4a4a8a' : '#3a3a7a'} />
          <Text position={[0, 0, 0.06]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
            Click aquí
          </Text>
        </mesh>
      </mesh>
    </group>
  )
}

export default FloatingPanel
