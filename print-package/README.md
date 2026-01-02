# Paquete de impresión (`print-assets.zip`)

Archivo descargable único en `public/print-assets.zip` (sirve en Vercel/localhost y se puede bajar desde GitHub raw). Incluye todos los assets de impresión/PDF.

## Contenido del ZIP
- `print.html` (vista de impresión)
- `print-styles/css/print.css` y `print-styles/css/print-variables.css`
- `print-styles/js/html2pdf.bundle.min.js` y `print-styles/js/print-utils.js`
- `logo-oficial.png`
- `README.md` (estas instrucciones dentro del ZIP)

## Uso rápido (paso a paso)
1. Descarga `public/print-assets.zip` desde el repositorio (GitHub → Download o Raw) o vía URL del deploy (`https://<tu-app>/print-assets.zip`).
2. Descomprime el ZIP en una carpeta, por ejemplo `print-bundle/`.
3. Sirve esa carpeta con un servidor estático para evitar bloqueos del navegador:
   - Con Python: `python3 -m http.server 4173`
   - O con Node: `npx http-server -p 4173`
4. Abre `http://localhost:4173/print.html` en el navegador. Si no hay datos en `sessionStorage`, verás datos de ejemplo para previsualizar.
5. Para inyectar datos reales sin la app, en la consola del navegador ejecuta:
   ```js
   sessionStorage.setItem('printData', JSON.stringify({
     curso: '6° A',
     edad: '11',
     sexo: ['Femenino'],
     tiempo_colegio: '1_2_anios',
     pregunta_1: '1',
     espacio_historia: 'Texto de ejemplo'
   }));
   ```
   Luego recarga `print.html`. La página también acepta el objeto completo que genera la app actual (todas las `pregunta_N`).
6. Usa los botones "Guardar PDF" o "Imprimir" (o Ctrl/Cmd + P). Si falla html2pdf, la página recurre a `window.print()`.

## Personalización
- Reemplaza `logo-oficial.png` por tu logo (mismo nombre y extensión). 
- Ajusta márgenes, colores y tipografías en `print-styles/css/print-variables.css`.
- Modifica textos fijos (título, subtítulo) en `print.html` si la institución cambia.

## Cómo regenerar el ZIP cuando cambien los assets
Ejemplo rápido desde la raíz del repo (reemplaza el ZIP servido en `public/`):
```bash
TMP=$(mktemp -d)
cp public/print.html public/logo-oficial.png "$TMP"/
cp -r public/print-styles "$TMP"/
cp print-package/README.md "$TMP"/
(cd "$TMP" && zip -r "$OLDPWD/public/print-assets.zip" .)
rm -rf "$TMP"
```
Esto vuelve a empaquetar los archivos actuales en `public/print-assets.zip`.
