import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { filtrarRutas, textoHorario } from '../domain/rutas'
import { EMBARCACIONES_INICIALES } from '../data/datos'
import Rutas from '../screens/Rutas'

beforeEach(() => localStorage.clear())

describe('filtrarRutas()', () => {
  it('devuelve todas cuando destino y tipo son TODOS', () => {
    const r = filtrarRutas(EMBARCACIONES_INICIALES, 'TODOS', 'TODOS')
    expect(r).toHaveLength(EMBARCACIONES_INICIALES.length)
  })

  it('filtra por destino Mompox', () => {
    const r = filtrarRutas(EMBARCACIONES_INICIALES, 'Mompox', 'TODOS')
    expect(r.every((e) => e.destino === 'Mompox')).toBe(true)
    expect(r.length).toBeGreaterThan(0)
  })
})

describe('textoHorario()', () => {
  it('devuelve texto correcto para CHALUPA', () => {
    expect(textoHorario('CHALUPA')).toContain('5:00 a. m.')
  })
})

describe('Rutas – pantalla', () => {
  it('filtrar Mompox muestra #012 y #220', async () => {
    const user = userEvent.setup()
    render(<Rutas onCerrarSesion={() => {}} />)

    const selects = screen.getAllByRole('combobox')
    await user.selectOptions(selects[0], 'Mompox')

    expect(screen.getByText('#012')).toBeInTheDocument()
    expect(screen.getByText('#220')).toBeInTheDocument()
  })
})
