import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

export const CameraController = () => {
  const { camera } = useThree()
  const scroll = useScroll()
  const radius = 5
  const altura = 0.3
  const offset = 0.1 // Pequeña anticipación para que la cámara mire adelante en su trayectoria

  useFrame(() => {
    if (scroll) {
      const angle = -scroll.offset * Math.PI * 2

      // Posición de la cámara en el círculo
      const posX = Math.cos(angle) * radius
      const posZ = Math.sin(angle) * radius
      camera.position.set(posX, altura, posZ)

      // Punto hacia donde la cámara debe mirar (ligeramente adelantado en la trayectoria)
      const lookAtX = Math.cos(angle + offset) * radius
      const lookAtZ = Math.sin(angle + offset) * radius
      camera.lookAt(lookAtX, altura, lookAtZ)
    }
  })

  return null
}
