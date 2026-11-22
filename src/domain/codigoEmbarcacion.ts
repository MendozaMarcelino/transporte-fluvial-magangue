import type { TipoEmbarcacion } from './tipos'

const FORMATO = /^#[0-9]{3}$/

const RANGOS: { tipo: TipoEmbarcacion; min: number; max: number }[] = [
  { tipo: 'FLOTA',    min:   1, max: 199 },
  { tipo: 'CHALUPA',  min: 200, max: 599 },
  { tipo: 'CARGUERA', min: 600, max: 899 },
]
// #900–#999 → RESERVADO (no tiene tipo de embarcación asignable)

export function validarCodigoEmbarcacion(codigo: string): boolean {
  return FORMATO.test(codigo) && codigo !== '#000'
}

/** Devuelve el tipo de embarcación según el rango del código.
 *  Retorna null si el código no es válido o cae en rango RESERVADO. */
export function tipoPorCodigo(codigo: string): TipoEmbarcacion | null {
  if (!validarCodigoEmbarcacion(codigo)) return null
  const num = parseInt(codigo.slice(1), 10)
  return RANGOS.find(({ min, max }) => num >= min && num <= max)?.tipo ?? null
}
