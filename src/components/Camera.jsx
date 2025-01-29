import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { Vector3, Quaternion } from 'three'
import { useSpring } from '@react-spring/web'

export const CAMERA_CONFIG = {
  fov: 58,
  near: 0.1,
  far: 1000,
  position: [0, 3, 15],
  rotation: [-0.15, 0, 0],
}

export const CinematicCamera = () => {
  const { camera, mouse } = useThree()
  const scroll = useScroll()
  const vec = new Vector3()
  const quat = new Quaternion()

  const { pos } = useSpring({
    pos: CAMERA_CONFIG.position,
    config: { mass: 1, tension: 180, friction: 30 },
  })

  useFrame((state, delta) => {
    const scrollProgress = scroll.offset * 2
    const angle = scrollProgress * Math.PI * 1.5
    const radius = 8 + scrollProgress * 4
    const height = 3 + scrollProgress * 2

    // Movimiento orbital con parábola
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius * 1.2
    const y = height - Math.pow(scrollProgress, 2) * 2

    // Parallax con mouse
    const mx = mouse.x * 0.3
    const my = mouse.y * 0.2

    // Suavizado y movimiento
    camera.position.lerp(vec.set(x + mx, y + my, z), delta * 2.5)
    camera.quaternion.slerp(quat.setFromUnitVectors(new Vector3(0, 0, 1), new Vector3(-x, -y * 0.3, -z).normalize()), delta * 3)

    // Efecto de inclinación dinámica
    camera.rotation.z = scrollProgress * 0.05
    camera.rotation.x = -0.15 + Math.sin(scrollProgress * Math.PI) * 0.1
  })

  return null
}
