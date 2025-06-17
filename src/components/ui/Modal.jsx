// src/components/Modal/Modal.js
import './Modal.css'
import PropTypes from 'prop-types'

const Modal = ({ isOpen, onClose, children, begin = false }) => {
  if (!isOpen) return null

  const modalSize = begin === true ? '30%' : '80%'

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
