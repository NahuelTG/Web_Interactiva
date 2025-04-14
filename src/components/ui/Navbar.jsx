import './Navbar.css'

export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#listado">Listado</a>
        </li>
        <li>
          <a href="#acerca">Acerca de Nosotros</a>
        </li>
        <li>
          <a href="#contacto">Contáctanos</a>
        </li>
      </ul>
    </nav>
  )
}
