import scrollService from '../../service/ScrollService'
import { useState } from 'react'
import Modal from './Modal'
import './NavBar.css'

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleScrollToPage = (pageNumber) => {
    scrollService.scrollToPosition(pageNumber)
  }

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <button onClick={() => handleScrollToPage(0)}>INICIO</button>
          </li>
          <li>
            <button onClick={() => handleScrollToPage(27.5)}>ACERCA DE NOSOTROS</button>
          </li>
          <li>
            <button onClick={() => handleScrollToPage(0)}>EXHIBICIONES</button>
          </li>
          <li>
            <button onClick={() => setIsModalOpen(true)}>RECONOCIMIENTOS</button>
          </li>
        </ul>
      </nav>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 style={{ color: '#00d4ff' }}>Reconocimientos</h2>
        <p>
          Hemos sido reconocidos por múltiples organizaciones internacionales por nuestro aporte a la cultura, tecnología y arte inmersivo.
        </p>
        <p>
          - Premio XYZ 2023
          <br />
          - Selección oficial en Festival de Realidad Virtual
          <br />
          - Colaboraciones con universidades y museos
          <br />
          - Reconocimiento del Ministerio de Cultura
          <br />
          - Premio a la innovación en medios digitales
          <br />
        </p>
        <p>Nuestro trabajo sigue inspirando a nuevas generaciones de creadores. Gracias por acompañarnos en esta aventura.</p>
      </Modal>
    </>
  )
}
