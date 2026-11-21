import { describe, it, expect } from 'vitest'
import { EMBARCACIONES_INICIALES } from '../data/datos'

describe('Datos de ejemplo', () => {
  it('contiene exactamente 7 embarcaciones', () => {
    expect(EMBARCACIONES_INICIALES).toHaveLength(7)
  })
})
