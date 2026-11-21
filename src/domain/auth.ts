import { sha256 } from 'js-sha256'
import type { Usuario, Rol } from './tipos'

// =============================================
// Autenticación – Río Magangué
// =============================================

export type PantallaInicio = 'rutas' | 'operador' | 'venta' | 'panel'

/**
 * Compara la clave ingresada (en SHA-256) con el hash almacenado.
 * Devuelve el Usuario si coincide, null si no.
 */
export function autenticar(
  username: string,
  clave: string,
  usuarios: Usuario[],
): Usuario | null {
  const hash = sha256(clave)
  return (
    usuarios.find(
      (u) => u.username === username && u.passwordHash === hash,
    ) ?? null
  )
}

/**
 * Pantalla de inicio según el rol del usuario autenticado.
 */
export function pantallaInicio(rol: Rol): PantallaInicio {
  const mapa: Record<Rol, PantallaInicio> = {
    pasajero: 'rutas',
    operador: 'operador',
    taquilla: 'venta',
    admin: 'panel',
  }
  return mapa[rol]
}
