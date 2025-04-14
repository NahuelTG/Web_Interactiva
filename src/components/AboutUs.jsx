/* eslint-disable react/no-unknown-property */
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import SummergoLogo from '../assets/images/SummergoLogo.png' // Importación directa
import PropTypes from 'prop-types'

export const Title = ({ position, rotation }) => {
  const texture = useLoader(THREE.TextureLoader, SummergoLogo)

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[0.5, 0.17]} /> {/* Ajusta según relación de aspecto de tu logo */}
      <meshStandardMaterial map={texture} transparent opacity={1} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

Title.propTypes = {
  position: PropTypes.array,
  rotation: PropTypes.array,
}
