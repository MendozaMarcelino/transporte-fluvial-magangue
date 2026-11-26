import { describe, it, expect } from 'vitest'
import { validarCalificacion, promedioCalificaciones } from '../domain/calificacion'

// HU-011: calificación del servicio de 1 a 5 estrellas
describe('validarCalificacion()', () => {
  it('CA1: acepta 1 y 5', () => {
    expect(validarCalificacion(1)).toBe(true)
    expect(validarCalificacion(5)).toBe(true)
  })
  it('CA2: rechaza 0, 6 y 3.5', () => {
    expect(validarCalificacion(0)).toBe(false)
    expect(validarCalificacion(6)).toBe(false)
    expect(validarCalificacion(3.5)).toBe(false)
  })
})

describe('promedioCalificaciones()', () => {
  it('CA3: el promedio de 5, 4 y 4 es 4.3', () => {
    expect(promedioCalificaciones([5, 4, 4])).toBe(4.3)
  })
  it('sin calificaciones el promedio es 0', () => {
    expect(promedioCalificaciones([])).toBe(0)
  })
})
