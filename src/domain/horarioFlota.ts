export type EstadoFlota = 'EN_CAMINO' | 'EN_MUELLE' | 'ZARPO'

// Horario fijo de las flotas: llegan a las 7:00 a. m. y salen a más tardar a la 1:00 p. m.
const LLEGADA = 7 * 60
const SALIDA = 13 * 60

const TEXTOS: Record<EstadoFlota, string> = {
  EN_CAMINO: 'En camino',
  EN_MUELLE: 'En muelle',
  ZARPO: 'Zarpó',
}

const minutosDelDia = (fecha: Date): number => fecha.getHours() * 60 + fecha.getMinutes()

export function estadoFlota(fecha: Date): EstadoFlota {
  const minutos = minutosDelDia(fecha)
  if (minutos < LLEGADA) return 'EN_CAMINO'
  if (minutos <= SALIDA) return 'EN_MUELLE'
  return 'ZARPO'
}

export function textoEstadoFlota(fecha: Date): string {
  return TEXTOS[estadoFlota(fecha)]
}
