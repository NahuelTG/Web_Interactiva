// src/components/NavBar/NavBar.js
import { useState } from 'react' // Asegúrate de importar React
import scrollService from '../../service/ScrollService'
import Modal from './Modal' // Ajusta la ruta si es necesario
import { modalInfo } from '../../assets/data/modalData.jsx' // Importa los datos
import './NavBar.css'

export const Navbar = () => {
  // Estado para guardar el TIPO de modal a mostrar ('acerca', 'exposiciones', etc.)
  // o null si no hay ninguno abierto.
  const [activeModal, setActiveModal] = useState(null)

  const handleScrollToPage = (pageNumber) => {
    // Cierra cualquier modal abierto antes de hacer scroll
    setActiveModal(null)
    scrollService.scrollToPosition(pageNumber)
  }

  const openModal = (modalType) => {
    // Verifica que el tipo de modal exista en nuestros datos
    if (modalInfo[modalType]) {
      setActiveModal(modalType)
    } else {
      console.warn(`Modal type "${modalType}" not found in modalInfo.`)
    }
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  // Obtén la información del modal activo (si hay uno)
  const currentModalData = activeModal ? modalInfo[activeModal] : null

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            {/* INICIO sigue haciendo scroll */}
            <button onClick={() => handleScrollToPage(0)}>INICIO</button>
          </li>
          <li>
            {/* Abre el modal 'acerca' */}
            <button onClick={() => openModal('acerca')}>ACERCA DE NOSOTROS</button>
          </li>
          <li>
            {/* Abre el modal 'exposiciones' */}
            <button onClick={() => openModal('exposiciones')}>EXHIBICIONES</button>
          </li>
          <li>
            {/* Abre el modal 'reconocimientos' */}
            <button onClick={() => openModal('reconocimientos')}>RECONOCIMIENTOS</button>
          </li>
        </ul>
      </nav>

      {/* Renderiza el Modal genérico */}
      {/* isOpen es true si activeModal tiene un valor (no es null) */}
      {/* onClose llama a la función para cerrar el modal */}
      <Modal isOpen={!!activeModal} onClose={closeModal}>
        {/* Muestra el contenido solo si currentModalData existe */}
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

// No necesitas exportar Navbar como default si ya la exportas nombrada.
// export default Navbar; // Comenta o elimina esta línea si usas export const Navbar
