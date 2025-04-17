/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import PropTypes from 'prop-types'

export const ButtonsNavigationPanel = ({ position, setTargetIndex, totalItems, transitionProgress, setTransitionProgress }) => {
  const buttonLeftRef = useRef()
  const buttonRightRef = useRef()
  const textLeftRef = useRef()
  const textRightRef = useRef()

  useFrame((state) => {
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

  const changeMedia = (direction) => {
    if (transitionProgress >= 0.95) {
      setTargetIndex((prev) => {
        const newIndex = (prev + direction + totalItems) % totalItems
        setTransitionProgress(0)
        return newIndex
      })
    }
  }
  return (
    <group position={position}>
      {/* Botón izquierdo */}
      <mesh
        position={[-3, 0, 0]}
        rotation={[THREE.MathUtils.degToRad(90), 0, 0]}
        onClick={(e) => {
          e.stopPropagation()
          changeMedia(-1)
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
          changeMedia(1)
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
          rotation={[THREE.MathUtils.degToRad(-90), 0, 0]}
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
  )
}

ButtonsNavigationPanel.propTypes = {
  position: PropTypes.array,
  setTargetIndex: PropTypes.func.isRequired,
  transitionProgress: PropTypes.func.isRequired,
  setTransitionProgress: PropTypes.func.isRequired,
  totalItems: PropTypes.number,
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
