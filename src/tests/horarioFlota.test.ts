import { describe, it, expect } from 'vitest'
import { estadoFlota } from '../domain/horarioFlota'

// HU-002: estado de la flota según la hora del día
const hora = (h: number, m: number) => new Date(2026, 10, 25, h, m)

describe('estadoFlota()', () => {
  it('CA1: antes de las 7:00 a. m. está en camino', () => {
    expect(estadoFlota(hora(6, 30))).toBe('EN_CAMINO')
  })
  it('CA2: a las 7:00 a. m. llega al muelle', () => {
    expect(estadoFlota(hora(7, 0))).toBe('EN_MUELLE')
  })
  it('CA2: a las 12:59 p. m. sigue en el muelle', () => {
    expect(estadoFlota(hora(12, 59))).toBe('EN_MUELLE')
  })
  it('CA3: después de la 1:00 p. m. ya zarpó', () => {
    expect(estadoFlota(hora(13, 1))).toBe('ZARPO')
  })
})
