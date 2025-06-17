/* eslint-disable react/no-unknown-property */
import { useLoader } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { TextureLoader } from 'three'
import * as THREE from 'three'
import PropTypes from 'prop-types'
import { Text } from '@react-three/drei'
import SummergoLogo from '../../assets/images/SummergoLogo.png'

export const AboutUs = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const texture = useLoader(TextureLoader, SummergoLogo)
  const [TextLines, setTextLines] = useState([])
  const [SizeAbout, setSizeAbout] = useState(1)

  const textStyleProps = {
    fontSize: 0.15,
    color: 'white',
    anchorX: 'center',
    anchorY: 'middle',
    outlineWidth: 0.008,
    outlineColor: '#ffffff',
    letterSpacing: 0.03,
    lineHeight: 1.2,
    fillOpacity: 0.9,
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSizeAbout(0.35)
        setTextLines([
          'Somos un laboratorio creativo',
          'que fusiona arte, tecnología',
          'y cultura. Creamos experiencias',
          'inmersivas en VR, AR y más.',
          'Sumérgete y co-crea',
          'con nosotros.',
        ])
      } else {
        setSizeAbout(1)
        setTextLines([
          'Somos un laboratorio creativo que fusiona arte,',
          'tecnología y cultura. Creamos experiencias',
          'inmersivas en VR, AR y más.',
          'Sumérgete y co-crea con nosotros.',
        ])
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const initialYText = 1.3
  const lineSpacing = textStyleProps.fontSize * textStyleProps.lineHeight * 1.35

  return (
    <group position={position} rotation={rotation} scale={SizeAbout}>
      {/* Logo */}
      <mesh position={[0, initialYText + textStyleProps.fontSize * 2, 0]}>
        {' '}
        <planeGeometry args={[0.7, 0.24]} />
        <meshStandardMaterial map={texture} transparent opacity={1.5} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Text lines */}
      {TextLines.map((line, i) => (
        <Text key={i} {...textStyleProps} position={[0, initialYText - i * lineSpacing, 0]} transparent={textStyleProps.fillOpacity < 1}>
          {line}
        </Text>
      ))}
    </group>
  )
}

AboutUs.propTypes = {
  position: PropTypes.array,
  rotation: PropTypes.array,
}
