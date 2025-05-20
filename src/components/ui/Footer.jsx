// src/components/ui/Footer.js
import PropTypes from 'prop-types' // Importa PropTypes si quieres validar la prop
import { SocialButton } from '../buttons/SocialButton'
import SummergoLogo from '../../assets/images/SummergoLogo.png'
import './Footer.css'

// Acepta la prop scrollOffset
export const Footer = ({ scrollOffset }) => {
  // --- Lógica de visibilidad ---
  const totalPages = 30 // ¡IMPORTANTE! Debe coincidir con el valor en <ScrollControls pages={...}>
  const hideLogoAfterPage = 27 // Define en qué "página" quieres que DESAPAREZCA el logo (puede ser decimal)
  const hideThreshold = hideLogoAfterPage / totalPages // Calcula el umbral de offset (0 a 1)

  // El logo es visible si el scroll es MENOR que el umbral
  const isLogoVisible = scrollOffset < hideThreshold
  // ---------------------------

  return (
    <div className="footer">
      <div className="description_logo">
        <p>Contáctanos:</p>
      </div>

      <ul>
        <li>
          {/* Añade la clase 'logo--hidden' cuando no sea visible */}
          <img src={SummergoLogo} alt="Summergo Logo" className={`logo ${!isLogoVisible ? 'logo--hidden' : ''}`} />
        </li>
        <div className="footer__social-group">
          {/* ... tus botones sociales ... */}
          <li className="footer__instagram">
            <SocialButton type={'email'} />
          </li>
          <li className="footer__instagram">
            <SocialButton type={'instagram'} />
          </li>
          <li className="footer__facebook">
            <SocialButton type={'facebook'} />
          </li>
          <li className="footer__tiktok">
            <SocialButton type={'tiktok'} />
          </li>
        </div>
      </ul>
    </div>
  )
}

// Opcional: Añade validación de props
Footer.propTypes = {
  scrollOffset: PropTypes.number.isRequired,
}
