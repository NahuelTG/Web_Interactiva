import { Text } from '@react-three/drei'
import { useState } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import Paisaje_1 from '../assets/images/paisaje_1.jpg'
import Paisaje_2 from '../assets/images/paisaje_2.jpg'
import Paisaje_3 from '../assets/images/paisaje_3.jpg'
import Paisaje_4 from '../assets/images/paisaje_4.jpg'

const FloatingPanel = ({ position, rotation }) => {
  const [hovered, setHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Configuración de imágenes y sus links
  const images = [
    { src: Paisaje_1, link: 'https://youtu.be/P6QLFeORQyg?si=LNuj7MU_7Kh5mmoy' },
    { src: Paisaje_2, link: 'https://youtu.be/QFqQ4S4y-RY?si=to12x-gTaqBl7n2C' },
    { src: Paisaje_3, link: 'https://youtu.be/H3doqnzj8bc?si=EbGNO73wrsMi6Ntu' },
    { src: Paisaje_4, link: '#' }, // Agrega el link correspondiente
  ]

  // Cargar textura de la imagen actual
  const texture = useTexture(images[currentImageIndex].src)

  const changeImage = (direction) => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev + direction
      return (newIndex + images.length) % images.length
    })
  }

  return (
    <group position={position}>
      <mesh rotation={rotation} position={[0, 0, 0.1]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <boxGeometry args={[4, 2.5, 0.2]} />
        <meshStandardMaterial color={hovered ? '#2a2a4a' : '#1a1a2a'} transparent opacity={0.9} />

        {/* Contenedor de la imagen */}
        <mesh
          position={[0, 0, 0.11]}
          scale={[2, 2.1, 0.1]}
          onClick={(e) => {
            e.stopPropagation()
            window.open(images[currentImageIndex].link, '_blank')
          }}
        >
          <planeGeometry args={[2, 1.2]} />
          <meshStandardMaterial map={texture} />
        </mesh>

        {/* Botones de navegación */}
        <group position={[0.8, 0, 0.12]}>
          {/* Botón izquierdo */}
          <mesh
            position={[-3, 0, 0]}
            rotation={[THREE.MathUtils.degToRad(90), 0, 0]}
            onClick={(e) => {
              e.stopPropagation()
              changeImage(-1)
            }}
            onPointerOver={() => (document.body.style.cursor = 'pointer')}
            onPointerOut={() => (document.body.style.cursor = 'auto')}
          >
            <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
            <meshStandardMaterial color="#3ff" />
            <Text
              position={[0, 0.1, 0.03]}
              rotation={[THREE.MathUtils.degToRad(90), 0, 0]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {'<'}
            </Text>
          </mesh>

          {/* Botón derecho */}
          <mesh
            position={[1.4, 0, 0]}
            rotation={[THREE.MathUtils.degToRad(90), 0, 0]}
            onClick={(e) => {
              e.stopPropagation()
              changeImage(1)
            }}
            onPointerOver={() => (document.body.style.cursor = 'pointer')}
            onPointerOut={() => (document.body.style.cursor = 'auto')}
          >
            <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
            <meshStandardMaterial color="#3ff" />
            <Text
              position={[0, 0.1, 0.03]}
              rotation={[THREE.MathUtils.degToRad(90), 0, 0]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {'>'}
            </Text>
          </mesh>
        </group>

        {/* ... (Mantén el resto de tu código existente) */}
      </mesh>
    </group>
  )
}

export default FloatingPanel
