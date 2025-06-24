// src/components/ui/ScrollHint.jsx
import { useState, useEffect } from 'react'
import useWindowWidth from '../../hooks/useWindowWidth'
import { Mouse } from '../../assets/svg/Mouse'
import { IndexFinger } from '../../assets/svg/IndexFinger'
import PropTypes from 'prop-types'
import './ScrollHint.css'

const ScrollHint = ({ VisibleHint }) => {
  const [isVisible, setIsVisible] = useState(true)
  const width = useWindowWidth()
  const isMobile = width <= 768

  useEffect(() => {
    if (!VisibleHint) {
      setIsVisible(false)
    }
  }, [VisibleHint])

  return (
    <div className={`scroll-hint ${!isVisible ? 'scroll-hint--hidden' : ''}`}>
      <div className="scroll-hint__icon-container">{isMobile ? <IndexFinger /> : <Mouse />}</div>
    </div>
  )
}

ScrollHint.propTypes = {
  VisibleHint: PropTypes.bool.isRequired,
}

export default ScrollHint
