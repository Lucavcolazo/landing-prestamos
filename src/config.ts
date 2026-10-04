// Datos del sitio. Completar los que están entre corchetes.
export const SITE = {
  nombre: 'Diego Ojeda',
  nombreFiscal: 'Ojeda Diego José',
  subtitulo: 'Asesor en préstamos',
  whatsapp: '5493435435231',
  telefono: '0343 543-5231',
  email: 'diego@diegoojeda.com.ar',
  ciudad: 'Paraná',
  provincia: 'Entre Ríos',
  cuit: '20-31458456-3',
  condicionFiscal: 'Responsable Monotributo',
  aniosExperiencia: '18',
  // Foto de Diego en public/ (ej.: '/diego.jpg'). Mientras sea null se muestran sus iniciales.
  foto: '/diego.jpg' as string | null,
}

// Ciudades por las que Diego viaja periódicamente: se nombran en la pregunta "¿Atienden en mi
// ciudad?" y son las mismas que `areaServed` en index.html.
export const ZONAS = [
  'Paraná', 'Santa Fe', 'Concordia', 'Gualeguaychú', 'Concepción del Uruguay', 'Gualeguay', 'Villaguay',
  'Chajarí', 'Victoria', 'La Paz', 'Crespo', 'Colón', 'Federal', 'Federación', 'Nogoyá',
  'Diamante', 'Rosario del Tala', 'San Salvador', 'San José de Feliciano',
]

// Mutual de la que Diego es representante. Sin logo: solo nombre y enlaces oficiales.
export const SMSV = {
  nombre: 'Sociedad Militar Seguro de Vida',
  sigla: 'SMSV',
  web: 'https://www.smsv.com.ar/',
  // Listado oficial donde figura "PARANÁ: Ojeda, Diego"
  representantes: 'https://www.smsv.com.ar/representantes/',
}

// Redes de Diego (si cambia el usuario de Instagram, actualizar acá y en index.html)
export const REDES = {
  instagram: 'https://www.instagram.com/dojeda.smsv/',
  instagramUsuario: '@dojeda.smsv',
  facebook: 'https://www.facebook.com/profile.php?id=61586671000489',
  facebookNombre: 'Diego Ojeda - Representante SMSV',
}

// Formulario 960 / Data Fiscal de ARCA (el QR solo responde por http)
export const DATA_FISCAL = {
  href: 'http://qr.afip.gob.ar/?qr=62roXFvyyioXasq3Ozg1vw,,',
  img: 'https://www.afip.gob.ar/images/f960/DATAWEB.jpg',
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
  { nombre: 'Administración Nacional de Aviación Civil (ANAC)', escudo: '/escudos/anac.jpg' },
  { nombre: 'Empresa Argentina de Navegación Aérea (EANA)', escudo: '/escudos/eana.jpg' },
]
