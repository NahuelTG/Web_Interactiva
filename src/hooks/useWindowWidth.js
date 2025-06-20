// src/hooks/useWindowWidth.js
import { useState, useEffect } from 'react'

function getWindowWidth() {
  const { innerWidth: width } = typeof window !== 'undefined' ? window : { innerWidth: 0 }
  return width
}

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth())

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth())
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowWidth
}
