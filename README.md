# Landing Préstamos

Landing de préstamos para personal de las Fuerzas Armadas y de Seguridad, con simulador en `/calculo`.

Vite + React + TypeScript + React Router. Se despliega en Vercel sin configuración extra (`vercel.json` ya redirige las rutas a la SPA).

## Desarrollo

```bash
npm install
npm run dev
```

## Qué completar

- **`src/config.ts`**: nombre de Diego y años de experiencia (el WhatsApp ya está cargado). También los parámetros del simulador (TNA, día de corte, días hábiles hasta el pago, monto mínimo y máximo).
- **Video del hero**: `public/video/bandera.mp4` (opcional también `bandera.webm`). Mientras no esté, se muestra una bandera animada en CSS.
- **Foto de Diego**: agregar `public/diego.jpg` y reemplazar el placeholder en `src/pages/HomePage.tsx` (sección `sobre-mi`).
- **CFT**: en `src/pages/CalculoPage.tsx` figura como `[A CONFIRMAR]`.

### Recomendación para el video

Sin audio, 1920 px de ancho como máximo y lo más liviano posible (idealmente menos de 5 MB):

```bash
ffmpeg -i original.mp4 -an -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset slow -movflags +faststart public/video/bandera.mp4
```

## Simulador

`src/lib/finance.ts` replica las fórmulas del calculador interno para un préstamo nuevo sin ayudas vigentes:

- Cuota: sistema francés con la TNA configurada.
- Fecha de pago: hoy + N días hábiles (no contempla feriados).
- Primera cuota: 1° del mes siguiente si el pago es hasta el día de corte; si no, del subsiguiente.
- Interés adelantado: monto × días hasta la primera cuota × TNA / 365.
- Seguro de vida: coeficiente por edad actuarial (rating 1) × monto; primas iniciales = 2 meses + proporcional del mes de pago.
- En mano = monto − primas iniciales − interés adelantado.
