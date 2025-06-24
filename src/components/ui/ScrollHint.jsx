// src/components/ui/ScrollHint.jsx
import { useState, useEffect } from 'react'
import useWindowWidth from '../../hooks/useWindowWidth'
import { Mouse } from '../../assets/svg/Mouse'
import { IndexFinger } from '../../assets/svg/IndexFinger'
import './ScrollHint.css'

const ScrollHint = () => {
  const [isVisible, setIsVisible] = useState(true)
  const width = useWindowWidth()
  const isMobile = width <= 768

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`scroll-hint ${!isVisible ? 'scroll-hint--hidden' : ''}`}>
      <div className="scroll-hint__icon-container">{isMobile ? <IndexFinger /> : <Mouse />}</div>
    </div>
  )
}

export default ScrollHint
