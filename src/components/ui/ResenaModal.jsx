// src/components/ResenaModal.jsx

import PropTypes from 'prop-types'
import Modal from './Modal'
import resenaSummergo from '../../assets/data/resena-summergo'
import './Modal.css'

const ResenaModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-scrollable">
        <h2 style={{ color: '#00d4ff' }}>Reseña Summergō</h2>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{resenaSummergo}</pre>
      </div>
    </Modal>
  )
}

ResenaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ResenaModal
