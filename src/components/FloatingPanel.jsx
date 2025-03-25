/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { Text, useTexture } from '@react-three/drei'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { ButtonsNavigationPanel } from './buttons/ButtonstNavigationPanel'
import PropTypes from 'prop-types'

const FloatingPanel = ({ position, rotation, images }) => {
  const [hovered, setHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [transitionProgress, setTransitionProgress] = useState(1)
  const [targetIndex, setTargetIndex] = useState(0)
  const buttonLeftRef = useRef()
  const buttonRightRef = useRef()
  const textLeftRef = useRef()
  const textRightRef = useRef()
  const panelRef = useRef()
  const emissiveIntensity = useRef(0)

  // Precargar todas las texturas
  const textures = useTexture(images.map((img) => img.src))

  // Animación de transición
  useFrame((state, delta) => {
    // Animación del panel principal
    if (panelRef.current) {
      // Escala suave al hacer hover
      const targetScale = hovered ? 1.02 : 1
      panelRef.current.scale.x = THREE.MathUtils.lerp(panelRef.current.scale.x, targetScale, 0.1)
      panelRef.current.scale.y = THREE.MathUtils.lerp(panelRef.current.scale.y, targetScale, 0.1)

      // Efecto de "levitación" suave
      const floatIntensity = hovered ? 0.02 : 0.01
      panelRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * floatIntensity

      // Efecto emissivo suave
      emissiveIntensity.current = THREE.MathUtils.lerp(emissiveIntensity.current, hovered ? 0.3 : 0, 0.1)
    }

    // Animación de transición
    if (currentImageIndex !== targetIndex) {
      const newProgress = THREE.MathUtils.damp(transitionProgress, 1, 6, delta)
      setTransitionProgress(newProgress)

      if (newProgress > 0.99) {
        setCurrentImageIndex(targetIndex)
        setTransitionProgress(1)
      }
    }

    const time = state.clock.elapsedTime
    const hoverIntensity = 1.05 + Math.sin(time * 10) * 0.05
    const bounceEffect = 1 + Math.abs(Math.sin(time * 20) * 0.02)
    const oscillation = Math.sin(time * 2.5) * 0.075 // Movimiento lateral suave

    if (buttonLeftRef.current?.hovered || buttonRightRef.current?.hovered) {
      const target = buttonLeftRef.current?.hovered ? buttonLeftRef : buttonRightRef

      target.current.scale.x = THREE.MathUtils.lerp(target.current.scale.x, hoverIntensity, 0.1)
      target.current.scale.y = THREE.MathUtils.lerp(target.current.scale.y, hoverIntensity, 0.1)
      target.current.rotation.z = THREE.MathUtils.lerp(target.current.rotation.z, 0.1, 0.1) // Rotación leve
    } else {
      // Movimiento de oscilación cuando NO están en hover
      buttonLeftRef.current.position.x = THREE.MathUtils.lerp(-6, oscillation, 0.49)
      buttonRightRef.current.position.x = THREE.MathUtils.lerp(2.85, -oscillation, 0.49)

      // Efecto de rebote
      buttonLeftRef.current.scale.set(
        THREE.MathUtils.lerp(buttonLeftRef.current.scale.x, bounceEffect, 0.1),
        THREE.MathUtils.lerp(buttonLeftRef.current.scale.y, bounceEffect, 0.1),
        1
      )
      buttonRightRef.current.scale.set(
        THREE.MathUtils.lerp(buttonRightRef.current.scale.x, bounceEffect, 0.1),
        THREE.MathUtils.lerp(buttonRightRef.current.scale.y, bounceEffect, 0.1),
        1
      )

      // Resetear rotación
      buttonLeftRef.current.rotation.z = THREE.MathUtils.lerp(buttonLeftRef.current.rotation.z, 0, 0.1)
      buttonRightRef.current.rotation.z = THREE.MathUtils.lerp(buttonRightRef.current.rotation.z, 0, 0.1)
    }

    // Animación del texto en el eje Z
    textLeftRef.current.position.z = THREE.MathUtils.lerp(textLeftRef.current.position.z, buttonLeftRef.current?.hovered ? 0.06 : 0.03, 0.1)
    textRightRef.current.position.z = THREE.MathUtils.lerp(
      textRightRef.current.position.z,
      buttonRightRef.current?.hovered ? 0.06 : 0.03,
      0.1
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
      <mesh
        rotation={rotation}
        position={[0, 0, 0.1]}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
        ref={panelRef} // Añadir esta referencia
      >
        <boxGeometry args={[4, 2.5, 0.2]} />
        <meshStandardMaterial color="#1a1a2a" emissive="#3ff" emissiveIntensity={emissiveIntensity.current} transparent opacity={0.9} />

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

        <ButtonsNavigationPanel position={[0.8, 0, 0.12]} images={images} setTargetIndex={setTargetIndex} />
        {/* Botones de navegación [0.8, 0, 0.12]  */}
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
      </mesh>
    </group>
  )
}

FloatingPanel.propTypes = {
  position: PropTypes.array,
  rotation: PropTypes.array,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.oneOfType([
        PropTypes.string, // Para rutas estáticas
        PropTypes.object, // Para módulos importados (como las imágenes importadas)
      ]).isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default FloatingPanel
