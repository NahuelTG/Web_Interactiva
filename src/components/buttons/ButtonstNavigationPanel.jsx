/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { useState, useRef } from 'react'
import PropTypes from 'prop-types'

export const ButtonsNavigationPanel = ({ position }) => {
  const [transitionProgress, setTransitionProgress] = useState(1)
  const [targetIndex, setTargetIndex] = useState(0)
  const buttonLeftRef = useRef()
  const buttonRightRef = useRef()
  const textLeftRef = useRef()
  const textRightRef = useRef()

  const images = [
    { src: Paisaje_1, link: 'https://youtu.be/P6QLFeORQyg?si=LNuj7MU_7Kh5mmoy' },
    { src: Paisaje_2, link: 'https://youtu.be/QFqQ4S4y-RY?si=to12x-gTaqBl7n2C' },
    { src: Paisaje_3, link: 'https://youtu.be/H3doqnzj8bc?si=EbGNO73wrsMi6Ntu' },
    { src: Paisaje_4, link: '#' },
  ]

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
  )
}

ButtonsNavigationPanel.propTypes = {
  position: PropTypes.array,
}
