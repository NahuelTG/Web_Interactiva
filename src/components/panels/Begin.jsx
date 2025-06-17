import Modal from '../ui/Modal'
import ScrollHint from '../ui/ScrollHint'
import { useState } from 'react'
import './Begin.css'

export const Begin = () => {
  const [isModalOpen, setModalOpen] = useState(true)

  const handleContinuar = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleContinuar} begin={true}>
        <div className="begin-modal-content">
          <p>Para poder avanzar, desplázate hacia abajo.</p>
          <ScrollHint />
        </div>
        <div className="section-btn">
          <button className="btn-solid-glow" onClick={handleContinuar}>
            Continuar
          </button>
        </div>
      </Modal>
    </>
  )
}
