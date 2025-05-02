// src/App.js
import { useState } from 'react' // Importa useState
import './App.css'
import Scene from './components/Scene'
import { Footer } from './components/ui/Footer'
import { Navbar } from './components/ui/Navbar'

function App() {
  // Estado para guardar el progreso del scroll (0 a 1)
  const [scrollOffset, setScrollOffset] = useState(0)

  return (
    <div className="App">
      {/* Pasa la función para actualizar el estado a Scene */}
      <Scene onScrollUpdate={setScrollOffset} />
      <Navbar />
      {/* Pasa el valor del estado actual a Footer */}
      <Footer scrollOffset={scrollOffset} />
    </div>
  )
}

export default App
