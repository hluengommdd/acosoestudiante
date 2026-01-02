import React, { useEffect, useRef } from 'react';
import './PrintDocumentReusable.css';

/**
 * Componente reutilizable para documentos de impresión
 * 
 * @param {Object} props
 * @param {Object} props.data - Datos del documento { intro, sections: [...] }
 * @param {string} props.logo - Ruta del logo institucional
 * @param {string} props.title - Título del documento
 * @param {string} props.footerText - Texto del pie de página
 * @param {boolean} props.showPrintButton - Mostrar botón de impresión (default: true)
 * @param {boolean} props.autoPrint - Auto-imprimir al montar (default: false)
 * @param {string} props.className - Clases CSS adicionales
 */
const PrintDocumentReusable = ({
  data = {},
  logo = '',
  title = 'Documento',
  footerText = '',
  showPrintButton = true,
  autoPrint = false,
  className = ''
}) => {
  const documentRef = useRef(null);

  useEffect(() => {
    // Auto-imprimir si está habilitado
    if (autoPrint) {
      const timer = setTimeout(() => {
        handlePrint();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoPrint]);

  const handlePrint = async () => {
    try {
      // Esperar a que las fuentes estén cargadas
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      
      // Esperar un frame adicional
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      // Imprimir
      window.print();
    } catch (error) {
      console.error('Error al imprimir:', error);
      window.print();
    }
  };

  const renderSection = (section, index) => {
    return (
      <section key={index} className="print-section">
        {section.heading && (
          <h2 className="print-section__heading">{section.heading}</h2>
        )}
        <div className="print-section__content">
          {/* Renderizar párrafos */}
          {section.paragraphs && section.paragraphs.map((paragraph, pIdx) => (
            <p key={pIdx} className="print-section__paragraph">
              {paragraph}
            </p>
          ))}
          
          {/* Renderizar tabla */}
          {section.table && (
            <table className="print-table">
              <thead>
                <tr>
                  {section.table.headers.map((header, hIdx) => (
                    <th key={hIdx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.table.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {/* Renderizar lista */}
          {section.list && (
            <ul className="print-list">
              {section.list.map((item, lIdx) => (
                <li key={lIdx}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className={`print-document-wrapper ${className}`}>
      {/* Botón de impresión (solo visible en pantalla) */}
      {showPrintButton && (
        <div className="print-controls no-print">
          <button 
            className="print-button"
            onClick={handlePrint}
            aria-label="Imprimir documento"
          >
            🖨️ Imprimir
          </button>
        </div>
      )}

      {/* Documento de impresión */}
      <div className="print-document" ref={documentRef}>
        {/* HEADER */}
        <header className="print-header">
          {logo && (
            <div className="print-header__logo-container">
              <img 
                src={logo} 
                alt="Logo institucional" 
                className="print-header__logo"
              />
            </div>
          )}
          <div className="print-header__title-container">
            <h1 className="print-header__title">{title}</h1>
          </div>
          <div className="print-header__meta">
            <p>Fecha: {new Date().toLocaleDateString('es-ES')}</p>
          </div>
        </header>

        {/* BODY */}
        <main className="print-body">
          {/* Introducción */}
          {data.intro && (
            <div className="print-intro">
              <p>{data.intro}</p>
            </div>
          )}

          {/* Secciones */}
          {data.sections && data.sections.map((section, index) => 
            renderSection(section, index)
          )}
        </main>

        {/* FOOTER */}
        <footer className="print-footer">
          <p className="print-footer__text">{footerText}</p>
        </footer>
      </div>
    </div>
  );
};

export default PrintDocumentReusable;
