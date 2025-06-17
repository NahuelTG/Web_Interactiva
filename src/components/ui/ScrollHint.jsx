// src/components/ui/ScrollHint.jsx
import useWindowWidth from '../../hooks/useWindowWidth'
import { Mouse } from '../../assets/svg/Mouse'
import { IndexFinger } from '../../assets/svg/IndexFinger'
import './ScrollHint.css'
const ScrollHint = () => {
  const width = useWindowWidth()
  const isMobile = width <= 768

  return (
    <div className={`scroll-hint `}>
      <div className="scroll-hint__icon-container">{isMobile ? <IndexFinger /> : <Mouse />}</div>
    </div>
  )
}

export default ScrollHint
