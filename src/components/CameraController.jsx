import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'

export const CameraController = () => {
  const { camera } = useThree()
  const scroll = useScroll()
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const smoothMouseRef = useRef({ x: 0, y: 0 }) // Posición suavizada
  const angleRef = useRef(0) // Controla el ángulo de la cámara siempre, independientemente del scroll
  const radius = 5
  const altura = 0.3
  const offset = 0.1 // Pequeña anticipación para que la cámara mire adelante en su trayectoria

  // Límites máximos de desplazamiento de la cámara
  const MAX_ANGLE_X = -(Math.PI / 32) // Límite horizontal reducido
  const MAX_ANGLE_Y = -(Math.PI / 64) // Límite vertical reducido

  // Efecto para manejar el movimiento del ratón
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      mousePositionRef.current = { x, y }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useFrame(() => {
    // Si hay scroll, actualizar el ángulo basado en scroll.offset
    if (scroll) {
      angleRef.current = -scroll.offset * Math.PI * 2
    }

    // Posición base de la cámara en el círculo
    const basePosX = Math.cos(angleRef.current) * radius
    const basePosZ = Math.sin(angleRef.current) * radius

    // Aplicar suavizado en el seguimiento del ratón
    smoothMouseRef.current.x += (mousePositionRef.current.x - smoothMouseRef.current.x) * 0.1
    smoothMouseRef.current.y += (mousePositionRef.current.y - smoothMouseRef.current.y) * 0.1

    // Aplicar límites al desplazamiento
    const limitedX = Math.max(Math.min(smoothMouseRef.current.x, 1), -1) * MAX_ANGLE_X
    const limitedY = Math.max(Math.min(smoothMouseRef.current.y, 1), -1) * MAX_ANGLE_Y

    // Calcular desplazamiento de la cámara suavizado
    const offsetX = Math.sin(limitedX)
    const offsetY = Math.sin(limitedY)

    // Aplicar desplazamiento a la posición de la cámara
    camera.position.set(basePosX + offsetX, altura + offsetY, basePosZ)

    // Punto de mira
    const lookAtX = Math.cos(angleRef.current + offset) * radius
    const lookAtZ = Math.sin(angleRef.current + offset) * radius
    camera.lookAt(lookAtX, altura, lookAtZ)
  })

  return null
}
