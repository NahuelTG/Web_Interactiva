import scrollService from '../../service/ScrollService'
import { useState } from 'react'
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
    </>
  )
}
