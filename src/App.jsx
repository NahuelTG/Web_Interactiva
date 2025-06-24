// src/App.js
import { useEffect, useState } from 'react'
import './App.css'
import Scene from './components/Scene'
import { Footer } from './components/ui/Footer'
import { Navbar } from './components/ui/Navbar'
import SoundButton from './components/buttons/SoundButton'
import ScrollHint from './components/ui/ScrollHint'

function App() {
  const [scrollOffset, setScrollOffset] = useState(0)
  const [VisibleHint, setVisibleHint] = useState(true)

  useEffect(() => {
    if (scrollOffset > 0.03) {
      setVisibleHint(false)
    }
  }, [scrollOffset])

  return (
    <div className="App">
      <Scene onScrollUpdate={setScrollOffset} />
      <Navbar />
      <Footer scrollOffset={scrollOffset} />
      <SoundButton />
      <ScrollHint VisibleHint={VisibleHint} />
    </div>
  )
}

export default App
