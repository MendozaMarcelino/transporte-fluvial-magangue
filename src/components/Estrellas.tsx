import { useState } from 'react'
import { MAX_ESTRELLAS, guardarCalificacion, obtenerCalificaciones, promedioCalificaciones } from '../domain/calificacion'

type Props = { codigo: string }

// Permite al pasajero calificar una embarcación y ver el promedio
export default function Estrellas({ codigo }: Props) {
  const [lista, setLista] = useState<number[]>(() => obtenerCalificaciones(codigo))
  const [error, setError] = useState('')

  const calificar = (n: number) => {
    try {
      setLista(guardarCalificacion(codigo, n))
      setError('')
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const promedio = promedioCalificaciones(lista)
  return (
    <div data-testid={`estrellas-${codigo}`} style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
      {Array.from({ length: MAX_ESTRELLAS }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`Calificar con ${n} estrellas`}
          onClick={(ev) => { ev.stopPropagation(); calificar(n) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, padding: 0, color: n <= Math.round(promedio) ? '#F2A900' : '#C9CED6' }}
        >
          ★
        </button>
      ))}
      <span data-testid="promedio" style={{ fontSize: 14, marginLeft: 6 }}>
        {lista.length > 0 ? `${promedio.toFixed(1)} (${lista.length})` : 'Sin calificar'}
      </span>
      {error && <span style={{ color: '#C0392B', fontSize: 13 }}>{error}</span>}
    </div>
  )
}
