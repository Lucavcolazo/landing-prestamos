export function money(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-AR')
}

export function pct(ratio: number): string {
  return (ratio * 100).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' %'
}

/** Deja solo dígitos y los muestra con separador de miles (5000000 → "5.000.000"). */
export function formatMontoInput(raw: string, maxDigits = 9): string {
  const d = raw.replace(/\D/g, '').slice(0, maxDigits)
  return d ? Number(d).toLocaleString('es-AR') : ''
}

export function parseMonto(txt: string): number {
  return Number(txt.replace(/\D/g, '')) || 0
}
