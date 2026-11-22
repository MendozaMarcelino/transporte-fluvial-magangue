import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { autenticar, pantallaInicio } from '../domain/auth'
import { USUARIOS } from '../data/datos'
import Login from '../screens/Login'

// ── Unitarias ────────────────────────────────────────────

describe('autenticar()', () => {
  it('devuelve el usuario cuando la clave es correcta', () => {
    const resultado = autenticar('admin', 'admin123', USUARIOS)
    expect(resultado).not.toBeNull()
    expect(resultado?.rol).toBe('admin')
  })

  it('devuelve null cuando la clave es incorrecta', () => {
    const resultado = autenticar('admin', 'clavemal', USUARIOS)
    expect(resultado).toBeNull()
  })
})

describe('pantallaInicio()', () => {
  it('devuelve "panel" para el rol admin', () => {
    expect(pantallaInicio('admin')).toBe('panel')
  })
})

// ── Funcional ────────────────────────────────────────────

describe('Login – pantalla', () => {
  it('muestra error al ingresar clave incorrecta', async () => {
    const user = userEvent.setup()
    render(<Login onLogin={() => {}} />)

    await user.type(screen.getByPlaceholderText('Usuario'), 'admin')
    await user.type(screen.getByPlaceholderText('Contraseña'), 'clavemal')
    await user.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(
      screen.getByRole('alert'),
    ).toHaveTextContent('Usuario o contraseña incorrectos')
  })
})
