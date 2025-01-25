import { Points, PointMaterial } from '@react-three/drei'
import { useMemo } from 'react'

const BackgroundParticles = ({ count = 1000 }) => {
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 100 // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100 // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100 // Z
    }
    return positions
  }, [count])

  return (
    <Points positions={particles} stride={3}>
      <PointMaterial transparent color="white" size={0.5} sizeAttenuation />
    </Points>
  )
}

export default BackgroundParticles
