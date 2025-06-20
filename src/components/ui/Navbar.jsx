// src/components/NavBar/NavBar.js
import { useState } from 'react' // Asegúrate de importar React
import scrollService from '../../service/ScrollService'
import Modal from './Modal' // Ajusta la ruta si es necesario
import { modalInfo } from '../../assets/data/modalData.jsx' // Importa los datos
import './NavBar.css'

export const Navbar = () => {
  const [activeModal, setActiveModal] = useState(null)

  const handleScrollToPage = (pageNumber) => {
    setActiveModal(null)
    scrollService.scrollToPosition(pageNumber)
  }

  const openModal = (modalType) => {
    if (modalInfo[modalType]) {
      setActiveModal(modalType)
    } else {
      console.warn(`Modal type "${modalType}" not found in modalInfo.`)
    }
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const currentModalData = activeModal ? modalInfo[activeModal] : null

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <button onClick={() => handleScrollToPage(0)}>INICIO</button>
          </li>
          <li>
            <button onClick={() => openModal('acerca')}>ACERCA DE NOSOTROS</button>
          </li>
          <li>
            <button onClick={() => openModal('exposiciones')}>EXHIBICIONES</button>
          </li>
          <li>
            {/* Abre el modal 'reconocimientos' */}
            <button onClick={() => openModal('reconocimientos')}>RECONOCIMIENTOS</button>
          </li>
        </ul>
      </nav>

      <Modal isOpen={!!activeModal} onClose={closeModal}>
        {currentModalData && (
          <>
            <h2>{currentModalData.title}</h2>
            <div>{currentModalData.content}</div>
          </>
        )}
      </Modal>
    </>
  )
}
