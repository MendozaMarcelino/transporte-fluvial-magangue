import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EstadoFlota from '../components/EstadoFlota'
import { textoEstadoFlota } from '../domain/horarioFlota'

describe('HU-002 en pantalla', () => {
  it('muestra "En muelle" en una flota a las 7:30 a. m.', () => {
    render(<EstadoFlota tipo="FLOTA" fecha={new Date(2026, 10, 25, 7, 30)} />)
    expect(screen.getByTestId('estado-flota').textContent).toBe('En muelle')
  })
  it('CA4: no muestra nada en una chalupa', () => {
    const { container } = render(<EstadoFlota tipo="CHALUPA" />)
    expect(container.innerHTML).toBe('')
  })
  it('el texto de las 2:00 p. m. es "Zarpó"', () => {
    expect(textoEstadoFlota(new Date(2026, 10, 25, 14, 0))).toBe('Zarpó')
  })
})
