import { useState } from 'react'
import { Sound } from '../../assets/svg/Sound'
import { NoSound } from '../../assets/svg/NoSound'
import { useAmbientSound } from '../../hooks/useAmbientSound'
import PropTypes from 'prop-types'
import './SoundButton.css'

export const SoundButton = () => {
  const [isMuted, setIsMuted] = useState(false)
  const { mute, unmute } = useAmbientSound()

  const toggleMute = () => {
    if (isMuted) {
      unmute()
      setIsMuted(false)
    } else {
      mute()
      setIsMuted(true)
    }
  }

  return (
    <div className="ambient-music">
      <button className="btn_sound" onClick={toggleMute}>
        {isMuted ? <NoSound /> : <Sound />}
      </button>
    </div>
  )
}

SoundButton.propTypes = {
  isMuted: PropTypes.bool,
  toggleMute: PropTypes.bool,
}

export default SoundButton
