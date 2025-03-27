/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import CircularPath from './CircularPath'
import Particles from './Particles'
import FloatingText from './FloatingText'
import * as THREE from 'three'
import BackgroundParticles from './BackgroundParticles'
import { CameraController } from './CameraController'
//import CatSound from './../assets/sounds/gloomy-cat.mp3'
import FloatingPanel from './FloatingPanel'
import { galleryContent } from '../assets/data/galleryContent'

const Scene = () => {
  return (
    <Canvas
      camera={{
        position: [0, 8, 10],
        fov: 50,
      }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.Fog('#0d0d1a', 10, 30)
      }}
      gl={{ antialias: true }} // Suaviza los bordes
      frameloop="always" // Optimiza rendimiento
      style={{ position: 'fixed' }} // Asegura posición
    >
      <BackgroundParticles />
      <Particles />
      <FloatingText texto={'Hola mundo'} position={[-7, 0, -7]} />
      <FloatingText texto={'De vuelta'} position={[5, 2, 6]} rotation={[0, THREE.MathUtils.degToRad(170), 0]} />

      <ScrollControls pages={30} damping={0.2}>
        <CameraController />
        <CircularPath />
        <FloatingPanel
          position={[5.3, 0.35, 1]}
          rotation={[0, THREE.MathUtils.degToRad(180), 0]}
          images={galleryContent}
          title={'Experiencias inmersivas'}
          subtitle={'Summergo Lab'}
        />
      </ScrollControls>

      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </Canvas>
  )
}

export default Scene
