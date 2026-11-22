import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Embarcaciones from '../screens/Embarcaciones'

// Limpia localStorage antes de cada prueba para evitar datos residuales
beforeEach(() => localStorage.clear())

describe('Embarcaciones – formulario', () => {
  it('muestra error al guardar código sin #', async () => {
    const user = userEvent.setup()
    render(<Embarcaciones onVolver={() => {}} />)

    await user.type(screen.getByPlaceholderText('Código (#NNN)'), '220')
    await user.type(screen.getByPlaceholderText('Nombre'), 'Prueba')
    await user.type(screen.getByPlaceholderText('Destino'), 'Mompox')
    await user.type(screen.getByPlaceholderText('Capacidad'), '20')
    await user.click(screen.getByRole('button', { name: /guardar embarcación/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Código inválido: use # seguido de 3 dígitos',
    )
  })
})
