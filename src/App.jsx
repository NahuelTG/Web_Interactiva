// src/App.js
import { useState } from 'react'
import './App.css'
import Scene from './components/Scene'
import { Footer } from './components/ui/Footer'
import { Navbar } from './components/ui/Navbar'
import { Begin } from './components/panels/Begin'
import SoundButton from './components/buttons/SoundButton'

function App() {
  const [scrollOffset, setScrollOffset] = useState(0)

  return (
    <div className="App">
      <Scene onScrollUpdate={setScrollOffset} />
      <Navbar />
      <Footer scrollOffset={scrollOffset} />
      <Begin />
      <SoundButton />
    </div>
  )
}

export default App
