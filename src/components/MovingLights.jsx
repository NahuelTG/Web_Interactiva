import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const MovingLights = () => {
  const light1 = useRef()
  const light2 = useRef()

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    if (light1.current) {
      light1.current.position.x = Math.sin(time) * 10
      light1.current.position.z = Math.cos(time) * 10
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(time) * 10
      light2.current.position.z = Math.sin(time) * 10
    }
  })

  return (
    <>
      <pointLight ref={light1} color="pink" intensity={1} position={[10, 5, 10]} />
      <pointLight ref={light2} color="blue" intensity={1} position={[-10, 5, -10]} />
    </>
  )
}

export default MovingLights
