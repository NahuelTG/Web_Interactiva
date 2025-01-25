import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const RotatingLights = () => {
  const lightRef = useRef()

  useFrame(({ clock }) => {
    if (lightRef.current) {
      const time = clock.getElapsedTime()
      lightRef.current.position.x = Math.sin(time) * 10
      lightRef.current.position.z = Math.cos(time) * 10
    }
  })

  return <pointLight ref={lightRef} intensity={1.5} color="#FF6C63" />
}

export default RotatingLights
