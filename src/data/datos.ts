import type { Embarcacion, Usuario } from '../domain/tipos'

// =============================================
// Datos de ejemplo – Río Magangué
// Origen siempre: Magangué
// Claves en SHA-256
// =============================================

export const EMBARCACIONES_INICIALES: Embarcacion[] = [
  {
    codigo: '#012',
    nombre: 'Expreso del Río',
    tipo: 'FLOTA',
    destino: 'Mompox',
    capacidad: 80,
    ocupados: 0,
    operador: 'empresa',
    precio: 25000,
  },
  {
    codigo: '#098',
    nombre: 'La Mojanera',
    tipo: 'FLOTA',
    destino: 'Majagual',
    capacidad: 100,
    ocupados: 0,
    operador: 'empresa',
    precio: 30000,
  },
  {
    codigo: '#220',
    nombre: 'Rápido 220',
    tipo: 'CHALUPA',
    destino: 'Mompox',
    capacidad: 20,
    ocupados: 12,
    operador: 'empresa',
    precio: 35000,
  },
  {
    codigo: '#231',
    nombre: 'La Achiera',
    tipo: 'CHALUPA',
    destino: 'Achí',
    capacidad: 20,
    ocupados: 14,
    operador: 'independiente',
    precio: 30000,
  },
  {
    codigo: '#305',
    nombre: 'Veloz del Sur',
    tipo: 'CHALUPA',
    destino: 'Pinillos',
    capacidad: 25,
    ocupados: 0,
    operador: 'empresa',
    precio: 32000,
  },
  {
    codigo: '#605',
    nombre: 'Don Chepe',
    tipo: 'CARGUERA',
    destino: 'Mompox',
    capacidad: null,
    ocupados: 0,
    operador: 'empresa',
    precio: null,
  },
  {
    codigo: '#720',
    nombre: 'La Bodeguera',
    tipo: 'CARGUERA',
    destino: 'Majagual',
    capacidad: null,
    ocupados: 0,
    operador: 'independiente',
    precio: null,
  },
]

// Claves en SHA-256:
//   pasajero123  → c463ff27...
//   operador123  → 1725165c...
//   taquilla123  → d1807f0a...
//   admin123     → 240be518...
export const USUARIOS: Usuario[] = [
  {
    username: 'pasajero',
    passwordHash: 'c463ff27738fa30cd49b8546661c9c652f8c14272a35eb8869698198be53ed96',
    rol: 'pasajero',
  },
  {
    username: 'operador220',
    passwordHash: '1725165c9a0b3698a3d01016e0d8205155820b8d7f21835ca64c0f81c728d880',
    rol: 'operador',
    codigoEmbarcacion: '#220',
  },
  {
    username: 'taquilla',
    passwordHash: 'd1807f0a75ae7594654ab5493e2c9982838611b930b142bd1317859035c64f10',
    rol: 'taquilla',
  },
  {
    username: 'admin',
    passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
    rol: 'admin',
  },
]
