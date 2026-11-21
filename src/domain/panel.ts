import type { Embarcacion, TipoEmbarcacion } from './tipos'
import { validarCodigoEmbarcacion, tipoPorCodigo } from './codigoEmbarcacion'

// =============================================
// Lógica de negocio – registro de embarcaciones
// =============================================

export type ErrorRegistro =
  | 'formato'
  | 'duplicado'
  | 'rango'

export type ResultadoRegistro =
  | { ok: true;  embarcacion: Embarcacion }
  | { ok: false; error: ErrorRegistro; mensaje: string }

export function registrarEmbarcacion(
  datos: Omit<Embarcacion, 'ocupados'>,
  existentes: Embarcacion[],
): ResultadoRegistro {
  // 1. Formato del código
  if (!validarCodigoEmbarcacion(datos.codigo)) {
    return {
      ok: false,
      error: 'formato',
      mensaje: 'Código inválido: use # seguido de 3 dígitos',
    }
  }

  // 2. Código duplicado
  if (existentes.some((e) => e.codigo === datos.codigo)) {
    return {
      ok: false,
      error: 'duplicado',
      mensaje: 'El código ya existe',
    }
  }

  // 3. Rango vs tipo
  const tipoEsperado = tipoPorCodigo(datos.codigo)
  if (tipoEsperado !== datos.tipo) {
    return {
      ok: false,
      error: 'rango',
      mensaje: 'El código no corresponde al tipo',
    }
  }

  const nueva: Embarcacion = { ...datos, ocupados: 0 }
  return { ok: true, embarcacion: nueva }
}

export const MENSAJES_ERROR: Record<ErrorRegistro, string> = {
  formato:   'Código inválido: use # seguido de 3 dígitos',
  duplicado: 'El código ya existe',
  rango:     'El código no corresponde al tipo',
}

/** Lista de tipos disponibles para el formulario (CARGUERA no vende tiquetes) */
export const TIPOS: TipoEmbarcacion[] = ['FLOTA', 'CHALUPA', 'CARGUERA']
