import savJson from '@/data/sav-coeficientes.json'

// Fórmulas replicadas del calculador interno (CalculoPrestamos: lib/finance.ts y
// lib/socio-calculations.ts), simplificadas para un préstamo nuevo sin ayudas vigentes.

const SAV_COEFICIENTES = savJson as Record<string, number>
const DIA_MS = 1000 * 60 * 60 * 24

export function calcPMT(rate: number, nper: number, pv: number): number {
  if (rate === 0) return pv / nper
  return (pv * (rate * Math.pow(1 + rate, nper))) / (Math.pow(1 + rate, nper) - 1)
}

/** Igual que el calculador: año actual − año de nacimiento, +1 a partir de julio. */
export function calcEdadActuarial(anioNac: number, hoy = new Date()): number {
  if (!anioNac) return 0
  const base = hoy.getFullYear() - anioNac
  return hoy.getMonth() >= 6 ? base + 1 : base
}

export function calcCoefSAV(edadActuarial: number, rating = 1): number {
  const key = `${Math.min(71, Math.max(18, edadActuarial))}${rating}`
  return SAV_COEFICIENTES[key] || 0
}

/** Suma N días hábiles (lunes a viernes). No contempla feriados. */
export function sumarDiasHabiles(desde: Date, n: number): Date {
  const d = new Date(desde.getFullYear(), desde.getMonth(), desde.getDate())
  let sumados = 0
  while (sumados < n) {
    d.setDate(d.getDate() + 1)
    const dow = d.getDay()
    if (dow !== 0 && dow !== 6) sumados++
  }
  return d
}

/** Pago ≤ día de corte → 1° del mes siguiente; si no, 1° del subsiguiente. */
export function calcPrimerCargo(fechaPago: Date, diaCorte: number): Date {
  const offset = fechaPago.getDate() <= diaCorte ? 1 : 2
  return new Date(fechaPago.getFullYear(), fechaPago.getMonth() + offset, 1)
}

export interface SimulacionInput {
  monto: number
  plazo: number
  anioNac: number
  tnaPct: number
  diaCorte: number
  diasHabilesPago: number
  hoy?: Date
}

export interface Simulacion {
  fechaPago: Date
  primerCargo: Date
  diasInteres: number
  edadActuarial: number
  conSeguro: boolean
  cuotaPrestamo: number
  seguroMensual: number
  cuotaTotal: number
  interesAdelantado: number
  primasSeguro: number
  enMano: number
  tea: number
}

export function simular(input: SimulacionInput): Simulacion {
  const hoy = input.hoy ?? new Date()
  const tna = input.tnaPct / 100
  const tasaMensual = tna / 12
  const { monto, plazo } = input

  const fechaPago = sumarDiasHabiles(hoy, input.diasHabilesPago)
  const primerCargo = calcPrimerCargo(fechaPago, input.diaCorte)
  const diasInteres = Math.max(0, Math.round((primerCargo.getTime() - fechaPago.getTime()) / DIA_MS))

  // Seguro de vida (SAV): sin ayudas vigentes, el monto a asegurar es el préstamo redondeado a la centena
  const edadActuarial = calcEdadActuarial(input.anioNac, hoy)
  const conSeguro = edadActuarial >= 18 && edadActuarial <= 70
  const montoSAV = Math.ceil(monto / 100) * 100
  const seguroMensual = conSeguro ? montoSAV * calcCoefSAV(edadActuarial) : 0

  // Primas iniciales: 2 meses + proporcional de los días que faltan del mes de pago
  const diasMes = new Date(fechaPago.getFullYear(), fechaPago.getMonth() + 1, 0).getDate()
  const fraccion = Math.max(0, diasMes - fechaPago.getDate()) / diasMes
  const primasSeguro = seguroMensual > 0 ? Math.round((2 * seguroMensual + fraccion * seguroMensual) * 100) / 100 : 0

  const interesAdelantado = diasInteres > 0 ? Math.round(((monto * diasInteres * tna) / 365) * 100) / 100 : 0

  const cuotaPrestamo = calcPMT(tasaMensual, plazo, monto)

  return {
    fechaPago,
    primerCargo,
    diasInteres,
    edadActuarial,
    conSeguro,
    cuotaPrestamo,
    seguroMensual,
    cuotaTotal: cuotaPrestamo + seguroMensual,
    interesAdelantado,
    primasSeguro,
    enMano: monto - primasSeguro - interesAdelantado,
    tea: Math.pow(1 + tasaMensual, 12) - 1,
  }
}
