// Datos del sitio. Completar los que están entre corchetes.
export const SITE = {
  nombre: 'Diego Ojeda',
  subtitulo: 'Asesor en préstamos',
  whatsapp: '5493435435231',
  aniosExperiencia: '18',
  // Foto de Diego en public/ (ej.: '/diego.jpg'). Mientras sea null se muestran sus iniciales.
  foto: '/diego.jpg' as string | null,
}

// Parámetros del simulador: mismos valores que la configuración del calculador interno
export const CALC = {
  tnaPct: 45,
  // CFT informado por la entidad; varía levemente según cada caso, por eso se muestra como aproximado
  cftPct: 58.79,
  montoMin: 50_000,
  montoMax: 30_000_000,
  diaCorte: 18,
  diasHabilesPago: 3,
  plazos: [24, 36, 48, 60, 72],
}

export const FUERZAS = [
  { nombre: 'Ejército', escudo: '/escudos/ejercito.jpg' },
  { nombre: 'Armada', escudo: '/escudos/armada.jpg' },
  { nombre: 'Fuerza Aérea', escudo: '/escudos/fuerza-aerea.jpg' },
  { nombre: 'Gendarmería Nacional', escudo: '/escudos/gendarmeria.jpg' },
  { nombre: 'Prefectura Naval', escudo: '/escudos/prefectura.jpg' },
  { nombre: 'Policía Federal', escudo: '/escudos/policia-federal.jpg' },
  { nombre: 'Policía de Seguridad Aeroportuaria', escudo: '/escudos/psa.jpg' },
  { nombre: 'Servicio Penitenciario Federal', escudo: '/escudos/servicio-penitenciario.jpg' },
]
