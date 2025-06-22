import { Howl } from 'howler'
import { useRef, useEffect } from 'react'

export const useAmbientSound = () => {
  const sound = useRef(null)

  useEffect(() => {
    if (!sound.current) {
      sound.current = new Howl({
        src: ['src/assets/sounds/ambient.mp3'],
        autoplay: true,
        loop: true,
        volume: 0,
      })
    }
    sound.current.fade(0, 0.5, 5000)
  }, [])

  const mute = () => {
    sound.current?.mute(true)
  }

  const unmute = () => {
    sound.current?.mute(false)
  }

  return { mute, unmute }
}
