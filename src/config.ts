// Datos del sitio. Completar los que están entre corchetes.
export const SITE = {
  nombre: 'Diego [Apellido]',
  subtitulo: 'Asesor en préstamos',
  // WhatsApp en formato internacional, sin + ni espacios (+54 9 3435 43-5231)
  whatsapp: '5493435435231',
  aniosExperiencia: '[X]',
}

// Parámetros del simulador: mismos valores que la configuración del calculador interno
export const CALC = {
  tnaPct: 45,
  montoMin: 100_000,
  montoMax: 30_000_000,
  diaCorte: 18,
  diasHabilesPago: 3,
  plazos: [12, 24, 36, 48, 60, 72],
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
