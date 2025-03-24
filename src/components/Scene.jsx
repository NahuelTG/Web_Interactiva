import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import CircularPath from './CircularPath'
import Particles from './Particles'
import FloatingText from './FloatingText'
import * as THREE from 'three'
import BackgroundParticles from './BackgroundParticles'
import CatSound from './../assets/sounds/gloomy-cat.mp3'
import FloatingPanel from './FloatingPanel'

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
      gl={{ antialias: true }} // Suaviza los bordes
      frameloop="demand" // Optimiza rendimiento
      style={{ position: 'fixed' }} // Asegura posición
    >
      <BackgroundParticles />
      <Particles />
      <FloatingText texto={'Hola mundo'} position={[-7, 0, -7]} />
      <FloatingText texto={'De vuelta'} position={[5, 0, 6]} rotation={[0, THREE.MathUtils.degToRad(170), 0]} />

      <ScrollControls pages={30} damping={0.2}>
        <CameraController />
        <CircularPath />
        <FloatingPanel position={[6, 1.5, -6]} rotation={[0, THREE.MathUtils.degToRad(270), 0]} />
        <FloatingPanel position={[7, 1.5, -1]} rotation={[0, THREE.MathUtils.degToRad(230), 0]} />
        <FloatingPanel position={[4, 1.5, 5]} rotation={[0, THREE.MathUtils.degToRad(170), 0]} />
        <FloatingPanel position={[-1, 1.5, -8]} rotation={[0, THREE.MathUtils.degToRad(310), 0]} />
      </ScrollControls>

      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </Canvas>
  )
}

export default Scene
