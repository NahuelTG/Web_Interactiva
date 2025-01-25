import { Text } from '@react-three/drei'

const FloatingText = () => {
  return (
    <Text position={[0, 2, -5]} fontSize={1} color="white" anchorX="center" anchorY="middle">
      ¡Bienvenido a mi mundo!
    </Text>
  )
}

export default FloatingText
