import type { Embarcacion, TipoEmbarcacion } from './tipos'

export type FiltroTipo = TipoEmbarcacion | 'TODOS'

export function filtrarRutas(
  embarcaciones: Embarcacion[],
  destino: string,
  tipo: FiltroTipo,
): Embarcacion[] {
  return embarcaciones.filter((e) => {
    const matchDestino = destino === 'TODOS' || e.destino === destino
    const matchTipo = tipo === 'TODOS' || e.tipo === tipo
    return matchDestino && matchTipo
  })
}

export function textoHorario(tipo: TipoEmbarcacion): string {
  switch (tipo) {
    case 'FLOTA':
      return 'Llega 7:00–8:00 a. m. · Sale 12:30–1:00 p. m.'
    case 'CHALUPA':
      return 'Sale al completar cupo · 5:00 a. m.–4:00 p. m.'
    case 'CARGUERA':
      return 'Sale 3:00–4:00 p. m. según el cargue · No vende tiquetes'
  }
}
