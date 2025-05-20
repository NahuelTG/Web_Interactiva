/* eslint-disable react/no-unknown-property */
import { useLoader } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { TextureLoader } from 'three'
import * as THREE from 'three'
import PropTypes from 'prop-types'
import { Text } from '@react-three/drei'
import SummergoLogo from '../assets/images/SummergoLogo.png'

export const AboutUs = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const texture = useLoader(TextureLoader, SummergoLogo)
  const [TextLines, setTextLines] = useState([])
  const [SizeAbout, setSizeAbout] = useState(1)

  // Ajustes de estilo para el texto, similares a PanelTitle line_X
  const textStyleProps = {
    fontSize: 0.15, // Ajustado. Originalmente PanelTitle tiene 0.2, pero AboutUs tiene más líneas y un logo.
    // Podrías necesitar ajustar esto y el espaciado vertical.
    color: 'white',
    anchorX: 'center',
    anchorY: 'middle',
    outlineWidth: 0.008, // Un poco menos que PanelTitle para compensar un fontSize potencialmente menor
    outlineColor: '#ffffff',
    letterSpacing: 0.03,
    lineHeight: 1.2, // Afecta el cálculo de la posición Y si se usa directamente en <Text>
    fillOpacity: 0.9, // Un poco más opaco que PanelTitle para legibilidad
    // depthOffset: 0.5, // Opcional, si necesitas controlar el z-fighting
    // transparent: true, // Necesario si fillOpacity < 1
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSizeAbout(0.35) // Ajustado ligeramente para el nuevo tamaño de fuente
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

  // Ajustar la posición Y inicial y el espaciado entre líneas
  // basado en el nuevo fontSize y lineHeight.
  const initialYText = 1.3 // Posición Y de la primera línea de texto
  const lineSpacing = textStyleProps.fontSize * textStyleProps.lineHeight * 1.35 // Multiplicador para un poco más de espacio

  return (
    <group position={position} rotation={rotation} scale={SizeAbout}>
      {/* Logo */}
      <mesh position={[0, initialYText + textStyleProps.fontSize * 2, 0]}>
        {' '}
        {/* Mover el logo un poco más arriba */}
        <planeGeometry args={[0.7, 0.24]} /> {/* Ajustado para mantener proporción */}
        <meshStandardMaterial map={texture} transparent opacity={1.5} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Text lines */}
      {TextLines.map((line, i) => (
        <Text
          key={i}
          {...textStyleProps} // Aplicar todos los estilos
          position={[0, initialYText - i * lineSpacing, 0]} // Usar el espaciado calculado
          transparent={textStyleProps.fillOpacity < 1} // Asegurar transparencia si fillOpacity < 1
        >
          {line}
        </Text>
      ))}
    </group>
  )
}

AboutUs.propTypes = {
  position: PropTypes.array,
  rotation: PropTypes.array,
  // scale: PropTypes.number, // SizeAbout ahora se maneja internamente
}
