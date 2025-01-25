import { useMemo } from 'react'
import { Points, PointMaterial } from '@react-three/drei'

const Particles = ({ count = 5000 }) => {
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions.set([(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50], i * 3)
    }
    return positions
  }, [count])

  return (
    <Points positions={particles} stride={3}>
      <PointMaterial transparent color="white" size={0.05} sizeAttenuation />
    </Points>
  )
}

export default Particles
