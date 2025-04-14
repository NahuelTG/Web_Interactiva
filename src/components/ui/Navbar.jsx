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
          <button onClick={() => handleScrollToPage(0)}>VR</button>
        </li>
        <li>
          <button onClick={() => handleScrollToPage(7.5)}>Modelos 3D</button>
        </li>
        <li>
          <button onClick={() => handleScrollToPage(15)}>AR</button>
        </li>
        <li>
          <button onClick={() => handleScrollToPage(22.5)}>Audio Rutas</button>
        </li>
      </ul>
    </nav>
  )
}
