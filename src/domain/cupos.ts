import type { Embarcacion } from './tipos'

export type EstadoCupos = 'EN_MUELLE' | 'EMBARCANDO' | 'LISTA_PARA_ZARPAR'

export type ResultadoCupos =
  | { ok: true; embarcacion: Embarcacion; estado: EstadoCupos }
  | { ok: false; error: string }

export function actualizarCupos(emb: Embarcacion, delta: number): ResultadoCupos {
  if (delta > 0 && emb.capacidad !== null && emb.ocupados >= emb.capacidad) {
    return { ok: false, error: 'Cupo completo' }
  }
  const nuevos = emb.capacidad !== null
    ? Math.max(0, Math.min(emb.capacidad, emb.ocupados + delta))
    : Math.max(0, emb.ocupados + delta)

  const actualizada: Embarcacion = { ...emb, ocupados: nuevos }

  let estado: EstadoCupos = 'EN_MUELLE'
  if (emb.capacidad !== null) {
    if (nuevos === emb.capacidad) estado = 'LISTA_PARA_ZARPAR'
    else if (nuevos > 0) estado = 'EMBARCANDO'
  }

  return { ok: true, embarcacion: actualizada, estado }
}
