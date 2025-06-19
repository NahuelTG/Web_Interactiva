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
          <h1 className="welcome-title">SUMÉRGETE</h1>
          <p className="welcome-text">
            Te damos la bienvenida a <strong>Summergo</strong>. Estás a punto de entrar a un mundo interactivo en 3D. Para comenzar tu
            viaje, desliza hacia arriba.
          </p>
          <ScrollHint />
        </div>

        <div className="section-btn">
          <button className="btn-solid-glow" onClick={handleContinuar}>
            Empezar
          </button>
        </div>
      </Modal>
    </>
  )
}
