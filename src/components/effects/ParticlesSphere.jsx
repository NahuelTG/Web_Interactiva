/* eslint-disable react/no-unknown-property */
import { useFrame } from '@react-three/fiber'
import { useRef, memo, useMemo } from 'react'
import PropTypes from 'prop-types'

export const ParticlesSphere = memo(function ParticlesSphere({
  position = [0, 0, 0],
  size = 1,
  visible = true,
  radius = 0.5,
  color = '#00ffff',
  speed = 1,
}) {
  const groupRef = useRef()

  // Generate random rotation and movement parameters for each particle
  const particleParams = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      // Random initial angles for different rotation axes
      xAngle: Math.random() * Math.PI * 2,
      yAngle: Math.random() * Math.PI * 2,
      zAngle: Math.random() * Math.PI * 2,

      // Random rotation speeds for each axis
      xSpeed: (Math.random() - 0.5) * 2 * speed,
      ySpeed: (Math.random() - 0.5) * 2 * speed,
      zSpeed: (Math.random() - 0.5) * 2 * speed,

      // Random initial position offset
      offsetX: (Math.random() - 0.5) * 0.1,
      offsetY: (Math.random() - 0.5) * 0.1,
      offsetZ: (Math.random() - 0.5) * 0.1,
    }))
  }, [speed])

  useFrame((_, delta) => {
    if (!groupRef.current || !visible) return

    // Update each particle's position and rotation
    groupRef.current.children.forEach((particle, index) => {
      const params = particleParams[index]

      // Update angles
      params.xAngle += params.xSpeed * delta
      params.yAngle += params.ySpeed * delta
      params.zAngle += params.zSpeed * delta

      // Calculate 3D spherical coordinates with random offsets
      const x = Math.sin(params.xAngle) * radius + params.offsetX
      const y = Math.cos(params.yAngle) * radius + params.offsetY
      const z = Math.sin(params.zAngle) * radius + params.offsetZ

      // Set the particle's position
      particle.position.set(x, y, z)
    })
  })

  if (!visible) return null

  return (
    <group ref={groupRef} position={position}>
      {particleParams.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.02 * size, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
})

ParticlesSphere.propTypes = {
  position: PropTypes.array,
  size: PropTypes.number,
  visible: PropTypes.bool,
  radius: PropTypes.number,
  color: PropTypes.string,
  speed: PropTypes.number,
}
