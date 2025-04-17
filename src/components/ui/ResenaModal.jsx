// src/components/ResenaModal.jsx

import PropTypes from 'prop-types'
import Modal from './Modal'
import resenaHTML_1 from '../../assets/data/resena-summergo.html1'
import resenaHTML_2 from '../../assets/data/resena-summergo.html2'
import resenaTable from '../../assets/data/resena-summergo.table.html'
import './Modal.css'

const ResenaModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-scrollable">
        <div dangerouslySetInnerHTML={{ __html: resenaHTML_1 }} />
        <h3 style={{ color: '#00d4ff', marginTop: '2rem' }}>Proyectos Institucionales y Microdocumentales</h3>
        <div className="responsive-table" dangerouslySetInnerHTML={{ __html: resenaTable }} />
        <div dangerouslySetInnerHTML={{ __html: resenaHTML_2 }} />
      </div>
    </Modal>
  )
}

ResenaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ResenaModal
