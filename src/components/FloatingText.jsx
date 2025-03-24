import { Text } from '@react-three/drei'
import PropTypes from 'prop-types'

const FloatingText = ({ texto, position, rotation }) => {
  return (
    <Text position={position} rotation={rotation} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
      {texto}
    </Text>
  )
}

FloatingText.propTypes = {
  texto: PropTypes.string,
  position: PropTypes.array,
  rotation: PropTypes.array,
}

export default FloatingText
