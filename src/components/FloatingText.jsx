import { Text } from '@react-three/drei'

const FloatingText = () => {
  return (
    <Text position={[0, 0, -7]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
      ¡Bienvenido a mi mundo!
    </Text>
  )
}

export default FloatingText
