// src/components/FormularioProyecto.jsx
const FormularioProyecto = () => {
  return (
    <>
      <div className="ficha-container">
        <h2>Summergo Lab</h2>
        <div className="ficha-item">
          <strong>Nombre:</strong> <span>Nombre del Proyecto</span>
        </div>
        <div className="ficha-item">
          <strong>Correo electrónico:</strong> <span>correo@example.com</span>
        </div>
        <div className="ficha-item">
          <strong>Teléfono:</strong> <span>+591 4 1234567</span>
        </div>
        <div className="ficha-item">
          <strong>Sitio web:</strong> <span>https://miproyecto.com</span>
        </div>
        <div className="ficha-item">
          <strong>Instagram:</strong> <span>@proyecto</span>
        </div>
        <div className="ficha-item">
          <strong>Facebook:</strong> <span>/proyectoFB</span>
        </div>
        <div className="ficha-item">
          <strong>Gorjeo:</strong> <span>@proyecto</span>
        </div>
        <div className="ficha-item">
          <strong>Presupuesto en USD:</strong> <span>10000</span>
        </div>
        <div className="ficha-item">
          <strong>Monto pendiente de financiación:</strong> <span>2000</span>
        </div>
        <div className="ficha-item">
          <strong>Presupuesto estimado de distribución:</strong> <span>3000</span>
        </div>
        <div className="ficha-item">
          <strong>Mercados / talleres:</strong> <span>Warmi Lab, MICsur, Mediamorfosis</span>
        </div>
        <div className="ficha-item">
          <strong>Premios recibidos:</strong> <span>Premio Nacional, Selección XR</span>
        </div>
        <div className="ficha-item">
          <strong>Objetivos en breve:</strong> <span>Visibilidad, impacto cultural y educación XR</span>
        </div>
        <div className="ficha-item">
          <strong>Ficción inspirada en la cosmovisión andina:</strong> <span>283 / 300</span>
        </div>
        <div className="ficha-item">
          <strong>Enlace de visualización:</strong> <span>https://screener.com</span>
        </div>
        <div className="ficha-item">
          <strong>Contraseña de screener:</strong> <span>1234</span>
        </div>
        <div className="ficha-item">
          <strong>Enlace descarga .mov:</strong> <span>https://screener.com/video.mov</span>
        </div>
      </div>
      <style>
        {`
.ficha-container {
  background-color: #0d0d1a;
  color: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 700px;
  margin: 2rem auto;
  border: 2px solid #00d4ff;
  font-family: 'Helvetica Neue', sans-serif;
}

.ficha-container h2 {
  text-align: center;
  color: #00d4ff;
  margin-bottom: 1.5rem;
}

.ficha-item {
  display: flex;
  justify-content: space-between;
  text-align: right;
  border-bottom: 1px solid #222;
  padding: 0.5rem 0;
}

.ficha-item strong {
  flex: 1;
  padding-right: 20px;
  color: #00d4ff;
}

.ficha-item span {
  flex: 1;
  text-align: left;
}

`}
      </style>
    </>
  )
}

export default FormularioProyecto
