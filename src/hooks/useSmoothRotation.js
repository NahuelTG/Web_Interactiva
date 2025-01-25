import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const useSmoothRotation = (scroll, speed = 0.1) => {
  const targetRotation = useRef(0)

  useFrame(() => {
    targetRotation.current += (scroll.offset * Math.PI * 2 - targetRotation.current) * speed
  })

  return targetRotation
}

export default useSmoothRotation
