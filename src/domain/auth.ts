import { sha256 } from 'js-sha256'
import type { Usuario, Rol } from './tipos'

export type PantallaInicio = 'rutas' | 'operador' | 'venta' | 'panel'

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

export function pantallaInicio(rol: Rol): PantallaInicio {
  const mapa: Record<Rol, PantallaInicio> = {
    pasajero: 'rutas',
    operador: 'operador',
    taquilla: 'venta',
    admin:    'panel',
  }
  return mapa[rol]
}
