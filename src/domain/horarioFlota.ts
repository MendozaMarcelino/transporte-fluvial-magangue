export type EstadoFlota = 'EN_CAMINO' | 'EN_MUELLE' | 'ZARPO'

export function estadoFlota(fecha: Date): EstadoFlota {
  const minutos = fecha.getHours() * 60 + fecha.getMinutes()
  if (minutos < 420) return 'EN_CAMINO'
  if (minutos <= 780) return 'EN_MUELLE'
  return 'ZARPO'
}
