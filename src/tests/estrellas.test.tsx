import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Estrellas from '../components/Estrellas'
import { guardarCalificacion, obtenerCalificaciones } from '../domain/calificacion'

describe('HU-011 en pantalla', () => {
  beforeEach(() => localStorage.clear())

  it('CA1: calificar con 5 estrellas muestra el promedio 5.0', () => {
    render(<Estrellas codigo="#220" />)
    fireEvent.click(screen.getByLabelText('Calificar con 5 estrellas'))
    expect(screen.getByTestId('promedio').textContent).toBe('5.0 (1)')
  })

  it('integración: la calificación queda guardada en localStorage', () => {
    guardarCalificacion('#098', 4)
    expect(obtenerCalificaciones('#098')).toEqual([4])
  })

  it('CA2: una calificación inválida lanza el error', () => {
    expect(() => guardarCalificacion('#098', 7)).toThrow('La calificación debe estar entre 1 y 5')
  })
})
