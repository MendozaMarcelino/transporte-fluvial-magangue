import { useState } from 'react'
import { obtenerEmbarcaciones } from '../data/almacen'
import { filtrarRutas, textoHorario } from '../domain/rutas'
import type { FiltroTipo } from '../domain/rutas'
import type { Embarcacion, TipoEmbarcacion } from '../domain/tipos'
import { IconBarco, IconPin, IconReloj, IconFlecha, IconVolver, IconSalir, IconBuscar, IconUsuario } from '../components/Iconos'

interface Props {
  onCerrarSesion: () => void
}

const TIPOS: TipoEmbarcacion[] = ['FLOTA', 'CHALUPA', 'CARGUERA']

const CLASE_CODIGO: Record<TipoEmbarcacion, string> = {
  FLOTA:    '',
  CHALUPA:  'emb-codigo--chalupa',
  CARGUERA: 'emb-codigo--carguera',
}

function estadoTexto(e: Embarcacion): { texto: string; clase: string } {
  if (e.capacidad === null) return { texto: 'Carga · No vende tiquetes', clase: 'estado-badge--en-muelle' }
  if (e.ocupados >= e.capacidad) return { texto: 'Lleno · Lista para zarpar', clase: 'estado-badge--lista-para-zarpar' }
  if (e.ocupados > 0) return { texto: 'Embarcando pasajeros', clase: 'estado-badge--embarcando' }
  return { texto: 'En muelle · Esperando', clase: 'estado-badge--en-muelle' }
}

export default function Rutas({ onCerrarSesion }: Props) {
  const [embarcaciones] = useState(obtenerEmbarcaciones)
  const destinos = ['TODOS', ...Array.from(new Set(embarcaciones.map((e) => e.destino))).sort()]

  const [destino, setDestino] = useState('TODOS')
  const [tipo, setTipo] = useState<FiltroTipo>('TODOS')
  const [seleccionada, setSeleccionada] = useState<Embarcacion | null>(null)

  const resultados = filtrarRutas(embarcaciones, destino, tipo)

  // ── Vista detalle ──
  if (seleccionada) {
    const e = seleccionada
    const disponibles = e.capacidad !== null ? e.capacidad - e.ocupados : null
    const pct = e.capacidad ? Math.round((e.ocupados / e.capacidad) * 100) : 0
    const fillClass = pct >= 100 ? 'cupos-barra__fill--lleno' : pct >= 70 ? 'cupos-barra__fill--alto' : ''
    const estado = estadoTexto(e)

    return (
      <div className="pantalla">
        <div className="pantalla__header">
          <button className="btn--salir" style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setSeleccionada(null)}>
            <IconVolver size={15} color="#fff" /> Volver
          </button>
          <span className="pantalla__header-titulo">Detalle</span>
          <button className="btn--salir" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={onCerrarSesion}>
            <IconSalir size={13} color="#fff" /> Salir
          </button>
        </div>
        <div className="pantalla__body">
          <div style={{ textAlign: 'center' }}>
            <span className={`emb-codigo ${CLASE_CODIGO[e.tipo]}`}
              style={{ fontSize: '2rem', padding: '12px 24px', display: 'inline-block', borderRadius: '12px', letterSpacing: '4px' }}>
              {e.codigo}
            </span>
          </div>

          <div className="tarjeta" style={{ gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{e.nombre}</div>
                <div className="emb-meta" style={{ marginTop: '2px' }}>{e.tipo}</div>
              </div>
              <span className={`estado-badge ${estado.clase}`}>{estado.texto}</span>
            </div>

            <div className="divider" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div className="seccion-titulo">Destino</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <IconPin size={14} color="var(--azul-rio)" /> {e.destino}
                </div>
              </div>
              <div>
                <div className="seccion-titulo">Operador</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <IconUsuario size={14} color="var(--azul-rio)" />
                  {e.operador === 'independiente' ? 'Independiente' : 'Empresa'}
                </div>
              </div>
              {e.precio !== null && (
                <div>
                  <div className="seccion-titulo">Precio</div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--verde)', marginTop: '4px' }}>
                    ${e.precio.toLocaleString('es-CO')}
                  </div>
                </div>
              )}
              {disponibles !== null && (
                <div>
                  <div className="seccion-titulo">Asientos libres</div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: disponibles === 0 ? 'var(--rojo)' : 'var(--azul-rio)', marginTop: '4px' }}>
                    {disponibles === 0 ? 'Sin cupos' : `${disponibles} disponibles`}
                  </div>
                </div>
              )}
            </div>

            {e.capacidad !== null && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: '#666', marginBottom: '4px' }}>
                  <span>Ocupación</span>
                  <span>{e.ocupados} / {e.capacidad} pasajeros ({pct}%)</span>
                </div>
                <div className="cupos-barra" style={{ height: '8px' }}>
                  <div className={`cupos-barra__fill ${fillClass}`} style={{ width: `${pct}%` }} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '10px' }}>
                  {Array.from({ length: e.capacidad }).map((_, i) => (
                    <div key={i} style={{
                      width: '22px', height: '22px', borderRadius: '4px',
                      background: i < e.ocupados ? 'var(--rojo)' : 'var(--verde-suave)',
                      border: `1.5px solid ${i < e.ocupados ? 'var(--rojo)' : 'var(--verde)'}`,
                      fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: i < e.ocupados ? '#fff' : 'var(--verde)', fontWeight: 700,
                    }}>{i + 1}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px', fontSize: '0.75rem', fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--rojo)', display: 'inline-block' }} /> Ocupado
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--verde-suave)', border: '1.5px solid var(--verde)', display: 'inline-block' }} /> Disponible
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="tarjeta" style={{ background: 'var(--azul-suave)', boxShadow: 'none' }}>
            <div className="seccion-titulo">Horario</div>
            <div style={{ fontWeight: 600, color: 'var(--azul-rio)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <IconReloj size={15} color="var(--azul-rio)" /> {textoHorario(e.tipo)}
            </div>
          </div>

          {e.capacidad !== null && disponibles === 0 && (
            <div className="msg-error">Esta embarcación no tiene cupos disponibles</div>
          )}
          {e.tipo === 'CARGUERA' && (
            <div className="msg-error" style={{ background: '#FFF3CD', color: '#856404', borderLeftColor: 'var(--ambar)' }}>
              Las cargueras no venden tiquetes al público
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Vista lista ──
  return (
    <div className="pantalla">
      <div className="pantalla__header">
        <span className="pantalla__header-titulo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconBarco size={20} color="#fff" /> Río Magangué
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <span className="pantalla__header-usuario">Pasajero</span>
          <button className="btn--salir" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={onCerrarSesion}>
            <IconSalir size={13} color="#fff" /> Salir
          </button>
        </div>
      </div>

      <div className="pantalla__body">
        <div className="filtros-row">
          <select className="input" value={destino} onChange={(e) => setDestino(e.target.value)}>
            {destinos.map((d) => (
              <option key={d} value={d}>{d === 'TODOS' ? 'Todos los destinos' : d}</option>
            ))}
          </select>
          <select className="input" value={tipo} onChange={(e) => setTipo(e.target.value as FiltroTipo)}>
            <option value="TODOS">Todos los tipos</option>
            {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <p className="seccion-titulo">{resultados.length} embarcación{resultados.length !== 1 ? 'es' : ''} · toca para ver detalle</p>

        {resultados.length === 0 ? (
          <div className="empty-state">
            <IconBuscar size={40} color="var(--gris-500)" />
            <p className="empty-state__texto">No hay embarcaciones para esta ruta</p>
          </div>
        ) : (
          <ul className="emb-lista">
            {resultados.map((e) => {
              const disponibles = e.capacidad !== null ? e.capacidad - e.ocupados : null
              const pct = e.capacidad ? Math.round((e.ocupados / e.capacidad) * 100) : 0
              const fillClass = pct >= 100 ? 'cupos-barra__fill--lleno' : pct >= 70 ? 'cupos-barra__fill--alto' : ''
              const estado = estadoTexto(e)
              return (
                <li key={e.codigo} className="emb-item" style={{ cursor: 'pointer' }} onClick={() => setSeleccionada(e)}>
                  <span className={`emb-codigo ${CLASE_CODIGO[e.tipo]}`}>{e.codigo}</span>
                  <div className="emb-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="emb-nombre">{e.nombre}</div>
                      <IconFlecha size={16} color="var(--azul-rio)" />
                    </div>
                    <div className="emb-meta" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <IconPin size={12} color="var(--gris-500)" /> {e.destino}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px', flexWrap: 'wrap' }}>
                      <span className={`estado-badge ${estado.clase}`}>{estado.texto}</span>
                      {e.precio !== null && (
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--verde)' }}>
                          ${e.precio.toLocaleString('es-CO')}
                        </span>
                      )}
                    </div>
                    {disponibles !== null && (
                      <div style={{ fontSize: '0.78rem', color: disponibles === 0 ? 'var(--rojo)' : '#555', fontWeight: 600, marginTop: '2px' }}>
                        {disponibles === 0 ? 'Sin cupos' : `${disponibles} asientos libres`}
                      </div>
                    )}
                    {e.capacidad !== null && (
                      <div className="cupos-barra">
                        <div className={`cupos-barra__fill ${fillClass}`} style={{ width: `${pct}%` }} />
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
