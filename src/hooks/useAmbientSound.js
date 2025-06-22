import { Howl } from 'howler'
import { useRef, useEffect } from 'react'
import ambientSound from '../assets/sounds/ambient.mp3'

export const useAmbientSound = () => {
  const sound = useRef(null)

  useEffect(() => {
    if (!sound.current) {
      sound.current = new Howl({
        src: [ambientSound],
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
