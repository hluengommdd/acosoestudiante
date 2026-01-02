# AcosoEstudiante — Instrucciones rápidas

Pequeñas instrucciones para abrir este repositorio en GitHub Codespaces, ejecutar la app y verificar la impresión/PDF.

## Abrir en Codespaces

1. En GitHub visita: `https://github.com/hluengommdd/acosoestudiante`.
2. Haz clic en **Code → Open with Codespaces → New codespace**.
3. Codespaces va a usar `.devcontainer/devcontainer.json` y ejecutará `npm install` automáticamente.
4. Cuando termine, abre el puerto `5173` (VS Code te lo sugerirá).

## Ejecutar localmente (dentro del Codespace o tu máquina)

En la terminal del Codespace ejecuta:

```bash
npm run dev
```

Luego abre la URL que muestra Vite (habitualmente `http://localhost:5173`).

## Verificar logo y la impresión

- Asegúrate de que `public/logo-oficial.png` exista en el repo (ya está incluido).
- En el navegador abre DevTools → pestaña Network y recarga la página. Filtra por `logo-oficial.png` y confirma que responde `200`.
- Abre el formulario (no es necesario completarlo) y haz clic en "Imprimir / Guardar PDF". Se generará una vista previa y un PDF.

Si aparece un `404` en la consola:

- Copia la URL exacta que falla (desde la pestaña Network) y pégala aquí.
- Indica si estás sirviendo la app en un subpath (por ejemplo `https://usuario.vercel.app/proyecto/`). Si es así, lo ajustaré.

## Paquete de impresión (descarga)

- Archivo listo en el deploy: [public/print-assets.zip](public/print-assets.zip) → accesible como `/print-assets.zip` (ej. `http://localhost:5173/print-assets.zip` o en Vercel `https://<tu-app>/print-assets.zip`).
- Descarga directa desde GitHub (raw): https://raw.githubusercontent.com/hluengommdd/acosoestudiante/main/public/print-assets.zip
- El paquete incluye `print.html`, estilos/JS de impresión, logo y el README del paquete.

## Despliegue en Vercel

1. Conecta tu repo a Vercel (import project). La configuración por defecto con Vite funciona.
2. Si publicas en un subpath, tendrás que ajustar rutas o usar el enfoque de assets públicos (`public/`).

---
Si quieres, puedo añadir un checkbox en la UI para "Usar datos de ejemplo" o ajustar rutas para un subpath específico.
