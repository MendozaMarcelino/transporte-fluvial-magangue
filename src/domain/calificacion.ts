export const MIN_ESTRELLAS = 1
export const MAX_ESTRELLAS = 5
export const ERROR_CALIFICACION = 'La calificación debe estar entre 1 y 5'

export function validarCalificacion(n: number): boolean {
  return Number.isInteger(n) && n >= MIN_ESTRELLAS && n <= MAX_ESTRELLAS
}

const redondearUnDecimal = (n: number): number => Math.round(n * 10) / 10

export function promedioCalificaciones(lista: number[]): number {
  if (lista.length === 0) return 0
  const suma = lista.reduce((total, n) => total + n, 0)
  return redondearUnDecimal(suma / lista.length)
}

// Guarda las calificaciones en localStorage, agrupadas por código de embarcación
const CLAVE = 'calificaciones'

function leerTodas(): Record<string, number[]> {
  try {
    return JSON.parse(localStorage.getItem(CLAVE) ?? '{}')
  } catch {
    return {}
  }
}

export function obtenerCalificaciones(codigo: string): number[] {
  return leerTodas()[codigo] ?? []
}

export function guardarCalificacion(codigo: string, estrellas: number): number[] {
  if (!validarCalificacion(estrellas)) throw new Error(ERROR_CALIFICACION)
  const todas = leerTodas()
  const lista = [...(todas[codigo] ?? []), estrellas]
  todas[codigo] = lista
  localStorage.setItem(CLAVE, JSON.stringify(todas))
  return lista
}
