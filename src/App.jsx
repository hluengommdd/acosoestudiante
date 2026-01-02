import { useState } from 'react'
import { abrirVistaImpresion } from './utils/printUtils'
import logo from '../logo-oficial.png'

function App() {
  const [formData, setFormData] = useState({
    curso: '',
    edad: '',
    sexo: [],
    tiempo_colegio: '',
    // Preguntas 1-33
    ...Object.fromEntries(Array.from({ length: 33 }, (_, i) => [`pregunta_${i + 1}`, ''])),
    pregunta_33_especifica: '',
    // Información adicional
    inicio_acoso: '',
    quienes_molestan: [],
    grupo_cantidad: '',
    grupo_nombres: '',
    donde_ocurre: [],
    otro_lugar_especifica: '',
    adultos: '',
    intervencion: '',
    apoyo_comp: '',
    // Sentimientos
    sentimientos: [],
    otros_sentimientos: '',
    // A quién ha contado
    contado_padres: '',
    contado_profesores: '',
    contado_directivos: '',
    contado_psicologo: '',
    contado_amigos: '',
    contado_otro: '',
    contado_nadie: '',
    resultado_contado: '',
    razon_no_contado: '',
    otra_razon_especifica: '',
    // Apoyo necesario
    apoyo_necesita: [],
    otro_apoyo_especifica: '',
    // Historia
    espacio_historia: ''
  })

  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name, value) => {
    setFormData(prev => {
      const current = prev[name] || []
      const newValue = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      return { ...prev, [name]: newValue }
    })
  }

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const imprimirPDF = () => {
    abrirVistaImpresion(formData)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 1500)
  }

  const limpiarFormulario = () => {
    if (window.confirm('¿Desea limpiar todo el formulario?')) {
      setFormData({
        curso: '',
        edad: '',
        sexo: [],
        tiempo_colegio: '',
        ...Object.fromEntries(Array.from({ length: 33 }, (_, i) => [`pregunta_${i + 1}`, ''])),
        pregunta_33_especifica: '',
        inicio_acoso: '',
        quienes_molestan: [],
        grupo_cantidad: '',
        grupo_nombres: '',
        donde_ocurre: [],
        otro_lugar_especifica: '',
        adultos: '',
        intervencion: '',
        apoyo_comp: '',
        sentimientos: [],
        otros_sentimientos: '',
        contado_padres: '',
        contado_profesores: '',
        contado_directivos: '',
        contado_psicologo: '',
        contado_amigos: '',
        contado_otro: '',
        contado_nadie: '',
        resultado_contado: '',
        razon_no_contado: '',
        otra_razon_especifica: '',
        apoyo_necesita: [],
        otro_apoyo_especifica: '',
        espacio_historia: ''
      })
    }
  }

  return (
    <div className="container">
      <div className="logo-section">
        <img src={logo} alt="Logo institucional" className="form-logo" />
        <div className="logo-text">
          <h1>CUESTIONARIO DE EXPERIENCIAS EN LA ESCUELA OBVQ-R</h1>
          <p>Para Estudiantes de Educación Primaria</p>
        </div>
      </div>

      <div className="confidencial">
        <strong>PRESENTACIÓN</strong><br />
        Hola, estudiante.<br /><br />
        Este cuestionario es <strong>completamente confidencial y anónimo</strong>. Su propósito es entender mejor tus experiencias en la escuela para poder <strong>ayudarte</strong> y mejorar la convivencia en nuestro colegio.<br /><br />
        No hay respuestas correctas o incorrectas. Solo queremos saber la verdad sobre lo que vives en la escuela. Tus respuestas nos ayudarán a:
        <ul>
          <li>Identificar situaciones de acoso o maltrato</li>
          <li>Diseñar apoyos especiales para ti</li>
          <li>Crear un ambiente más seguro y respetuoso</li>
          <li>Intervenir de manera justa y protegerte</li>
        </ul>
        Recuerda: Esta información será manejada con el mayor cuidado por profesionales de apoyo del colegio.
      </div>

      <div className="instrucciones">
        <strong>INSTRUCCIONES</strong><br />
        1. Lee cada pregunta cuidadosamente - Si no entiendes algo, levanta la mano para que alguien te ayude<br />
        2. Marca con una X la opción que mejor describe lo que te ha pasado<br />
        3. Sé honesto - Tu sinceridad es muy importante<br />
        4. Tómate tu tiempo - No hay prisa<br />
        5. Privacidad garantizada - Nadie sabrá quién respondió qué
      </div>

      <h2>PRIMERA PARTE: INFORMACIÓN GENERAL</h2>
      <div className="section">
        <div className="campo">
          <label>Curso:</label>
          <input 
            type="text" 
            name="curso"
            value={formData.curso}
            onChange={handleInputChange}
            placeholder="Ej: 6° A" 
          />
        </div>

        <div className="grid-two-col">
          <div className="campo">
            <label>Edad:</label>
            <input 
              type="number" 
              name="edad"
              value={formData.edad}
              onChange={handleInputChange}
              min="8" 
              max="18" 
              placeholder="Años" 
            />
          </div>
        </div>

        <div className="campo">
          <label>Sexo:</label>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                checked={formData.sexo.includes('Masculino')}
                onChange={() => handleCheckboxChange('sexo', 'Masculino')}
              />
              <label>Masculino</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                checked={formData.sexo.includes('Femenino')}
                onChange={() => handleCheckboxChange('sexo', 'Femenino')}
              />
              <label>Femenino</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                checked={formData.sexo.includes('Otro')}
                onChange={() => handleCheckboxChange('sexo', 'Otro')}
              />
              <label>Otro</label>
            </div>
            <div className="checkbox-item">
              <input 
                type="checkbox" 
                checked={formData.sexo.includes('Prefiero no especificar')}
                onChange={() => handleCheckboxChange('sexo', 'Prefiero no especificar')}
              />
              <label>Prefiero no especificar</label>
            </div>
          </div>
        </div>

        <div className="campo">
          <label>¿Hace cuánto tiempo asistes a este colegio?</label>
          <div className="radio-group">
            <div className="radio-item">
              <input 
                type="radio" 
                checked={formData.tiempo_colegio === 'menos_1_anio'}
                onChange={() => handleRadioChange('tiempo_colegio', 'menos_1_anio')}
              />
              <label>Menos de 1 año</label>
            </div>
            <div className="radio-item">
              <input 
                type="radio" 
                checked={formData.tiempo_colegio === '1_2_anios'}
                onChange={() => handleRadioChange('tiempo_colegio', '1_2_anios')}
              />
              <label>Entre 1 y 2 años</label>
            </div>
            <div className="radio-item">
              <input 
                type="radio" 
                checked={formData.tiempo_colegio === 'mas_2_anios'}
                onChange={() => handleRadioChange('tiempo_colegio', 'mas_2_anios')}
              />
              <label>Más de 2 años</label>
            </div>
          </div>
        </div>
      </div>

      <h2>SEGUNDA PARTE: DEFINICIÓN DE ACOSO</h2>
      <div className="importante">
        <strong>DEFINICIÓN DE ACOSO ESCOLAR (BULLYING)</strong><br />
        Antes de responder el cuestionario, es importante entender qué es el <strong>acoso escolar (bullying)</strong>.<br /><br />
        El acoso escolar es cuando otros estudiantes:<br />
        • Te molestan, se burlan o te insultan repetidamente<br />
        • Te dejan fuera de grupo o no juegan contigo<br />
        • Te golpean, empujan o lastiman físicamente<br />
        • Te amenazan o intimidan<br />
        • Te roban o dañan tus cosas<br />
        • Te molestan por internet, redes sociales o mensajes<br />
        • Hacen cosas para hacerte sentir mal<br /><br />
        Lo importante es que: Esto ocurre <strong>varias veces</strong> y es <strong>deliberado</strong> (que lo hacen a propósito).<br /><br />
        Si tienes dudas sobre algún comportamiento, pregunta sin miedo.
      </div>

      <h2>TERCERA PARTE: TU EXPERIENCIA EN LA ESCUELA</h2>
      <p>En los últimos meses, ¿te ha pasado lo siguiente?</p>
      <p><strong>Usa esta escala para responder:</strong></p>
      <div className="radio-group">
        <div className="radio-item">
          <input type="radio" disabled />
          <label><strong>Nunca</strong> = Esto no me ha pasado</label>
        </div>
        <div className="radio-item">
          <input type="radio" disabled />
          <label><strong>Una o dos veces</strong> = Me ha pasado pocas veces (en los últimos meses)</label>
        </div>
        <div className="radio-item">
          <input type="radio" disabled />
          <label><strong>Varias veces al mes</strong> = Me pasa ocasionalmente (2-3 veces aproximadamente al mes)</label>
        </div>
        <div className="radio-item">
          <input type="radio" disabled />
          <label><strong>Una o más veces a la semana</strong> = Me pasa frecuentemente (varias veces cada semana)</label>
        </div>
        <div className="radio-item">
          <input type="radio" disabled />
          <label><strong>Varias veces a la semana</strong> = Me pasa muy a menudo (casi diariamente)</label>
        </div>
      </div>

      <h3>PREGUNTA GENERAL - MUY IMPORTANTE</h3>
      <table>
        <thead>
          <tr>
            <th className="pregunta-cell">Pregunta</th>
            <th className="option-cell"><span className="scale-header">Nunca</span></th>
            <th className="option-cell"><span className="scale-header">Una o dos veces</span></th>
            <th className="option-cell"><span className="scale-header">Varias veces al mes</span></th>
            <th className="option-cell"><span className="scale-header">Una o más veces a la semana</span></th>
            <th className="option-cell"><span className="scale-header">Varias veces a la semana</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1. En general, ¿con qué frecuencia has sido acosado en la escuela? (Acoso significa que alguien te ha lastimado a propósito, repetidas veces, y no puedes defenderte fácilmente)</td>
            <td className="option-cell"><input type="radio" checked={formData.pregunta_1 === '0'} onChange={() => handleRadioChange('pregunta_1', '0')} /></td>
            <td className="option-cell"><input type="radio" checked={formData.pregunta_1 === '1'} onChange={() => handleRadioChange('pregunta_1', '1')} /></td>
            <td className="option-cell"><input type="radio" checked={formData.pregunta_1 === '2'} onChange={() => handleRadioChange('pregunta_1', '2')} /></td>
            <td className="option-cell"><input type="radio" checked={formData.pregunta_1 === '3'} onChange={() => handleRadioChange('pregunta_1', '3')} /></td>
            <td className="option-cell"><input type="radio" checked={formData.pregunta_1 === '4'} onChange={() => handleRadioChange('pregunta_1', '4')} /></td>
          </tr>
        </tbody>
      </table>

      <QuestionSection 
        title="SECCIÓN A: INSULTOS Y BURLAS"
        questions={[
          { num: 2, text: 'Me han llamado con nombres feos, me han burlado de mí o me han bromeado de forma hiriente' },
          { num: 3, text: 'Me han dicho que soy poco atractivo, que soy feo o que mi cuerpo no es bonito' },
          { num: 4, text: 'Me han insultado por mi raza, color de piel o donde vengo' },
          { num: 5, text: 'Me han insultado por mis creencias religiosas' },
          { num: 6, text: 'Me han hecho comentarios desagradables sobre mis gustos o mis características' },
          { num: 7, text: 'Me han hecho bromas sobre mi forma de hablar, mi acento o porque soy de otro país' }
        ]}
        formData={formData}
        onRadioChange={handleRadioChange}
      />

      <QuestionSection 
        title="SECCIÓN B: EXCLUSIÓN Y RECHAZO SOCIAL"
        questions={[
          { num: 8, text: 'Me han dejado fuera de sus juegos o actividades a propósito' },
          { num: 9, text: 'Me han dicho que no puedo jugar con ellos' },
          { num: 10, text: 'Me han ignorado completamente o no me hablan' },
          { num: 11, text: 'Me han prohibido a otros que jueguen conmigo o sean mis amigos' },
          { num: 12, text: 'Otros estudiantes desaparecen o se van cuando llego' },
          { num: 13, text: 'Me han hablado mal con otros estudiantes para que no quieran estar conmigo' },
          { num: 14, text: 'Me han excluido de chats de WhatsApp, juegos online o redes sociales' }
        ]}
        formData={formData}
        onRadioChange={handleRadioChange}
      />

      <QuestionSection 
        title="SECCIÓN C: AGRESIÓN FÍSICA"
        questions={[
          { num: 15, text: 'Me han golpeado, pateado o empujado' },
          { num: 16, text: 'Me han jalado del pelo o arañado' },
          { num: 17, text: 'Me han encerrado en algún lugar' },
          { num: 18, text: 'Me han aventado cosas (pelotas, piedras, cuadernos, etc.)' }
        ]}
        formData={formData}
        onRadioChange={handleRadioChange}
      />

      <QuestionSection 
        title="SECCIÓN D: DAÑO A PERTENENCIAS"
        questions={[
          { num: 19, text: 'Me han robado dinero u otras cosas' },
          { num: 20, text: 'Me han roto o dañado a propósito mis cosas (mochilas, útiles, ropa, etc.)' },
          { num: 21, text: 'Me han sacado mis cosas sin permiso o las han dañado' }
        ]}
        formData={formData}
        onRadioChange={handleRadioChange}
      />

      <QuestionSection 
        title="SECCIÓN E: AMENAZAS E INTIMIDACIÓN"
        questions={[
          { num: 22, text: 'Me han amenazado o intimidado' },
          { num: 23, text: 'Me han obligado a hacer cosas que no quería hacer' },
          { num: 24, text: 'Me han dicho que van a contarles a otros algo malo de mí' }
        ]}
        formData={formData}
        onRadioChange={handleRadioChange}
      />

      <QuestionSection 
        title="SECCIÓN F: ACOSO POR MEDIOS DIGITALES"
        questions={[
          { num: 25, text: 'Me han molestado usando celulares (mensajes, fotos, videos)' },
          { num: 26, text: 'Me han molestado usando internet o redes sociales (Facebook, WhatsApp, TikTok, etc.)' },
          { num: 27, text: 'Me han enviado mensajes o comentarios desagradables' }
        ]}
        formData={formData}
        onRadioChange={handleRadioChange}
      />

      <h3>SECCIÓN G: OTROS TIPOS DE ACOSO</h3>
      <table>
        <thead>
          <tr>
            <th className="pregunta-cell">Pregunta</th>
            <th className="option-cell"><span className="scale-header">Nunca</span></th>
            <th className="option-cell"><span className="scale-header">Una o dos veces</span></th>
            <th className="option-cell"><span className="scale-header">Varias veces al mes</span></th>
            <th className="option-cell"><span className="scale-header">Una o más veces a la semana</span></th>
            <th className="option-cell"><span className="scale-header">Varias veces a la semana</span></th>
          </tr>
        </thead>
        <tbody>
          {[
            { num: 28, text: 'Me han tocado de forma desagradable o inapropiada' },
            { num: 29, text: 'Me han hecho comentarios de naturaleza sexual que me incomodan' },
            { num: 30, text: 'Me han molestado, excluido o acosado por tener autismo, TDAH, dislexia u otra diferencia en cómo aprendo o me comporto' },
            { num: 31, text: 'Me han molestado o excluido por venir de otro país, mi acento, o porque soy extranjero/a' },
            { num: 32, text: 'Me han acosado por mi identidad de género, orientación sexual u otra característica personal' }
          ].map(q => (
            <tr key={q.num}>
              <td>{q.num}. {q.text}</td>
              <td className="option-cell"><input type="radio" checked={formData[`pregunta_${q.num}`] === '0'} onChange={() => handleRadioChange(`pregunta_${q.num}`, '0')} /></td>
              <td className="option-cell"><input type="radio" checked={formData[`pregunta_${q.num}`] === '1'} onChange={() => handleRadioChange(`pregunta_${q.num}`, '1')} /></td>
              <td className="option-cell"><input type="radio" checked={formData[`pregunta_${q.num}`] === '2'} onChange={() => handleRadioChange(`pregunta_${q.num}`, '2')} /></td>
              <td className="option-cell"><input type="radio" checked={formData[`pregunta_${q.num}`] === '3'} onChange={() => handleRadioChange(`pregunta_${q.num}`, '3')} /></td>
              <td className="option-cell"><input type="radio" checked={formData[`pregunta_${q.num}`] === '4'} onChange={() => handleRadioChange(`pregunta_${q.num}`, '4')} /></td>
            </tr>
          ))}
          <tr>
            <td>
              33. Me han acosado de otra manera (especifica):
              <input 
                type="text" 
                name="pregunta_33_especifica"
                value={formData.pregunta_33_especifica}
                onChange={handleInputChange}
                style={{ width: '100%', marginTop: '5px' }} 
                placeholder="Especifique..." 
              />
            </td>
            <td className="option-cell"><input type="radio" checked={formData.pregunta_33 === '0'} onChange={() => handleRadioChange('pregunta_33', '0')} /></td>
            <td className="option-cell"><input type="radio" checked={formData.pregunta_33 === '1'} onChange={() => handleRadioChange('pregunta_33', '1')} /></td>
            <td className="option-cell"><input type="radio" checked={formData.pregunta_33 === '2'} onChange={() => handleRadioChange('pregunta_33', '2')} /></td>
            <td className="option-cell"><input type="radio" checked={formData.pregunta_33 === '3'} onChange={() => handleRadioChange('pregunta_33', '3')} /></td>
            <td className="option-cell"><input type="radio" checked={formData.pregunta_33 === '4'} onChange={() => handleRadioChange('pregunta_33', '4')} /></td>
          </tr>
        </tbody>
      </table>

      <h2>CUARTA PARTE: INFORMACIÓN ADICIONAL</h2>
      <AdditionalInfo formData={formData} onInputChange={handleInputChange} onRadioChange={handleRadioChange} onCheckboxChange={handleCheckboxChange} />

      <h2>QUINTA PARTE: CÓMO TE SIENTES</h2>
      <Feelings formData={formData} onCheckboxChange={handleCheckboxChange} onInputChange={handleInputChange} />

      <h2>SEXTA PARTE: ¿A QUIÉN HAS CONTADO?</h2>
      <WhoTold formData={formData} onRadioChange={handleRadioChange} onInputChange={handleInputChange} />

      <h2>SÉPTIMA PARTE: LO QUE NECESITAS</h2>
      <Support formData={formData} onCheckboxChange={handleCheckboxChange} onInputChange={handleInputChange} />

      <h2>NOVENA PARTE: ESPACIO PARA CONTAR TU HISTORIA</h2>
      <p>Si deseas, puedes escribir algo más sobre tus experiencias. Esto nos ayudará a entenderte mejor y a diseñar las estrategias de apoyo más adecuadas para ti.</p>
      <p><strong>¿Qué más me gustaría que los adultos del colegio supieran sobre lo que me está pasando?</strong></p>
      <textarea 
        name="espacio_historia"
        value={formData.espacio_historia}
        onChange={handleInputChange}
        maxLength={2000}
        placeholder="Escribe tus pensamientos aquí..." 
      />
      <small style={{ display: 'block', marginTop: '4px', color: (formData.espacio_historia || '').length > 1800 ? '#e74c3c' : '#7f8c8d' }}>
        {(formData.espacio_historia || '').length}/2000 caracteres máximo
      </small>

      <div className="footer-info">
        <strong>INFORMACIÓN IMPORTANTE AL FINAL</strong><br />
        ¡Gracias por tu sinceridad y confianza!<br /><br />
        Tus respuestas son muy valiosas. Esto nos permite:
        <ul>
          <li>✓ Identificar el acoso real que estás viviendo</li>
          <li>✓ Protegerte de forma inmediata</li>
          <li>✓ Iniciar procesos de mediación o intervención</li>
          <li>✓ Crear un ambiente escolar más seguro para todos</li>
        </ul>
        <strong>Próximos Pasos:</strong>
        <ol>
          <li>Este cuestionario será revisado por el Equipo de Convivencia de nuestro colegio (psicólogo, trabajador social, inspector)</li>
          <li>Alguien te contactará en los próximos 2-3 días para conversar sobre tus experiencias de forma privada</li>
          <li>Diseñaremos un plan de apoyo personalizado contigo</li>
          <li>Se tomarán medidas para protegerte y sancionar el comportamiento inapropiado</li>
          <li>Seguimiento continuo para asegurar que las medidas funcionan</li>
        </ol>
      </div>

      <div className="importante">
        <strong>DECLARACIÓN DE CONFIDENCIALIDAD</strong><br />
        Este cuestionario está protegido bajo los principios de:
        <ul>
          <li>✓ <strong>Confidencialidad:</strong> Tu información será manejada solo por profesionales de apoyo</li>
          <li>✓ <strong>Privacidad:</strong> No se compartirá sin tu consentimiento, excepto para protegerte</li>
          <li>✓ <strong>Seguridad:</strong> La información se almacena de forma segura</li>
          <li>✓ <strong>Dignidad:</strong> Tu experiencia es importante y válida</li>
        </ul>
      </div>

      <div className="pdf-note">
        <strong>Nota:</strong><br />
        Al hacer clic en "Imprimir / Guardar PDF", se generará un documento con todas tus respuestas.
        Este documento puede imprimirse o guardarse como archivo PDF para su archivo personal.
      </div>

      {showSuccess && (
        <div className="success-message show">
          ¡Gracias por completar el cuestionario! Tu PDF se está generando y descargando.
        </div>
      )}

      <div className="submit-section">
        <button type="button" onClick={imprimirPDF}>🖨️ Imprimir / Guardar PDF</button>
        <button type="button" onClick={limpiarFormulario}>🔄 Limpiar Formulario</button>
      </div>
    </div>
  )
}

// Component for question sections
function QuestionSection({ title, questions, formData, onRadioChange }) {
  return (
    <>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th className="pregunta-cell">Pregunta</th>
            <th className="option-cell"><span className="scale-header">Nunca</span></th>
            <th className="option-cell"><span className="scale-header">Una o dos veces</span></th>
            <th className="option-cell"><span className="scale-header">Varias veces al mes</span></th>
            <th className="option-cell"><span className="scale-header">Una o más veces a la semana</span></th>
            <th className="option-cell"><span className="scale-header">Varias veces a la semana</span></th>
          </tr>
        </thead>
        <tbody>
          {questions.map(q => (
            <tr key={q.num}>
              <td>{q.num}. {q.text}</td>
              <td className="option-cell"><input type="radio" checked={formData[`pregunta_${q.num}`] === '0'} onChange={() => onRadioChange(`pregunta_${q.num}`, '0')} /></td>
              <td className="option-cell"><input type="radio" checked={formData[`pregunta_${q.num}`] === '1'} onChange={() => onRadioChange(`pregunta_${q.num}`, '1')} /></td>
              <td className="option-cell"><input type="radio" checked={formData[`pregunta_${q.num}`] === '2'} onChange={() => onRadioChange(`pregunta_${q.num}`, '2')} /></td>
              <td className="option-cell"><input type="radio" checked={formData[`pregunta_${q.num}`] === '3'} onChange={() => onRadioChange(`pregunta_${q.num}`, '3')} /></td>
              <td className="option-cell"><input type="radio" checked={formData[`pregunta_${q.num}`] === '4'} onChange={() => onRadioChange(`pregunta_${q.num}`, '4')} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

// Additional sections as separate components
function AdditionalInfo({ formData, onInputChange, onRadioChange, onCheckboxChange }) {
  return (
    <>
      <div className="campo">
        <label>¿Cuándo comenzó el acoso? ¿Hace cuánto tiempo que comienza este acaso?</label>
        <div className="radio-group">
          {[
            { value: 'menos_1_semana', label: 'Hace menos de 1 semana' },
            { value: '1_2_semanas', label: 'Hace 1-2 semanas' },
            { value: '1_3_meses', label: 'Hace 1-3 meses' },
            { value: '3_6_meses', label: 'Hace 3-6 meses' },
            { value: 'mas_6_meses', label: 'Hace más de 6 meses' },
            { value: 'no_recuerdo', label: 'No recuerdo muy bien cuándo empezó' }
          ].map(option => (
            <div className="radio-item" key={option.value}>
              <input type="radio" checked={formData.inicio_acoso === option.value} onChange={() => onRadioChange('inicio_acoso', option.value)} />
              <label>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="campo">
        <label>¿Quiénes te molestan? Marca todas las opciones que correspondan:</label>
        <div className="checkbox-group">
          {[
            { value: 'mismo_curso', label: 'Estudiantes de mi mismo curso' },
            { value: 'cursos_mayores', label: 'Estudiantes de cursos mayores' },
            { value: 'cursos_menores', label: 'Estudiantes de cursos menores' },
            { value: 'otros_cursos', label: 'Estudiantes de otros cursos' },
            { value: 'un_solo_estudiante', label: 'Un solo estudiante principalmente' },
            { value: 'un_grupo', label: 'Un grupo de estudiantes' }
          ].map(option => (
            <div className="checkbox-item" key={option.value}>
              <input type="checkbox" checked={formData.quienes_molestan?.includes(option.value)} onChange={() => onCheckboxChange('quienes_molestan', option.value)} />
              <label>{option.label}</label>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Si es un grupo, ¿cuántos aproximadamente?</label>
          <input type="number" name="grupo_cantidad" value={formData.grupo_cantidad} onChange={onInputChange} min="2" />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Nómbralos</label>
          <textarea 
            name="grupo_nombres" 
            value={formData.grupo_nombres || ''} 
            onChange={onInputChange} 
            maxLength={1000}
            placeholder="Escriba los nombres de los estudiantes..." 
            style={{ width: '100%', minHeight: '60px', padding: '8px', border: '1px solid #bdc3c7', borderRadius: '4px', fontFamily: "'Calibri', Arial", fontSize: '13px', boxSizing: 'border-box' }} 
          />
          <small style={{ display: 'block', marginTop: '4px', color: (formData.grupo_nombres || '').length > 900 ? '#e74c3c' : '#7f8c8d' }}>
            {(formData.grupo_nombres || '').length}/1000 caracteres
          </small>
        </div>
      </div>

      <div className="campo">
        <label>¿Dónde ocurre el acoso? Marca todas las situaciones que apliquen:</label>
        <div className="checkbox-group">
          {[
            { value: 'sala_clases', label: 'En la sala de clases' },
            { value: 'patio_recreo', label: 'En el patio o área de recreo' },
            { value: 'pasillos', label: 'En los pasillos' },
            { value: 'banos', label: 'En el baño' },
            { value: 'biblioteca', label: 'En la biblioteca' },
            { value: 'comedor', label: 'En el comedor' },
            { value: 'camino_casa', label: 'En el camino a casa o a la escuela' },
            { value: 'fuera_escuela', label: 'Fuera de la escuela (parque, centro comercial, etc.)' },
            { value: 'internet_redes', label: 'Por internet o redes sociales' }
          ].map(option => (
            <div className="checkbox-item" key={option.value}>
              <input type="checkbox" checked={formData.donde_ocurre?.includes(option.value)} onChange={() => onCheckboxChange('donde_ocurre', option.value)} />
              <label>{option.label}</label>
            </div>
          ))}
          <div className="checkbox-item">
            <input type="checkbox" checked={formData.donde_ocurre?.includes('otro_lugar')} onChange={() => onCheckboxChange('donde_ocurre', 'otro_lugar')} />
            <label>Otro lugar:</label>
            <input type="text" name="otro_lugar_especifica" value={formData.otro_lugar_especifica} onChange={onInputChange} style={{ width: '200px', marginLeft: '5px' }} placeholder="Especificar" />
          </div>
        </div>
      </div>

      <div className="campo">
        <label>Durante el acoso, ¿hay adultos cerca?</label>
        <div className="radio-group">
          {[
            { value: 'si_frecuentemente', label: 'Sí, frecuentemente' },
            { value: 'a_veces', label: 'A veces' },
            { value: 'rara_vez', label: 'Rara vez' },
            { value: 'nunca', label: 'Nunca' }
          ].map(option => (
            <div className="radio-item" key={option.value}>
              <input type="radio" checked={formData.adultos === option.value} onChange={() => onRadioChange('adultos', option.value)} />
              <label>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="campo">
        <label>Si hay adultos, ¿hacen algo?</label>
        <div className="radio-group">
          {[
            { value: 'si_intervienen', label: 'Sí, intervienen y me ayudan' },
            { value: 'a_veces_intervienen', label: 'A veces intervienen' },
            { value: 'ven_no_hacen', label: 'Ven pero no hacen nada' },
            { value: 'no_saben', label: 'No saben qué ocurre' }
          ].map(option => (
            <div className="radio-item" key={option.value}>
              <input type="radio" checked={formData.intervencion === option.value} onChange={() => onRadioChange('intervencion', option.value)} />
              <label>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="campo">
        <label>¿Hay estudiantes que te ayuden o defiendan?</label>
        <div className="radio-group">
          {[
            { value: 'si_muchos', label: 'Sí, muchos' },
            { value: 'algunos', label: 'Algunos' },
            { value: 'muy_pocos', label: 'Muy pocos' },
            { value: 'nadie', label: 'Nadie' }
          ].map(option => (
            <div className="radio-item" key={option.value}>
              <input type="radio" checked={formData.apoyo_comp === option.value} onChange={() => onRadioChange('apoyo_comp', option.value)} />
              <label>{option.label}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function Feelings({ formData, onCheckboxChange, onInputChange }) {
  return (
    <>
      <p>Por favor, describe cómo te has sentido con estas experiencias:</p>
      <div className="checkbox-group">
        {[
          { value: 'triste_deprimido', label: 'Triste o deprimido' },
          { value: 'ansioso_asustado', label: 'Ansioso o asustado' },
          { value: 'enojado_furioso', label: 'Enojado o furioso' },
          { value: 'avergonzado_humillado', label: 'Avergonzado o humillado' },
          { value: 'solo_aislado', label: 'Solo o aislado' },
          { value: 'sin_importancia', label: 'Sin importancia o sin valor' },
          { value: 'problemas_dormir', label: 'Problemas para dormir o pesadillas' },
          { value: 'dolores', label: 'Dolores de cabeza o estómago' },
          { value: 'no_quiero_escuela', label: 'No quiero ir a la escuela' }
        ].map(option => (
          <div className="checkbox-item" key={option.value}>
            <input type="checkbox" checked={formData.sentimientos?.includes(option.value)} onChange={() => onCheckboxChange('sentimientos', option.value)} />
            <label>{option.label}</label>
          </div>
        ))}
        <div className="checkbox-item">
          <input type="checkbox" checked={formData.sentimientos?.includes('otros_sentimientos')} onChange={() => onCheckboxChange('sentimientos', 'otros_sentimientos')} />
          <label>Otros sentimientos:</label>
          <input type="text" name="otros_sentimientos" value={formData.otros_sentimientos} onChange={onInputChange} style={{ width: '200px', marginLeft: '5px' }} placeholder="Especificar" />
        </div>
      </div>
    </>
  )
}

function WhoTold({ formData, onRadioChange, onInputChange }) {
  const personas = [
    { name: 'contado_padres', label: 'Padres o apoderados' },
    { name: 'contado_profesores', label: 'Profesores' },
    { name: 'contado_directivos', label: 'Directivos (director, inspector)' },
    { name: 'contado_psicologo', label: 'Psicólogo o consejero escolar' },
    { name: 'contado_amigos', label: 'Compañeros amigos' },
    { name: 'contado_otro', label: 'Otro adulto de confianza' },
    { name: 'contado_nadie', label: 'No se lo he contado a nadie' }
  ]

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Persona</th>
            <th>Sí</th>
            <th>No</th>
          </tr>
        </thead>
        <tbody>
          {personas.map(persona => (
            <tr key={persona.name}>
              <td>{persona.label}</td>
              <td className="option-cell"><input type="radio" checked={formData[persona.name] === 'si'} onChange={() => onRadioChange(persona.name, 'si')} /></td>
              <td className="option-cell"><input type="radio" checked={formData[persona.name] === 'no'} onChange={() => onRadioChange(persona.name, 'no')} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="campo">
        <label>Si ya le contaste a un adulto de la escuela, ¿qué pasó?</label>
        <div className="radio-group">
          {[
            { value: 'medidas_proteccion', label: 'Me escucharon y tomaron medidas para protegerme' },
            { value: 'escucharon_no_hicieron', label: 'Me escucharon pero no hicieron nada' },
            { value: 'no_me_creyeron', label: 'No me creyeron' },
            { value: 'culpa_mia', label: 'Me dijeron que era culpa mía ("hiciste algo para provocar")' },
            { value: 'pidieron_no_contar', label: 'Me pidieron que no contara a mis papás' },
            { value: 'no_se_que_pasara', label: 'Aún no sé qué va a pasar' }
          ].map(option => (
            <div className="radio-item" key={option.value}>
              <input type="radio" checked={formData.resultado_contado === option.value} onChange={() => onRadioChange('resultado_contado', option.value)} />
              <label>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="campo">
        <label>Si no se lo has contado a nadie, ¿por qué?</label>
        <div className="radio-group">
          {[
            { value: 'miedo_represalias', label: 'Tengo miedo de represalias' },
            { value: 'no_me_creyeron', label: 'Creo que no me van a creer' },
            { value: 'verguenza', label: 'Tengo vergüenza' },
            { value: 'no_se_a_quien', label: 'No sé a quién contarle' },
            { value: 'no_me_pueden_ayudar', label: 'Pienso que no me pueden ayudar' }
          ].map(option => (
            <div className="radio-item" key={option.value}>
              <input type="radio" checked={formData.razon_no_contado === option.value} onChange={() => onRadioChange('razon_no_contado', option.value)} />
              <label>{option.label}</label>
            </div>
          ))}
          <div className="radio-item">
            <input type="radio" checked={formData.razon_no_contado === 'otra_razon'} onChange={() => onRadioChange('razon_no_contado', 'otra_razon')} />
            <label>Otra razón:</label>
            <input type="text" name="otra_razon_especifica" value={formData.otra_razon_especifica} onChange={onInputChange} style={{ width: '200px', marginLeft: '5px' }} placeholder="Especificar" />
          </div>
        </div>
      </div>
    </>
  )
}

function Support({ formData, onCheckboxChange, onInputChange }) {
  return (
    <>
      <p>Marca las formas de apoyo que crees que necesitas:</p>
      <div className="checkbox-group">
        {[
          { value: 'psicologo_consejero', label: 'Hablar con un psicólogo o consejero' },
          { value: 'cambiar_sala', label: 'Cambiar de sala de clases' },
          { value: 'amigo_apoyo', label: 'Tener un amigo o compañero que me apoye' },
          { value: 'profesores_vigilen', label: 'Que los profesores vigilen más' },
          { value: 'intervengan_molestan', label: 'Que se intervenga con quienes me molestan' },
          { value: 'padres_sepan', label: 'Que mis padres sepan lo que sucede' },
          { value: 'descanso_escuela', label: 'Tomar un descanso de la escuela' },
          { value: 'apoyo_academico', label: 'Apoyo académico (he atrasado materias)' },
          { value: 'cambiar_grupo', label: 'Cambiar de grupo o actividades' }
        ].map(option => (
          <div className="checkbox-item" key={option.value}>
            <input type="checkbox" checked={formData.apoyo_necesita?.includes(option.value)} onChange={() => onCheckboxChange('apoyo_necesita', option.value)} />
            <label>{option.label}</label>
          </div>
        ))}
        <div className="checkbox-item">
          <input type="checkbox" checked={formData.apoyo_necesita?.includes('otro_apoyo')} onChange={() => onCheckboxChange('apoyo_necesita', 'otro_apoyo')} />
          <label>Otro tipo de ayuda:</label>
          <input type="text" name="otro_apoyo_especifica" value={formData.otro_apoyo_especifica} onChange={onInputChange} style={{ width: '200px', marginLeft: '5px' }} placeholder="Especificar" />
        </div>
      </div>
    </>
  )
}

export default App
