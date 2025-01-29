import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import CircularPath from './CircularPath'
import Particles from './Particles'
import FloatingText from './FloatingText'
import DynamicText from './DynamicText'
import MovingLights from './MovingLights'
import * as THREE from 'three'
import BackgroundParticles from './BackgroundParticles'
import CenteredText from './CenteredText'
import FloatingButtons from './FloatingButtons'
import RotatingLights from './RotatingLights'
import AmbientSound from './AmbientSound'
import CatSound from './../assets/sounds/gloomy-cat.mp3'
import { Vector3, Quaternion } from 'three'
import { useSpring } from '@react-spring/three'

const CameraController = () => {
  const { camera } = useThree()
  const scroll = useScroll()
  const radius = 5
  const altura = 0.3
  const offset = 0.1 // Pequeña anticipación para que la cámara mire adelante en su trayectoria

  useFrame(() => {
    if (scroll) {
      const angle = -scroll.offset * Math.PI * 2

      // Posición de la cámara en el círculo
      const posX = Math.cos(angle) * radius
      const posZ = Math.sin(angle) * radius
      camera.position.set(posX, altura, posZ)

      // Punto hacia donde la cámara debe mirar (ligeramente adelantado en la trayectoria)
      const lookAtX = Math.cos(angle + offset) * radius
      const lookAtZ = Math.sin(angle + offset) * radius
      camera.lookAt(lookAtX, altura, lookAtZ)
    }
  })

  return null
}

const Scene = () => {
  return (
    <Canvas
      camera={{
        position: [0, 8, 10],
        fov: 45,
      }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.Fog('#0d0d1a', 10, 30)
      }}
    >
      <MovingLights />
      <BackgroundParticles />
      <Particles />
      <FloatingText />
      <RotatingLights />
      <AmbientSound url={CatSound} />

      <ScrollControls pages={30} damping={0.1}>
        <CameraController />
        <CircularPath />
        <FloatingButtons />
      </ScrollControls>

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </Canvas>
  )
}

export default Scene
