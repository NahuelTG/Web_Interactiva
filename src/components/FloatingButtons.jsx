import { Html } from '@react-three/drei'

const FloatingButtons = () => {
  return (
    <Html position={[0, 3, -5]} center>
      <div style={{ textAlign: 'center' }}>
        <button
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(90deg, #6C63FF, #00C6FF)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
          onClick={() => window.open('https://github.com', '_blank')}
        >
          Visitar mi GitHub
        </button>
      </div>
    </Html>
  )
}

export default FloatingButtons
