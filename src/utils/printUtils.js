// Utilities for printing questionnaire results

// Determinar gravedad del caso basado en las respuestas
function determinarGravedad(respuestas) {
  let gravedadScore = 0;
  // Contar respuestas de alta frecuencia (valor 3 o 4)
  for (let i = 1; i <= 33; i++) {
    const valor = parseInt(respuestas[`pregunta_${i}`]) || 0;
    if (valor >= 3) gravedadScore++;
  }
  
  if (gravedadScore >= 10) return 'Muy Grave';
  if (gravedadScore >= 5) return 'Grave';
  if (gravedadScore >= 2) return 'Moderada';
  return 'Leve';
}

// Generar descripción del hecho basada en respuestas
function generarDescripcionHecho(respuestas) {
  const incidentes = [];
  
  // Analizar tipos de acoso reportados
  if (parseInt(respuestas.pregunta_2) > 0 || parseInt(respuestas.pregunta_3) > 0) {
    incidentes.push('insultos y burlas');
  }
  if (parseInt(respuestas.pregunta_8) > 0 || parseInt(respuestas.pregunta_9) > 0) {
    incidentes.push('exclusión social');
  }
  if (parseInt(respuestas.pregunta_15) > 0 || parseInt(respuestas.pregunta_16) > 0) {
    incidentes.push('agresión física');
  }
  if (parseInt(respuestas.pregunta_25) > 0 || parseInt(respuestas.pregunta_26) > 0) {
    incidentes.push('ciberacoso');
  }
  
  let desc = 'Se registra que el/la estudiante reporta situaciones de acoso escolar que requieren atención y seguimiento institucional.';
  
  if (incidentes.length > 0) {
    desc += ` Se identifican principalmente: ${incidentes.join(', ')}, lo cual constituye falta al Reglamento Interno de Convivencia Escolar (RICE).`;
  }
  
  if (respuestas.espacio_historia && respuestas.espacio_historia.trim()) {
    desc += ` Observaciones del estudiante: ${respuestas.espacio_historia}`;
  }
  
  return desc;
}

// Generar eventos de seguimiento en formato timeline
function generarEventosTimeline(respuestas, fechaBase) {
  const eventos = [];
  const fecha = new Date();
  
  // Evento 1: Denuncia/Reporte
  const fecha1 = fecha.toLocaleDateString('es-CL', {year: 'numeric', month: '2-digit', day: '2-digit'});
  eventos.push(`
    <div class="event">
      <div class="event-date">${fecha1}<br>${fecha.toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'})}</div>
      <div class="event-content">
        <div class="event-title">Denuncia/Reporte</div>
        <div class="event-desc">Recepción del cuestionario OBVQ-R</div>
      </div>
    </div>
  `);
  
  // Evento 2: Contacto apoderado
  fecha.setHours(fecha.getHours() + 1);
  const fecha2 = fecha.toLocaleDateString('es-CL', {year: 'numeric', month: '2-digit', day: '2-digit'});
  eventos.push(`
    <div class="event">
      <div class="event-date">${fecha2}<br>${fecha.toLocaleTimeString('es-CL', {hour: '2-digit', minute: '2-digit'})}</div>
      <div class="event-content">
        <div class="event-title">Contacto Apoderado</div>
        <div class="event-desc">Notificación a apoderado/a</div>
      </div>
    </div>
  `);
  
  // Evento 3: Investigación (si hay reportes significativos)
  const tieneReportes = parseInt(respuestas.pregunta_1) > 1;
  if (tieneReportes) {
    fecha.setDate(fecha.getDate() + 1);
    const fecha3 = fecha.toLocaleDateString('es-CL', {year: 'numeric', month: '2-digit', day: '2-digit'});
    eventos.push(`
      <div class="event">
        <div class="event-date">${fecha3}<br>Investigación</div>
        <div class="event-content">
          <div class="event-title">Investigación</div>
          <div class="event-desc">Recopilación de antecedentes y entrevistas</div>
        </div>
      </div>
    `);
  }
  
  // Evento 4: Citación Apoderados
  if (respuestas.contado_padres === 'si' || respuestas.contado_profesores === 'si') {
    fecha.setHours(fecha.getHours() + 2);
    const fecha4 = fecha.toLocaleDateString('es-CL', {year: 'numeric', month: '2-digit', day: '2-digit'});
    eventos.push(`
      <div class="event">
        <div class="event-date">${fecha4}<br>Citación</div>
        <div class="event-content">
          <div class="event-title">Citación Apoderados</div>
          <div class="event-desc">Reunión para definir plan de acción</div>
        </div>
      </div>
    `);
  }
  
  // Evento 5: Resolución
  fecha.setDate(fecha.getDate() + 2);
  const fecha5 = fecha.toLocaleDateString('es-CL', {year: 'numeric', month: '2-digit', day: '2-digit'});
  eventos.push(`
    <div class="event">
      <div class="event-date">${fecha5}<br>Resolución</div>
      <div class="event-content">
        <div class="event-title">Resolución</div>
        <div class="event-desc">Cierre formal del caso con medidas aplicadas</div>
      </div>
    </div>
  `);
  
  return eventos.join('\n');
}

export function abrirVistaImpresion(respuestas) {
  // Guardar datos en sessionStorage para que pueda acceder la página de impresión
  sessionStorage.setItem('printData', JSON.stringify(respuestas))
  
  // Abrir página de impresión
  const printWindow = window.open('/print.html', 'printWindow', 'width=900,height=1200')
  printWindow.focus()
}
