import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import CircularPath from './CircularPath'
import Particles from './Particles'
import FloatingText from './FloatingText'
import DynamicText from './DynamicText'
import MovingLights from './MovingLights'
import * as THREE from 'three' // Importamos Three.js
import BackgroundParticles from './BackgroundParticles'
import CenteredText from './CenteredText'
import FloatingButtons from './FloatingButtons'
import RotatingLights from './RotatingLights'
import AmbientSound from './AmbientSound'
import CatSound from './../assets/sounds/gloomy-cat.mp3'

const CameraController = () => {
  const { camera } = useThree()
  const scroll = useScroll() // Obtenemos el hook de scroll

  useFrame(() => {
    // Aseguramos que el scroll está inicializado antes de usarlo
    if (scroll) {
      const angle = scroll.offset * Math.PI * 2 // Rango de 0 a 2PI
      const radius = 5 // Radio del círculo

      // Actualizamos la posición de la cámara para que siga el camino
      camera.position.set(
        Math.cos(angle) * radius, // Movimiento circular en X
        1.5, // Altura de la cámara
        Math.sin(angle) * radius // Movimiento circular en Z
      )

      // La cámara mira siempre al centro del círculo
      camera.lookAt(0, 0, 0)
    }
  })

  return null // No renderizamos nada, solo controlamos la cámara
}

const Scene = () => {
  return (
    <Canvas
      camera={{
        position: [0, 8, 10], // Cámara inclinada
        fov: 45,
      }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.Fog('#0d0d1a', 10, 30) // Color y distancia de la niebla
      }}
    >
      <MovingLights />
      <BackgroundParticles />
      <Particles />
      <FloatingText />
      <DynamicText />
      <RotatingLights />
      <AmbientSound url={CatSound} />

      {/* Controles de scroll */}
      <ScrollControls pages={100} damping={0.1}>
        {/* Controlador de cámara */}
        <CameraController />
        {/* Camino circular */}
        <CircularPath />
        <CenteredText />
        <FloatingButtons />
      </ScrollControls>

      {/* Luz */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </Canvas>
  )
}

export default Scene
