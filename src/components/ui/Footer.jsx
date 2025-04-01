import { SocialButton } from '../buttons/SocialButton'
import SummergoLogo from '../../assets/images/SummergoLogo.png'
import './Footer.css'
export const Footer = () => {
  return (
    <div className="footer">
      <ul>
        <li>
          <img src={SummergoLogo} alt="Summergo Logo" className="logo" />
        </li>
        <div className="footer__social-group">
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
