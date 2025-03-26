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
      <FloatingText texto={'De vuelta'} position={[5, 0, 6]} rotation={[0, THREE.MathUtils.degToRad(170), 0]} />

      <ScrollControls pages={30} damping={0.2}>
        <CameraController />
        <CircularPath />
        <FloatingPanel position={[1, 0.35, -5.25]} rotation={[0, THREE.MathUtils.degToRad(270), 0]} images={galleryContent} />
        <FloatingPanel position={[4, 1, -1]} rotation={[0, THREE.MathUtils.degToRad(230), 0]} images={galleryContent} />
        <FloatingPanel position={[1, 1, 5]} rotation={[0, THREE.MathUtils.degToRad(170), 0]} images={galleryContent} />
        <FloatingPanel position={[-5, 1, -8]} rotation={[0, THREE.MathUtils.degToRad(310), 0]} images={galleryContent} />
      </ScrollControls>

      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </Canvas>
  )
}

export default Scene
