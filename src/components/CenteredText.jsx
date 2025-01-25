import { Text } from '@react-three/drei'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'

const CenteredText = () => {
  const scroll = useScroll()
  const [currentText, setCurrentText] = useState('Bienvenido')

  const texts = ['Bienvenido', 'Explora el camino', 'Un mundo infinito', 'Gracias por visitar']

  useFrame(() => {
    if (scroll) {
      const progress = scroll.offset // Valor de 0 a 1
      const index = Math.min(Math.floor(progress * texts.length), texts.length - 1)
      setCurrentText(texts[index])
    }
  })

  return (
    <Text
      position={[0, 3, 0]} // Centrado
      fontSize={1.5}
      color="white"
      anchorX="center"
      anchorY="middle"
      opacity={0.9}
    >
      {currentText}
    </Text>
  )
}

export default CenteredText
