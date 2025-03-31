import { SocialButton } from '../buttons/SocialButton'
import './Footer.css'
export const Footer = () => {
  return (
    <div className="footer">
      <ul>
        <li className="footer__instagram">
          <SocialButton type={'instagram'} />
        </li>
        <li className="footer__facebook">
          <SocialButton type={'facebook'} />
        </li>
        <li className="footer__tiktok">
          <SocialButton type={'tiktok'} />
        </li>
      </ul>
    </div>
  )
}
