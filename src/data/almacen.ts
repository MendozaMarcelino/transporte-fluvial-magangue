import type { Embarcacion, Tiquete } from '../domain/tipos'
import { EMBARCACIONES_INICIALES } from './datos'

// =============================================
// Almacén – leer/guardar en localStorage
// =============================================

const CLAVE_EMBARCACIONES = 'rm_embarcaciones'
const CLAVE_TIQUETES = 'rm_tiquetes'

export function obtenerEmbarcaciones(): Embarcacion[] {
  const raw = localStorage.getItem(CLAVE_EMBARCACIONES)
  if (!raw) {
    // Primera vez: carga datos de ejemplo
    guardarEmbarcaciones(EMBARCACIONES_INICIALES)
    return EMBARCACIONES_INICIALES
  }
  return JSON.parse(raw) as Embarcacion[]
}

export function guardarEmbarcaciones(embarcaciones: Embarcacion[]): void {
  localStorage.setItem(CLAVE_EMBARCACIONES, JSON.stringify(embarcaciones))
}

export function obtenerTiquetes(): Tiquete[] {
  const raw = localStorage.getItem(CLAVE_TIQUETES)
  if (!raw) return []
  return JSON.parse(raw) as Tiquete[]
}

export function guardarTiquete(tiquete: Tiquete): void {
  const tiquetes = obtenerTiquetes()
  tiquetes.push(tiquete)
  localStorage.setItem(CLAVE_TIQUETES, JSON.stringify(tiquetes))
}
