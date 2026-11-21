import type { Embarcacion, Usuario } from '../domain/tipos'

// =============================================
// Datos de ejemplo – Río Magangué
// Origen siempre: Magangué
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

export const USUARIOS: Usuario[] = [
  {
    username: 'pasajero',
    passwordHash: 'pasajero123',
    rol: 'pasajero',
  },
  {
    username: 'operador220',
    passwordHash: 'operador123',
    rol: 'operador',
    codigoEmbarcacion: '#220',
  },
  {
    username: 'taquilla',
    passwordHash: 'taquilla123',
    rol: 'taquilla',
  },
  {
    username: 'admin',
    passwordHash: 'admin123',
    rol: 'admin',
  },
]
