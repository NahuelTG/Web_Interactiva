import { Text } from '@react-three/drei'
import { useState } from 'react'
//import { useFrame } from '@react-three/fiber'

const FloatingPanel = ({ position, rotation }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position}>
      {/* Panel base en 3D */}
      <mesh rotation={rotation} position={[0, 0, 0.1]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <boxGeometry args={[4, 2.5, 0.2]} />
        <meshStandardMaterial color={hovered ? '#2a2a4a' : '#1a1a2a'} transparent opacity={0.9} />

        {/* Texto principal */}
        <Text position={[0, 0.8, 0.11]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
          Panel Informativo
        </Text>

        {/* Opciones interactivas */}
        {[
          { text: 'Video UE', link: 'https://youtu.be/P6QLFeORQyg?si=LNuj7MU_7Kh5mmoy', yPos: 0.4 },
          { text: 'Niagara thunders', link: 'https://youtu.be/QFqQ4S4y-RY?si=to12x-gTaqBl7n2C', yPos: 0 },
          { text: 'Niagara Tentacles', link: 'https://youtu.be/H3doqnzj8bc?si=EbGNO73wrsMi6Ntu', yPos: -0.4 },
        ].map((option, index) => (
          <mesh
            key={index}
            position={[-1.5, option.yPos, 0.11]}
            onClick={(e) => {
              e.stopPropagation()
              window.open(option.link, '_blank')
            }}
            onPointerOver={(e) => {
              e.stopPropagation()
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={(e) => {
              document.body.style.cursor = 'auto'
            }}
          >
            <planeGeometry args={[0, 0.3]} /> {/* Área clickeable */}
            <meshStandardMaterial color={hovered ? '#4a4a8a' : '#3ff'} /> {/* Invisible pero interactivo */}
            <Text position={[0, 0, 0.01]} fontSize={0.2} color="#a0a0ff" anchorX="left" anchorY="middle">
              {`• ${option.text}`}
            </Text>
          </mesh>
        ))}

        {/* Botón 3D */}
        <mesh
          position={[1.2, -0.8, 0.11]}
          onClick={(e) => {
            e.stopPropagation()
            console.log('Botón presionado!')
          }}
        >
          <boxGeometry args={[1, 0.4, 0.1]} />
          <meshStandardMaterial color={hovered ? '#4a4a8a' : '#3ff'} />
          <Text position={[0, 0, 0.06]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
            Click aquí
          </Text>
        </mesh>
      </mesh>
    </group>
  )
}

export default FloatingPanel
