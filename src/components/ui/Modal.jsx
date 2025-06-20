import { useWindowSize } from '../../hooks/useWindowSize'
import PropTypes from 'prop-types'
import './Modal.css'

const Modal = ({ isOpen, onClose, children, begin = false }) => {
  const { width } = useWindowSize()

  let modalSize = ''

  if (begin) {
    if (width < 1350 && width >= 1001) {
      modalSize = '40%'
    } else if (width < 1000 && width >= 769) {
      modalSize = '60%'
    } else if (width < 768) {
      modalSize = '80%'
    } else {
      modalSize = begin === true ? '30%' : '80%'
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      {' '}
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ paddingTop: 48, maxWidth: modalSize }}>
        {' '}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="modal-body" style={{ paddingTop: 0 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  begin: PropTypes.bool.isRequired,
}

export default Modal
