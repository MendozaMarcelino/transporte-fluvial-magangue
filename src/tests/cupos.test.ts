import { describe, it, expect } from 'vitest'
import { actualizarCupos } from '../domain/cupos'

describe('actualizarCupos()', () => {
  it('sumar el último cupo deja estado LISTA_PARA_ZARPAR', () => {
    const emb = { codigo: '#220', nombre: 'Rápido 220', tipo: 'CHALUPA' as const, destino: 'Mompox', capacidad: 20, ocupados: 19, operador: 'empresa' as const, precio: 35000 }
    const r = actualizarCupos(emb, 1)
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.estado).toBe('LISTA_PARA_ZARPAR')
  })

  it('sumar con embarcación llena devuelve error "Cupo completo"', () => {
    const emb = { codigo: '#220', nombre: 'Rápido 220', tipo: 'CHALUPA' as const, destino: 'Mompox', capacidad: 20, ocupados: 20, operador: 'empresa' as const, precio: 35000 }
    const r = actualizarCupos(emb, 1)
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.error).toBe('Cupo completo')
  })

  it('restar con 0 ocupados deja ocupados en 0', () => {
    const emb = { codigo: '#220', nombre: 'Rápido 220', tipo: 'CHALUPA' as const, destino: 'Mompox', capacidad: 20, ocupados: 0, operador: 'empresa' as const, precio: 35000 }
    const r = actualizarCupos(emb, -1)
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.embarcacion.ocupados).toBe(0)
  })
})
