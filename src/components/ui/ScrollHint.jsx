// src/components/ui/ScrollHint.jsx
import { useState, useEffect } from 'react'
import useWindowWidth from '../../hooks/useWindowWidth' // Ajusta la ruta
import { Mouse } from '../../assets/svg/Mouse' // Ajusta la ruta
import { IndexFinger } from '../../assets/svg/IndexFinger' // Ajusta la ruta
import './ScrollHint.css' // Crearemos este archivo CSS

const ScrollHint = () => {
  const [isVisible, setIsVisible] = useState(true)
  const width = useWindowWidth()
  const isMobile = width <= 768

  useEffect(() => {
    // Establecer un temporizador para ocultar la pista después de unos segundos
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000) // Ocultar después de 5 segundos (ajusta según necesites)

    // Limpiar el temporizador si el componente se desmonta antes
    return () => clearTimeout(timer)
  }, []) // El array vacío asegura que esto solo se ejecute al montar

  return (
    // Aplicar clases para controlar visibilidad y posible animación de fade-out
    <div className={`scroll-hint ${!isVisible ? 'scroll-hint--hidden' : ''}`}>
      <div className="scroll-hint__icon-container">
        {/* Renderizar condicionalmente el icono basado en el ancho */}
        {isMobile ? <IndexFinger /> : <Mouse />}
      </div>
      {/* Opcional: Añadir texto como "Scroll" o "Desliza" */}
      {/* <span className="scroll-hint__text">{isMobile ? 'Desliza' : 'Scroll'}</span> */}
    </div>
  )
}

export default ScrollHint
