import { PositionalAudio } from '@react-three/drei'
import { useRef } from 'react'

const AmbientSound = ({ url }) => {
  const audioRef = useRef()

  return (
    <PositionalAudio
      ref={audioRef}
      url={url} // Ruta al archivo de sonido
      autoplay
      loop
      distance={10} // Qué tan "cerca" debe sonar
    />
  )
}

export default AmbientSound
