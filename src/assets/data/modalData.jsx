// src/data/modalContent.js
export const modalInfo = {
  acerca: {
    title: 'ACERCA DE NOSOTROS',
    content: (
      <>
        <hr style={{ borderColor: 'rgba(0, 212, 255, 0.5)', margin: '20px 0' }} />
        <p>
          Somos un laboratorio creativo que une tecnología y patrimonio, implementamos{' '}
          <strong style={{ color: '#00d4ff' }}>experiencias inmersivas</strong> de{' '}
          <strong style={{ color: '#00d4ff' }}>
            realidad virtual, realidad aumentada, rutas sonoras, museos digitales, exhibiciones, mapping, documentales 360° y más.
          </strong>
        </p>
        <p>
          Nuestro nombre proviene del latín <strong style={{ color: '#00d4ff' }}>“summergere”</strong> (sumergirse), y expresa nuestra
          vocación por crear proyectos que invitan a una inmersión en nuevas formas de ver, explorar e interactuar culturas y las historias.
        </p>
        <p>
          El concepto de Summergō también dialoga con la filosofía detrás del lema{' '}
          <strong style={{ color: '#00d4ff' }}>“cogito ergo sum”</strong> (pienso, por lo tanto existo), porque creemos firmemente que la
          tecnología no solo debe emocionar, sino también provocar reflexión: una herramienta para conocer nuestro pasado, interactuar
          críticamente con nuestro presente y construir nuevas miradas hacia el futuro.
        </p>
        <p>
          En Summergō Lab, la tecnología no es un artificio, sino una aliada transformadora. La convertimos en{' '}
          <strong style={{ color: '#00d4ff' }}>museografía digital innovadora e interactiva</strong>, capaz de tender puentes entre épocas,
          activar la memoria y enriquecer la experiencia cultural, turística y/o educativa.
        </p>

        {/* Línea divisoria opcional para separar el contenido principal del contacto */}
      </>
    ),
  },
  exposiciones: {
    title: 'EXHIBICIONES',
    content: (
      <>
        <hr style={{ borderColor: 'rgba(0, 212, 255, 0.5)', margin: '20px 0' }} />
        <p>Ha exhibido en los museos más importantes del país:</p>
        <ul>
          <li>Museo Nacional de Paleontología y Arqueología de Tarija</li>
          <li>Museo Nacional de Arqueología en La Paz</li>
          <li>Museo de Arte Contemporáneo de Santa Cruz</li>
          <li>Museo de Historia Natural Alcide d&apos;Orbigny de Cochabamba</li>
        </ul>

        <p>Internacionalmente, han exhibido en:</p>
        <ul>
          <li>Museo Cassaco Italia 2025 . “Il Cantore del Friuli” Documental y aplicación de AR</li>
          <li>Museo Nacional de Bellas Artes en Santiago de Chile 2023</li>
          <li>Museo Palacio Portales Viña del Mar Chile 2024</li>
          <li>Sede oficial VR Day Brasil 2024.</li>
        </ul>

        <p>Sus obras se han exhibido en festivales destacados, incluyendo:</p>
        <ul>
          <li>15° Festival Internacional de Cine y Comunicación de los Pueblos Indígenas (Perú 2025)</li>
          <li>15th Annual Latino and Native American Film Festival LANAFF (EEUU 2025)</li>
          <li>
            Museo Digital Carnaval de Antaño de Sucre{' '}
            <a href="https://carnavaldesucre.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#00d4ff' }}>
              https://carnavaldesucre.com/
            </a>
          </li>
          <li>SELECCIÓN OFICIAL de #NarrarElFuturo: X Festival de Cine & Nuevos Medios Bogotá Colombia, 10 al 15 de septiembre de 2024</li>
        </ul>

        <h4>VR WASI</h4>
        <ul>
          <li>SELECCIÓN OFICIAL Mejor Cortometraje 360 y Categoría Poderosas</li>
          <li>Perú, enero 2025</li>
        </ul>

        <h4>Curaduría Latinoamericana, selección oficial obra “Portal Bolivia VR”</h4>
        <ul>
          <li>Museo Nacional de Bellas Artes Santiago de Chile - MICSUR</li>
          <li>Chile, 17 al 20 de abril de 2024</li>
        </ul>

        <h4>Ruta sonora inmersiva: El Tesoro Escondido de Tanga Tanga</h4>
        <ul>
          <li>Festival Sur Aural - Inteligencia Orgánica</li>
          <li>Transmisión 09, del 1 al 13 de julio de 2024</li>
        </ul>

        <h4>Cortometraje stop motion “Dos niñas” - Selección oficial</h4>
        <ul>
          <li>Comunidad Cinéfila Argentina</li>
          <li>Buenos Aires, agosto 2024</li>
        </ul>

        <h4>Exhibición nacional “Visionado del Videoarte Boliviano”</h4>
        <ul>
          <li>Cortometraje stop motion “Mujeres de Urdiembre” - Selección Oficial</li>
          <li>Cortometraje stop motion “Dos niñas” - Mención Especial</li>
          <li>La Paz, Cochabamba, Santa Cruz del 6 al 14 de junio de 2024</li>
        </ul>

        <h4>Performance teatral “Ñanta Awaspa”</h4>
        <ul>
          <li>Mapping Cocreación con el Teatro de Los Andes</li>
          <li>Casa de la Libertad (Sucre), Comunidad Potolo (Chuquisaca), Teatro Nuna (La Paz), Sede teatro de Los Andes (Yotala)</li>
          <li>Gira Nacional Bolivia, abril a junio 2024</li>
        </ul>

        <h4>Cortometraje stop motion “Mujeres de Urdiembre” - Selección Oficial</h4>
        <ul>
          <li>Festival Lift-Off Global Network sesiones New Voices P1</li>
          <li>Selección internacional, Julio 2024</li>
        </ul>

        <h4>Exhibición inmersiva: Paseo con dinosaurios</h4>
        <ul>
          <li>Librería La Audacia</li>
          <li>La Paz, 13 y 14 de julio 2024</li>
        </ul>

        <h4>Proyecto inmersivo VR y AR “Leer el cielo”</h4>
        <ul>
          <li>Warmi Fílmica- Antawara CineLab</li>
          <li>Cochabamba, julio 2024</li>
        </ul>

        <h4>Museo Carnaval de Antaño de Sucre VR - Portal Bolivia VR</h4>
        <ul>
          <li>Muestra artística “Piedra y Color” Galería Gíldaro Antezana</li>
          <li>Cochabamba, 24 de junio al 07 de julio 2024</li>
        </ul>

        <h4>Amazonía boliviana, documentales en 360° “Ruta del Asaí, Cacao y Castaña”</h4>
        <ul>
          <li>Museo de la Biodiversidad Bolivia CIBIOMA</li>
          <li>Beni, 17 de mayo 2024</li>
        </ul>

        <h4>Festival Latinoamericano de Cortometrajes de Animación EDA - 2024 (Dos obras)</h4>
        <h4>Festival Nacional Día Video Arte Boliviano (2024).</h4>
      </>
    ),
  },
  reconocimientos: {
    title: 'RECONOCIMIENTOS',
    content: (
      <>
        <hr style={{ borderColor: 'rgba(0, 212, 255, 0.5)', margin: '20px 0' }} />
        <p>
          Summergō, laboratorio creativo que cuenta con más de 10 años de experiencia en la narración de historias a través de
          audiovisuales, animación y experiencias inmersivas. Sus producciones han recibido reconocimientos, entre ellos:
        </p>
        <ul>
          <li>Premio Nacional Eduardo Abaroa, categoría cortometraje documental “Cuando Perdimos el miedo” (Marzo 2025)</li>
          <li>Top 10 Mejores Emprendimientos de Bolivia 2024.</li>
          <li>Organizadores VR Day Latam desde gestión 2023, capítulo Bolivia.</li>
          <li>Premio Nacional Eduardo Abaroa “leyenda El Tesoro de Tanga Tanga” (2023)</li>
          <li>Festival de Cine SUNDANCE Program New Frontier 2023</li>
          <li>
            Premio Nacional Imágenes del Nuevo Tiempo de la Fundación Cultural del Banco Central de Bolivia “Mujeres de urdiembre”(2022)
          </li>
          <li>Premio Sucre capital creativa y colaborativa “P´unchay, con el Teatro de Los Andes” (2020).</li>
          <li>Comunidades innovación en Metaverso 2020</li>
          <li>Premio Departamental Juana Azurduy de Padilla “Sikus y pukaras” (2019)</li>
          <li>Observatorio Latinoamericano Democracia Digital 2023</li>
          <li>Finalistas en el premio Latinoamericano Innovatic 2022</li>
          <li>Seleccionados como emprendimiento de Triple Impacto por la embajada de Estados Unidos</li>
          <li>Ganadores de la convocatoria de Iniciativas Destacadas de la Fundación Actívate-WarmiLab</li>
        </ul>
      </>
    ),
  },
  // Puedes añadir más secciones aquí en el futuro
}
