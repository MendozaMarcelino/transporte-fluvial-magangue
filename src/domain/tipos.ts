// =============================================
// Tipos de dominio – Río Magangué
// =============================================

export type Rol = 'pasajero' | 'operador' | 'taquilla' | 'admin'

export type TipoEmbarcacion = 'FLOTA' | 'CHALUPA' | 'CARGUERA'

export type TipoOperador = 'empresa' | 'independiente'

export interface Embarcacion {
  /** Código único: "#" + 3 dígitos. Ej: "#098" */
  codigo: string
  nombre: string
  tipo: TipoEmbarcacion
  destino: string
  capacidad: number | null  // null para CARGUERA (no vende tiquetes)
  ocupados: number          // 0 para CARGUERA
  operador: TipoOperador
  /** Precio en COP. null para CARGUERA */
  precio: number | null
}

export interface Usuario {
  username: string
  passwordHash: string   // en este práctico guardamos la clave en texto plano
  rol: Rol
  /** Solo para rol 'operador': código de embarcación asignada */
  codigoEmbarcacion?: string
}

export interface Tiquete {
  id: string
  codigoEmbarcacion: string
  nombrePasajero: string
  destino: string
  precio: number
  fechaHora: string   // ISO 8601
}
