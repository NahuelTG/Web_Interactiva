import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'

export const CameraController = () => {
  const { camera } = useThree()
  const scroll = useScroll()
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const smoothMouseRef = useRef({ x: 0, y: 0 })
  const angleRef = useRef(0)
  const lastDirectionRef = useRef(1)
  const lastPageRef = useRef(0)

  const radius = 5
  const altura = 0.3
  const offset = 0.1

  const MAX_ANGLE_X = Math.PI / 32
  const MAX_ANGLE_Y = -(Math.PI / 64)

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
    if (scroll) {
      angleRef.current = -scroll.offset * Math.PI * 2
    }

    const totalPages = 30
    const currentPage = Math.floor(scroll.offset * totalPages)

    // Detectar cambio de dirección
    if (currentPage !== lastPageRef.current) {
      // Lógica para determinar cambio de dirección
      if (currentPage < lastPageRef.current) {
        lastDirectionRef.current *= -1
      }
      lastPageRef.current = currentPage
    }

    const basePosX = Math.cos(angleRef.current) * radius
    const basePosZ = Math.sin(angleRef.current) * radius

    // Suavizado y límites
    smoothMouseRef.current.x += (mousePositionRef.current.x - smoothMouseRef.current.x) * 0.1
    smoothMouseRef.current.y += (mousePositionRef.current.y - smoothMouseRef.current.y) * 0.1

    // Ajustar límite horizontal con dirección actual
    const limitedX = Math.max(Math.min(smoothMouseRef.current.x, 1), -1) * MAX_ANGLE_X * lastDirectionRef.current
    const limitedY = Math.max(Math.min(smoothMouseRef.current.y, 1), -1) * MAX_ANGLE_Y

    // Aplicar desplazamiento
    const offsetX = Math.sin(limitedX)
    const offsetY = Math.sin(limitedY)

    camera.position.set(basePosX + offsetX, altura + offsetY, basePosZ)

    // Punto de mira ajustado
    const lookAtX = Math.cos(angleRef.current + offset) * radius
    const lookAtZ = Math.sin(angleRef.current + offset) * radius
    camera.lookAt(lookAtX, altura, lookAtZ)
  })

  return null
}
