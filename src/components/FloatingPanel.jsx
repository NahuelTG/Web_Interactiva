import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import Test from './../assets/svg/sound.svg'

const FloatingPanel = ({ position }) => {
  const panelRef = useRef()
  const [isHovered, setIsHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(0)

  const videos = [
    'https://www.youtube.com/embed/yxrjSE8XddA?si=8V_0hFFv6itw0DJv',
    'https://www.youtube.com/embed/bjxCH2fX4QU?si=izlkd_vj6dFFiQzc',
    'https://www.youtube.com/embed/QdBZY2fkU-0?si=qM65SU-7_HM-Kipu',
  ]

  useFrame(() => {
    if (panelRef.current) {
      panelRef.current.lookAt(-45, 0, 0)
    }
  })

  return (
    <group ref={panelRef} position={[4, 0.5, -5.5]}>
      <mesh onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)} onClick={() => setOpen(true)}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color={isHovered ? '#e0e0e0' : 'white'} transparent opacity={0.9} />
      </mesh>

      <Html center>
        <div className="panel-content">
          <img src={Test} alt="Interactive Icon" className="panel-icon" style={{ filter: isHovered ? 'brightness(1.2)' : 'none' }} />
        </div>
      </Html>

      {open && (
        <Html center>
          <div className="ui-modal">
            <div className="modal-content">
              <h2>Video Gallery</h2>

              <div className="video-selector">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    className={`video-button ${currentVideo === index ? 'active' : ''}`}
                    onClick={() => setCurrentVideo(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="video-container">
                <iframe
                  width="560"
                  height="315"
                  src={videos[currentVideo]}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <button
                className="close-button"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(false)
                }}
              >
                Close
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

export default FloatingPanel
