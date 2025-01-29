import Sound from '../../assets/svg/sound.svg'
import NoSound from '../../assets/svg/no_sound.svg'

export const MuteSound = ({ isMuted, toggleMute }) => {
  return (
    <div className="ambient-music">
      {/* Botón para mute/unmute */}
      <a onClick={toggleMute} className="mute-toggle">
        <img src={isMuted ? NoSound : Sound} alt={isMuted ? 'No sound' : 'Sound'} />
      </a>
    </div>
  )
}

export default MuteSound
