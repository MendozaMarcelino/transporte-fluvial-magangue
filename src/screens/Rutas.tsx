import { useState } from 'react'
import { obtenerEmbarcaciones } from '../data/almacen'
import { filtrarRutas, textoHorario } from '../domain/rutas'
import type { FiltroTipo } from '../domain/rutas'
import type { TipoEmbarcacion } from '../domain/tipos'

interface Props {
  onCerrarSesion: () => void
}

const TIPOS: TipoEmbarcacion[] = ['FLOTA', 'CHALUPA', 'CARGUERA']

export default function Rutas({ onCerrarSesion }: Props) {
  const embarcaciones = obtenerEmbarcaciones()
  const destinos = ['TODOS', ...Array.from(new Set(embarcaciones.map((e) => e.destino))).sort()]

  const [destino, setDestino] = useState('TODOS')
  const [tipo, setTipo] = useState<FiltroTipo>('TODOS')

  const resultados = filtrarRutas(embarcaciones, destino, tipo)

  return (
    <div className="pantalla">
      <h1 className="pantalla__titulo">Rutas disponibles</h1>

      <div style={{ display: 'flex', gap: '8px' }}>
        <select className="input" value={destino} onChange={(e) => setDestino(e.target.value)}>
          {destinos.map((d) => (
            <option key={d} value={d}>{d === 'TODOS' ? 'Todos los destinos' : d}</option>
          ))}
        </select>
        <select className="input" value={tipo} onChange={(e) => setTipo(e.target.value as FiltroTipo)}>
          <option value="TODOS">Todos los tipos</option>
          {TIPOS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {resultados.length === 0 ? (
        <p className="pantalla__subtitulo">No hay embarcaciones para esta ruta</p>
      ) : (
        <ul className="emb-lista">
          {resultados.map((e) => (
            <li key={e.codigo} className="emb-item">
              <span className="emb-codigo">{e.codigo}</span>
              <div style={{ flex: 1 }}>
                <div className="emb-nombre">{e.nombre}</div>
                <div className="emb-tipo">{e.tipo} · {e.destino}</div>
                <div style={{ fontSize: '0.85rem', color: '#555' }}>
                  {e.operador === 'independiente' ? 'Independiente' : 'Empresa'}
                  {e.capacidad !== null && ` · Cupos: ${e.ocupados}/${e.capacidad}`}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--azul-rio)', marginTop: '2px' }}>
                  {textoHorario(e.tipo)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button className="btn btn--secundario" onClick={onCerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  )
}
