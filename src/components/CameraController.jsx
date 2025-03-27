import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'

export const CameraController = () => {
  const { camera } = useThree()
  const scroll = useScroll()
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const smoothMouseRef = useRef({ x: 0, y: 0 })
  const angleRef = useRef(0)

  const radius = 5
  const altura = 0.3

  const MAX_ANGLE_X = Math.PI / 32
  const MAX_ANGLE_Y = -(Math.PI / 64)

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1

      // Invert the X-axis movement by multiplying by -1
      mousePositionRef.current = { x: -x, y }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useFrame(() => {
    // Invertir completamente el scroll multiplicando por -1
    const invertedOffset = 1 + scroll.offset
    angleRef.current = invertedOffset * Math.PI * 2

    // Calcular posición base
    const basePosX = Math.cos(angleRef.current) * radius
    const basePosZ = Math.sin(angleRef.current) * radius

    // Suavizado del mouse
    smoothMouseRef.current.x += (mousePositionRef.current.x - smoothMouseRef.current.x) * 0.1
    smoothMouseRef.current.y += (mousePositionRef.current.y - smoothMouseRef.current.y) * 0.1

    // Aplicar límites
    const limitedX = Math.max(Math.min(smoothMouseRef.current.x, 1), -1) * MAX_ANGLE_X
    const limitedY = Math.max(Math.min(smoothMouseRef.current.y, 1), -1) * MAX_ANGLE_Y

    // Calcular offsets
    const offsetX = Math.sin(limitedX)
    const offsetY = Math.sin(limitedY)

    // Posición de la cámara con desplazamiento invertido en X
    camera.position.set(
      basePosX + offsetX, // Invertir el signo aquí para invertir el movimiento en X
      altura + offsetY,
      basePosZ - offsetX * 0.5
    )

    // Punto de mira adelantado
    const lookAhead = 0.2 // Ajustar este valor para cambiar la anticipación
    const lookAtAngle = angleRef.current + lookAhead
    const lookAtX = Math.cos(lookAtAngle) * radius
    const lookAtZ = Math.sin(lookAtAngle) * radius

    camera.lookAt(lookAtX, altura, lookAtZ)
  })

  return null
}
