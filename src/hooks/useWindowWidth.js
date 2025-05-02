// src/hooks/useWindowWidth.js
import { useState, useEffect } from 'react'

function getWindowWidth() {
  // Asegúrate de que window esté definido (evita errores en SSR si lo usaras)
  const { innerWidth: width } = typeof window !== 'undefined' ? window : { innerWidth: 0 }
  return width
}

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth())

  useEffect(() => {
    // Handler para llamar en el resize
    function handleResize() {
      setWindowWidth(getWindowWidth())
    }

    // Añadir event listener si window está definido
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      // Limpiar listener al desmontar
      return () => window.removeEventListener('resize', handleResize)
    }
  }, []) // El array vacío asegura que el efecto corre solo al montar/desmontar

  return windowWidth
}
