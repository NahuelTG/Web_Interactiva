import { Text } from '@react-three/drei'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'

const DynamicText = () => {
  const scroll = useScroll() // Hook para manejar el scroll
  const [currentText, setCurrentText] = useState('Bienvenido a mi mundo!')

  // Lista de textos que cambian según el scroll
  const texts = ['Bienvenido a mi mundo!', 'Descubre la magia del 3D.', 'Explora un camino infinito.', 'Gracias por visitar!']

  useFrame(() => {
    if (scroll) {
      const progress = scroll.offset // Progreso del scroll (0 a 1)
      const index = Math.floor(progress * texts.length) // Cálculo del índice del texto
      setCurrentText(texts[index] || texts[texts.length - 1])
    }
  })

  return (
    <Text
      position={[0, 5, -5]} // Posición del texto
      fontSize={1}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {currentText}
    </Text>
  )
}

export default DynamicText
