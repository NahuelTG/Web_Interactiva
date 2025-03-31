import { Instagram, Facebook, Tiktok } from '../../assets/svg/index'
import PropTypes from 'prop-types'
import './Buttons.css'

export const SocialButton = ({ type = 'instagram' }) => {
  // Definición de íconos
  const icons = {
    instagram: <Instagram />,
    facebook: <Facebook />,
    tiktok: <Tiktok />,
  }

  // Enlaces correspondientes a cada red social
  const links = {
    instagram: 'https://www.instagram.com/summergolab/',
    facebook: 'https://www.facebook.com/SummergoLab',
    tiktok: 'https://www.tiktok.com/@summergo.lab',
  }

  // Manejador de clic que abre la URL en nueva pestaña
  const handleClick = () => {
    window.open(links[type], '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="social">
      <a className="social__button" onClick={handleClick} role="button" aria-label={`Enlace a ${type}`}>
        {icons[type]}
      </a>
    </div>
  )
}

SocialButton.propTypes = {
  type: PropTypes.oneOf(['instagram', 'facebook', 'tiktok']),
}
