import { SITE } from '@/config'

export function waLink(texto: string): string {
  const num = SITE.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${num}?text=${encodeURIComponent(texto)}`
}

export const WA_INFO = waLink('Hola Diego, quiero información sobre los préstamos.')
