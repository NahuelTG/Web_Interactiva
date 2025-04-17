// src/components/FormularioProyecto.jsx

import './FormularioProyecto.css'

const FormularioProyecto = () => {
  return (
    <>
      <div className="formulario-container">
        <h2>Información del Proyecto</h2>
        <form className="formulario">
          <label>
            Nombre
            <input type="text" />
          </label>
          <label>
            Correo electrónico
            <input type="email" />
          </label>
          <label>
            Teléfono
            <input type="tel" placeholder="+Código de país Código de ciudad Número" />
          </label>
          <label>
            Sitio web
            <input type="url" />
          </label>
          <label>
            Instagram
            <input type="url" />
          </label>
          <label>
            Facebook
            <input type="url" />
          </label>
          <label>
            Gorjeo
            <input type="url" />
          </label>
          <label>
            Presupuesto en USD
            <input type="number" />
          </label>
          <label>
            Monto pendiente de financiación para completar el cortometraje
            <input type="number" />
          </label>
          <label>
            Presupuesto estimado de distribución
            <input type="number" />
          </label>
          <label>
            Monto pendiente de financiación para completar el cortometraje
            <input type="number" />
          </label>
          <label>
            Mercados, talleres o laboratorios en los que ha participado el proyecto
            <textarea />
          </label>
          <label>
            Premios y subvenciones recibidos
            <textarea />
          </label>
          <label>
            Objetivos en BREVE
            <textarea defaultValue="Warmi Lab Bolivia 2024, laboratorio MICsur 2024, Showcase XR Mediamorfosis 2024" />
          </label>
          <label>
            Ficción inspirada en la cosmovisión andina (máximo 300 caracteres)
            <textarea maxLength={300} defaultValue="283 / 300" />
          </label>
          <label>
            Enlace de visualización de Screener
            <input type="url" />
          </label>
          <label>
            Contraseña para el enlace de visualización del Screener
            <input type="text" />
          </label>
          <label>
            Enlace de descarga del Screener en formato .mov
            <input type="url" />
          </label>
        </form>
      </div>
      <style>
        {`
.formulario-container {
  padding: 2rem;
  background-color: #0d0d1a;
  border: 2px solid #00d4ff;
  border-radius: 12px;
  max-width: 700px;
  margin: 2rem auto;
  color: white;
  font-family: 'Helvetica Neue', sans-serif;
}

.formulario-container h2 {
  text-align: right;
  color: #00d4ff;
  margin-bottom: 1.5rem;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.formulario label {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  font-size: 0.95rem;
}

.formulario input,
.formulario textarea {
  margin-top: 0.25rem;
  padding: 0.5rem 0.75rem;
  width: 100%;
  max-width: 100%;
  border: 1px solid #00d4ff;
  border-radius: 6px;
  background-color: #111122;
  color: white;
  font-size: 0.95rem;
}

.formulario textarea {
  resize: vertical;
  min-height: 80px;
}

.formulario input:focus,
.formulario textarea:focus {
  outline: none;
  border-color: #00ffff;
  box-shadow: 0 0 4px #00d4ff;
}
`}
      </style>
    </>
  )
}

export default FormularioProyecto
