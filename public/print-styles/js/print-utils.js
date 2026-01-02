/**
 * PRINT UTILITIES
 * Utilidades para mejorar la impresión de documentos
 */

(function() {
  'use strict';

  // Esperar a que las fuentes web estén cargadas antes de imprimir
  function waitForFonts() {
    if (document.fonts && document.fonts.ready) {
      return document.fonts.ready;
    }
    // Fallback para navegadores sin soporte de FontFaceSet
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }

  // Función principal de impresión
  window.printDocument = async function() {
    try {
      // Esperar a que las fuentes estén listas
      await waitForFonts();
      
      // Esperar un frame más para asegurar el renderizado
      await new Promise(resolve => requestAnimationFrame(resolve));
      
      // Imprimir
      window.print();
    } catch (error) {
      console.error('Error al imprimir:', error);
      // Intentar imprimir de todas formas
      window.print();
    }
  };

  // Auto-impresión si hay parámetro en URL
  function checkAutoPrint() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autoprint') === 'true') {
      window.addEventListener('load', () => {
        setTimeout(() => {
          window.printDocument();
        }, 1000);
      });
    }
  }

  // Optimizar imágenes para impresión
  function optimizeImagesForPrint() {
    const images = document.querySelectorAll('.print-document img');
    images.forEach(img => {
      // Asegurar que las imágenes mantengan su aspecto
      if (!img.style.width && !img.style.height) {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      }
    });
  }

  // Prevenir impresiones accidentales durante la carga
  let isPageReady = false;
  window.addEventListener('load', () => {
    isPageReady = true;
    optimizeImagesForPrint();
  });

  const originalPrint = window.print;
  window.print = function() {
    if (!isPageReady) {
      console.warn('La página aún está cargando. Espere un momento.');
      return;
    }
    window.printDocument();
  };

  // Añadir listener para botones de impresión
  document.addEventListener('DOMContentLoaded', () => {
    const printButtons = document.querySelectorAll('[data-print], .print-button');
    printButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        window.printDocument();
      });
    });
    
    // Verificar auto-impresión
    checkAutoPrint();
  });

  // Detectar eventos de impresión
  window.addEventListener('beforeprint', () => {
    console.log('Iniciando impresión...');
    document.body.classList.add('is-printing');
  });

  window.addEventListener('afterprint', () => {
    console.log('Impresión finalizada');
    document.body.classList.remove('is-printing');
  });

  // Manejar Ctrl+P / Cmd+P
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      window.printDocument();
    }
  });

})();
