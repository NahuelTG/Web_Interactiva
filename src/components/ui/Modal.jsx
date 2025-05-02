// src/components/Modal/Modal.js
import './Modal.css'
import PropTypes from 'prop-types'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      {' '}
      {/* Cierra al hacer clic en el overlay */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {' '}
        {/* Evita que el clic en el contenido cierre el modal */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        {/* Añadimos un contenedor opcional para el título si no viene en children */}
        {/* O mejor, dejamos que el NavBar pase el título como parte de children */}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal
