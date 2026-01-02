# Deploy en Vercel — instrucciones rápidas

Este repo está listo para un deploy automático en Vercel mediante GitHub Actions. Sigue estos pasos para habilitarlo:

1. Crear un token de Vercel
   - Entra a https://vercel.com/dashboard > Settings > Tokens > Create Token
   - Copia el token (lo usarás como `VERCEL_TOKEN`).

2. Obtener `VERCEL_ORG_ID` y `VERCEL_PROJECT_ID`
   - En tu dashboard de Vercel, selecciona la organización y el proyecto; en la URL verás valores como `org_<id>` y `proj_<id>`.
   - Alternativamente, usa la API de Vercel o el CLI (`vercel projects ls`).

3. Añadir secrets al repositorio en GitHub
   - Ve a Settings > Secrets and variables > Actions
   - Añade `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` con los valores obtenidos.

4. Push a `main`
   - El workflow `.github/workflows/vercel-deploy.yml` se activará al hacer push a `main` y hará `npm ci`, `npm run build` y desplegará a Vercel.

5. Comprobar deployment
   - En Vercel Dashboard > Deployments verás el despliegue. La URL pública será `https://<tu-proyecto>.vercel.app/print.html`.

Notas:
- El build usa `npm run build` y espera que el `dist` sea la carpeta de salida (Vite por defecto).
- Si prefieres desplegar manualmente desde tu máquina, instala `vercel` y ejecuta:
  ```bash
  npm i -g vercel
  vercel login
  vercel --prod
  ```
