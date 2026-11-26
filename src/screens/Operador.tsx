import { useState } from 'react'
import type { Usuario } from '../domain/tipos'
import { actualizarCupos } from '../domain/cupos'
import type { EstadoCupos } from '../domain/cupos'
import { obtenerEmbarcaciones, guardarEmbarcaciones } from '../data/almacen'
import { IconBarco, IconPin, IconSalir, IconAncla, IconAlerta } from '../components/Iconos'

interface Props {
  usuario: Usuario
  onCerrarSesion: () => void
}

const ESTADO_CLASE: Record<EstadoCupos, string> = {
  EN_MUELLE:         'estado-badge--en-muelle',
  EMBARCANDO:        'estado-badge--embarcando',
  LISTA_PARA_ZARPAR: 'estado-badge--lista-para-zarpar',
}

const ESTADO_LABEL: Record<EstadoCupos, string> = {
  EN_MUELLE:         'En muelle',
  EMBARCANDO:        'Embarcando',
  LISTA_PARA_ZARPAR: 'Lista para zarpar',
}

export default function Operador({ usuario, onCerrarSesion }: Props) {
  const [embarcaciones, setEmbarcaciones] = useState(obtenerEmbarcaciones)
  const [msg, setMsg] = useState('')

  const emb = embarcaciones.find((e) => e.codigo === usuario.codigoEmbarcacion) ?? null

  const estado: EstadoCupos = emb
    ? emb.capacidad !== null && emb.ocupados >= emb.capacidad
      ? 'LISTA_PARA_ZARPAR'
      : emb.ocupados > 0 ? 'EMBARCANDO' : 'EN_MUELLE'
    : 'EN_MUELLE'

  function cambiarCupo(delta: number) {
    if (!emb) return
    const resultado = actualizarCupos(emb, delta)
    if (!resultado.ok) {
      setMsg(resultado.error)
      setTimeout(() => setMsg(''), 2500)
      return
    }
    const nuevas = embarcaciones.map((e) => e.codigo === emb.codigo ? resultado.embarcacion : e)
    guardarEmbarcaciones(nuevas)
    setEmbarcaciones(nuevas)
    setMsg('')
  }

  const pct = emb?.capacidad ? Math.round((emb.ocupados / emb.capacidad) * 100) : 0
  const fillClass = pct >= 100 ? 'cupos-barra__fill--lleno' : pct >= 70 ? 'cupos-barra__fill--alto' : ''
  const disponibles = emb?.capacidad != null ? emb.capacidad - emb.ocupados : null

  return (
    <div className="pantalla">
      <div className="pantalla__header">
        <span className="pantalla__header-titulo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconBarco size={20} color="#fff" /> Río Magangué
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <span className="pantalla__header-usuario">{usuario.username} · Operador</span>
          <button className="btn--salir" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={onCerrarSesion}>
            <IconSalir size={13} color="#fff" /> Salir
          </button>
        </div>
      </div>

      <div className="pantalla__body">
        {!emb ? (
          <div className="empty-state">
            <IconAncla size={40} color="var(--gris-500)" />
            <p className="empty-state__texto">No tienes embarcación asignada</p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', paddingTop: '4px' }}>
              <span className={`emb-codigo ${emb.tipo === 'CHALUPA' ? 'emb-codigo--chalupa' : ''}`}
                style={{ fontSize: '2.2rem', padding: '14px 28px', display: 'inline-block', borderRadius: '14px', letterSpacing: '6px' }}>
                {emb.codigo}
              </span>
              <div style={{ marginTop: '6px', fontWeight: 700, fontSize: '1rem' }}>{emb.nombre}</div>
              <div className="emb-meta" style={{ marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <IconPin size={13} color="var(--gris-500)" /> {emb.destino}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span className={`estado-badge ${ESTADO_CLASE[estado]}`} style={{ fontSize: '0.9rem', padding: '6px 18px' }}>
                {ESTADO_LABEL[estado]}
              </span>
            </div>

            <div className="tarjeta" style={{ gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="seccion-titulo">Pasajeros a bordo</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: disponibles === 0 ? 'var(--rojo)' : 'var(--verde)' }}>
                  {disponibles === 0 ? 'Lleno' : `${disponibles} libres`}
                </span>
              </div>

              <div style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 900, color: 'var(--azul-rio)', lineHeight: 1 }}>
                {emb.ocupados}
                <span style={{ fontSize: '1.2rem', color: '#999', fontWeight: 600 }}>/{emb.capacidad}</span>
              </div>

              <div className="cupos-barra" style={{ height: '10px' }}>
                <div className={`cupos-barra__fill ${fillClass}`} style={{ width: `${pct}%` }} />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
                {Array.from({ length: emb.capacidad ?? 0 }).map((_, i) => (
                  <div key={i} style={{
                    width: '24px', height: '24px', borderRadius: '5px',
                    background: i < emb.ocupados ? 'var(--rojo)' : 'var(--verde-suave)',
                    border: `1.5px solid ${i < emb.ocupados ? 'var(--rojo)' : 'var(--verde)'}`,
                    fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: i < emb.ocupados ? '#fff' : 'var(--verde)', fontWeight: 700,
                  }}>{i + 1}</div>
                ))}
              </div>
            </div>

            {msg && (
              <div className="msg-error" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconAlerta size={16} color="var(--rojo)" /> {msg}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button className="btn btn--rojo" style={{ fontSize: '1.3rem', minHeight: '64px' }}
                onClick={() => cambiarCupo(-1)} disabled={emb.ocupados === 0}>
                − Pasajero
              </button>
              <button className="btn btn--verde" style={{ fontSize: '1.3rem', minHeight: '64px' }}
                onClick={() => cambiarCupo(1)} disabled={emb.capacidad !== null && emb.ocupados >= emb.capacidad}>
                + Pasajero
              </button>
            </div>
          </>
        )}

        <button className="btn btn--secundario" style={{ marginTop: 'auto', gap: '8px' }} onClick={onCerrarSesion}>
          <IconSalir size={18} color="var(--azul-rio)" /> Cerrar sesión
        </button>
      </div>
    </div>
  )
}
