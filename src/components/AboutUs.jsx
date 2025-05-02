/* eslint-disable react/no-unknown-property */
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'
import PropTypes from 'prop-types'
import { Text } from '@react-three/drei'
//import { Instagram, Facebook, Tiktok, Email } from '../assets/svg/index'
import SummergoLogo from '../assets/images/SummergoLogo.png'

export const AboutUs = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const texture = useLoader(TextureLoader, SummergoLogo)
  const textLines = [
    'Somos un laboratorio creativo que fusiona arte, tecnología y cultura. ',
    'Creamos experiencias inmersivas en VR, AR y más. ',
    'Sumérgete y co-crea con nosotros.',
  ]

  //const iconComponents = [Instagram, Facebook, Tiktok, Email]

  return (
    <group position={position} rotation={rotation}>
      {/* Logo */}
      <mesh position={[0, 1.3, 0]}>
        <planeGeometry args={[0.5, 0.17]} />
        <meshStandardMaterial map={texture} transparent opacity={1.5} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Text lines */}
      {textLines.map((line, i) => (
        <Text key={i} fontSize={0.07} color="white" anchorX="center" anchorY="middle" position={[0, 1.1 - i * 0.12, 0]}>
          {line}
        </Text>
      ))}

      {/* Icon buttons */}
      {/* <group position={[0, -0.2, 0]}>
        {iconComponents.map((Icon, i) => {
          const x = (i - (iconComponents.length - 1) / 2) * 0.4
          return (
            <group key={i} position={[x, 0, 0]}>
              <mesh onClick={() => console.log(`Clicked icon ${i}`)} cursor="pointer">
                <circleGeometry args={[0.15, 32]} />
                <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.3} />
              </mesh>
              <Icon
                style={{
                  width: '30px',
                  height: '30px',
                  position: 'absolute',
                }}
              />
            </group>
          )
        })}
      </group> */}
    </group>
  )
}

AboutUs.propTypes = {
  position: PropTypes.array,
  rotation: PropTypes.array,
}
