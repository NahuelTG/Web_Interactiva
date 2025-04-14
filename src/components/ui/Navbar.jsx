import './Navbar.css'
import scrollService from '../../service/ScrollService' // Importar el servicio

export const Navbar = () => {
  const handleScrollToPage = (pageNumber) => {
    scrollService.scrollToPosition(pageNumber)
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <button onClick={() => handleScrollToPage(0)}>INICIO</button>
        </li>
        <li>
          <button onClick={() => handleScrollToPage(7.5)}>ACERCA DE NOSOTROS</button>
        </li>
        <li>
          <button onClick={() => handleScrollToPage(15)}>EXHIBICIONES</button>
        </li>
        <li>
          <button onClick={() => handleScrollToPage(22.5)}>RECONOCIMIENTOS</button>
        </li>
      </ul>
    </nav>
  )
}
