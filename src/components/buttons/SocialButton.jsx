import { Instagram, Facebook, Tiktok, Email } from '../../assets/svg/index'
import PropTypes from 'prop-types'
import './Buttons.css'

export const SocialButton = ({ type = 'instagram' }) => {
  const icons = {
    instagram: <Instagram />,
    facebook: <Facebook />,
    tiktok: <Tiktok />,
    email: <Email />,
  }

  const links = {
    instagram: 'https://www.instagram.com/summergolab/',
    facebook: 'https://www.facebook.com/SummergoLab',
    tiktok: 'https://www.tiktok.com/@summergo.lab',
    email: 'mailto:summergo.lab@gmail.com',
  }

  return (
    <div className="social">
      <a
        className="social__button"
        href={links[type]}
        target={type === 'email' ? undefined : '_blank'}
        rel={type === 'email' ? undefined : 'noopener noreferrer'}
        role="button"
        aria-label={`Enlace a ${type}`}
      >
        {icons[type]}
      </a>
    </div>
  )
}

SocialButton.propTypes = {
  type: PropTypes.oneOf(['instagram', 'facebook', 'tiktok', 'email']),
}
