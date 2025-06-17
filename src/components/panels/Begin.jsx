import Modal from '../ui/Modal'
import { useState } from 'react'
import './Begin.css'

export const Begin = () => {
  const [OpenModal, setOpenModal] = useState(true)

  const Continuar = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Modal isOpen={OpenModal} onClose={Continuar}>
        <p>Hoola</p>
        <button
          className="btn-solid-glow"
          onClick={() => {
            Continuar()
          }}
        >
          Continuar
        </button>
      </Modal>
    </>
  )
}
