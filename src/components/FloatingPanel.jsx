import * as THREE from 'three'
import { Text, useTexture } from '@react-three/drei'
import { useState, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import Paisaje_1 from '../assets/images/paisaje_1.jpg'
import Paisaje_2 from '../assets/images/paisaje_2.jpg'
import Paisaje_3 from '../assets/images/paisaje_3.jpg'
import Paisaje_4 from '../assets/images/paisaje_4.jpg'

const FloatingPanel = ({ position, rotation }) => {
  const [hovered, setHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [transitionProgress, setTransitionProgress] = useState(1)
  const [targetIndex, setTargetIndex] = useState(0)
  const buttonLeftRef = useRef()
  const buttonRightRef = useRef()
  const textLeftRef = useRef()
  const textRightRef = useRef()

  // Configuración de imágenes y sus links
  const images = [
    { src: Paisaje_1, link: 'https://youtu.be/P6QLFeORQyg?si=LNuj7MU_7Kh5mmoy' },
    { src: Paisaje_2, link: 'https://youtu.be/QFqQ4S4y-RY?si=to12x-gTaqBl7n2C' },
    { src: Paisaje_3, link: 'https://youtu.be/H3doqnzj8bc?si=EbGNO73wrsMi6Ntu' },
    { src: Paisaje_4, link: '#' },
  ]

  // Precargar todas las texturas
  const textures = useTexture(images.map((img) => img.src))

  // Animación de transición
  useFrame((state, delta) => {
    // Animación de transición
    if (currentImageIndex !== targetIndex) {
      const newProgress = THREE.MathUtils.damp(transitionProgress, 1, 6, delta)
      setTransitionProgress(newProgress)

      if (newProgress > 0.99) {
        setCurrentImageIndex(targetIndex)
        setTransitionProgress(1)
      }
    }

    // Animación de botones al hacer hover
    const hoverIntensity = Math.sin(state.clock.elapsedTime * 10) * 0.05 + 1
    if (buttonLeftRef.current?.hovered || buttonRightRef.current?.hovered) {
      const target = buttonLeftRef.current?.hovered ? buttonLeftRef : buttonRightRef
      target.current.scale.x = THREE.MathUtils.damp(target.current.scale.x, hoverIntensity, 8, delta)
      target.current.scale.y = THREE.MathUtils.damp(target.current.scale.y, hoverIntensity, 8, delta)
    } else {
      buttonLeftRef.current.scale.x = THREE.MathUtils.damp(buttonLeftRef.current.scale.x, 1, 8, delta)
      buttonLeftRef.current.scale.y = THREE.MathUtils.damp(buttonLeftRef.current.scale.y, 1, 8, delta)
      buttonRightRef.current.scale.x = THREE.MathUtils.damp(buttonRightRef.current.scale.x, 1, 8, delta)
      buttonRightRef.current.scale.y = THREE.MathUtils.damp(buttonRightRef.current.scale.y, 1, 8, delta)
    }

    // Animación de texto en botones
    textLeftRef.current.position.z = THREE.MathUtils.damp(
      textLeftRef.current.position.z,
      buttonLeftRef.current?.hovered ? 0.05 : 0.03,
      8,
      delta
    )
    textRightRef.current.position.z = THREE.MathUtils.damp(
      textRightRef.current.position.z,
      buttonRightRef.current?.hovered ? 0.05 : 0.03,
      8,
      delta
    )
  })

  const changeImage = (direction) => {
    // Solo permitir cambio si no hay transición en curso
    if (transitionProgress >= 0.95) {
      setTargetIndex((prev) => {
        const newIndex = (prev + direction + images.length) % images.length
        setTransitionProgress(0)
        return newIndex
      })
    }
  }

  return (
    <group position={position}>
      <mesh rotation={rotation} position={[0, 0, 0.1]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <boxGeometry args={[4, 2.5, 0.2]} />
        <meshStandardMaterial color={hovered ? '#2a2a4a' : '#1a1a2a'} transparent opacity={0.9} />

        {/* Contenedor de la imagen con transición */}
        <group position={[0, 0, 0.11]} scale={[2, 2.1, 0.1]}>
          {/* Imagen actual */}
          <mesh
            onClick={(e) => {
              e.stopPropagation()
              window.open(images[currentImageIndex].link, '_blank')
            }}
          >
            <planeGeometry args={[2, 1.2]} />
            <meshStandardMaterial map={textures[currentImageIndex]} transparent opacity={1 - transitionProgress} />
          </mesh>

          {/* Imagen siguiente */}
          <mesh>
            <planeGeometry args={[2, 1.2]} />
            <meshStandardMaterial map={textures[targetIndex]} transparent opacity={transitionProgress} />
          </mesh>
        </group>

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
            onPointerOver={() => {
              document.body.style.cursor = 'pointer'
              buttonLeftRef.current.hovered = true
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto'
              buttonLeftRef.current.hovered = false
            }}
            ref={buttonLeftRef}
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
              ref={textLeftRef}
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
            onPointerOver={() => {
              document.body.style.cursor = 'pointer'
              buttonRightRef.current.hovered = true
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto'
              buttonRightRef.current.hovered = false
            }}
            ref={buttonRightRef}
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
              ref={textRightRef}
            >
              {'>'}
            </Text>
          </mesh>
        </group>

        {/* ... (Resto del código existente) */}
      </mesh>
    </group>
  )
}

export default FloatingPanel
