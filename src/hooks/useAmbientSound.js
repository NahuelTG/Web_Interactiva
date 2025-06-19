import { Howl } from 'howler'
import { useRef } from 'react'

export const useAmbientSound = () => {
  const sound = useRef(null)

  if (!sound.current) {
    sound.current = new Howl({
      src: ['src/assets/sounds/Ambient.mp3'],
      autoplay: true,
      loop: true,
      volume: 0.5,
    })
  }

  const play = () => {
    sound.current?.play()
  }
  return { play }
}
