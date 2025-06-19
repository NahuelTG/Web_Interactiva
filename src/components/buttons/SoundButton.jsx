import { Sound } from '../../assets/svg/Sound'
import { NoSound } from '../../assets/svg/NoSound'
import { useAmbientSound } from '../../hooks/useAmbientSound'
import PropTypes from 'prop-types'
import './SoundButton.css'

export const SoundButton = ({ isMuted, toggleMute }) => {
  const { play } = useAmbientSound()

  return (
    <div className="ambient-music">
      <button className="btn_sound" onClick={play}>
        <Sound />
      </button>
    </div>
  )
}

SoundButton.propTypes = {
  isMuted: PropTypes.bool,
  toggleMute: PropTypes.bool,
}

export default SoundButton
