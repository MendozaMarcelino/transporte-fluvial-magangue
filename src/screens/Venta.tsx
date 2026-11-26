import { useState } from 'react'
import type { Embarcacion } from '../domain/tipos'
import { obtenerEmbarcaciones, guardarEmbarcaciones, guardarTiquete } from '../data/almacen'
import { actualizarCupos } from '../domain/cupos'
import { IconBarco, IconPin, IconTiquete, IconCheck, IconAlerta, IconSalir } from '../components/Iconos'

interface Props {
  onCerrarSesion: () => void
}

interface Comprobante {
  codigo: string; embarcacion: string; destino: string
  nombre: string; precio: number; fecha: string; hora: string
}

export default function Venta({ onCerrarSesion }: Props) {
  const [embarcaciones, setEmbarcaciones] = useState(() =>
    obtenerEmbarcaciones().filter((e) => e.tipo !== 'CARGUERA' && e.capacidad !== null)
  )
  const [codigoSel, setCodigoSel] = useState('')
  const [nombre, setNombre] = useState('')
  const [error, setError] = useState('')
  const [comprobante, setComprobante] = useState<Comprobante | null>(null)

  const embSel: Embarcacion | undefined = embarcaciones.find((e) => e.codigo === codigoSel)
  const disponibles = embSel?.capacidad != null ? embSel.capacidad - embSel.ocupados : null

  function handleVender(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!embSel) { setError('Selecciona una embarcación'); return }
    if (!nombre.trim()) { setError('Ingresa el nombre del pasajero'); return }
    if (disponibles !== null && disponibles <= 0) { setError('No hay cupos disponibles'); return }
    const resultado = actualizarCupos(embSel, 1)
    if (!resultado.ok) { setError(resultado.error); return }
    const todasEmb = obtenerEmbarcaciones().map((e) =>
      e.codigo === embSel.codigo ? resultado.embarcacion : e
    )
    guardarEmbarcaciones(todasEmb)
    const ahora = new Date()
    const fecha = ahora.toLocaleDateString('es-CO')
    const hora  = ahora.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
    const yyyymmdd = ahora.toISOString().slice(0, 10).replace(/-/g, '')
    const codigoTQ = `TQ-${yyyymmdd}-${String(Math.floor(Math.random() * 9000) + 1000)}`
    guardarTiquete({ id: codigoTQ, codigoEmbarcacion: embSel.codigo, nombrePasajero: nombre.trim(), destino: embSel.destino, precio: embSel.precio ?? 0, fechaHora: ahora.toISOString() })
    setEmbarcaciones(todasEmb.filter((e) => e.tipo !== 'CARGUERA' && e.capacidad !== null))
    setComprobante({ codigo: codigoTQ, embarcacion: embSel.codigo, destino: embSel.destino, nombre: nombre.trim(), precio: embSel.precio ?? 0, fecha, hora })
  }

  function handleNueva() { setComprobante(null); setNombre(''); setCodigoSel(''); setError('') }

  if (comprobante) {
    return (
      <div className="pantalla">
        <div className="pantalla__header">
          <span className="pantalla__header-titulo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconBarco size={20} color="#fff" /> Río Magangué
          </span>
          <button className="btn--salir" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={onCerrarSesion}>
            <IconSalir size={13} color="#fff" /> Salir
          </button>
        </div>
        <div className="pantalla__body" style={{ justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ background: 'var(--verde-suave)', borderRadius: '50%', padding: '14px', display: 'inline-flex' }}>
              <IconCheck size={28} color="var(--verde)" />
            </div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--verde)' }}>Tiquete vendido</div>
          </div>
          <div className="tiquete">
            <div className="tiquete__cabeza">
              <div className="tiquete__empresa">Puerto de Magangué · Bolívar</div>
              <div className="tiquete__embarcacion">{comprobante.embarcacion}</div>
              <div className="tiquete__destino" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                <IconPin size={14} color="rgba(255,255,255,0.8)" /> {comprobante.destino}
              </div>
            </div>
            <div className="tiquete__corte">
              <div className="tiquete__corte-circulo" />
              <div className="tiquete__corte-linea" />
              <div className="tiquete__corte-circulo" />
            </div>
            <div className="tiquete__cuerpo">
              <div className="tiquete__fila"><span className="tiquete__fila-label">Pasajero</span><span className="tiquete__fila-valor">{comprobante.nombre}</span></div>
              <div className="tiquete__fila"><span className="tiquete__fila-label">Fecha</span><span className="tiquete__fila-valor">{comprobante.fecha}</span></div>
              <div className="tiquete__fila"><span className="tiquete__fila-label">Hora</span><span className="tiquete__fila-valor">{comprobante.hora}</span></div>
              <div style={{ textAlign: 'center', marginTop: '4px' }}>
                <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '2px' }}>Valor</div>
                <div className="tiquete__valor">${comprobante.precio.toLocaleString('es-CO')}</div>
              </div>
              <div className="tiquete__codigo">{comprobante.codigo}</div>
            </div>
          </div>
          <button className="btn btn--primario" style={{ gap: '8px' }} onClick={handleNueva}>
            <IconTiquete size={18} color="#fff" /> Vender otro tiquete
          </button>
          <button className="btn btn--secundario" style={{ gap: '8px' }} onClick={onCerrarSesion}>
            <IconSalir size={18} color="var(--azul-rio)" /> Cerrar sesión
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pantalla">
      <div className="pantalla__header">
        <span className="pantalla__header-titulo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconBarco size={20} color="#fff" /> Río Magangué
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <span className="pantalla__header-usuario">taquilla · Taquilla</span>
          <button className="btn--salir" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={onCerrarSesion}>
            <IconSalir size={13} color="#fff" /> Salir
          </button>
        </div>
      </div>
      <div className="pantalla__body">
        <div>
          <h1 className="pantalla__titulo">Venta de tiquetes</h1>
          <p className="pantalla__subtitulo" style={{ marginTop: '4px' }}>Completa los datos para vender</p>
        </div>
        <form onSubmit={handleVender} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <div className="seccion-titulo" style={{ marginBottom: '6px' }}>Embarcación</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {embarcaciones.map((e) => {
                const disp = e.capacidad! - e.ocupados
                const llena = disp <= 0
                return (
                  <label key={e.codigo} style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px',
                    borderRadius: '12px', cursor: llena ? 'not-allowed' : 'pointer',
                    background: codigoSel === e.codigo ? 'var(--azul-suave)' : 'var(--blanco)',
                    border: `2px solid ${codigoSel === e.codigo ? 'var(--azul-rio)' : 'var(--gris-300)'}`,
                    opacity: llena ? 0.5 : 1, transition: 'all 0.15s',
                  }}>
                    <input type="radio" name="emb" value={e.codigo} disabled={llena}
                      checked={codigoSel === e.codigo} onChange={() => setCodigoSel(e.codigo)}
                      style={{ accentColor: 'var(--azul-rio)', width: '18px', height: '18px' }} />
                    <span className={`emb-codigo ${e.tipo === 'CHALUPA' ? 'emb-codigo--chalupa' : ''}`}
                      style={{ fontSize: '0.85rem', padding: '4px 8px', borderRadius: '6px' }}>
                      {e.codigo}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{e.nombre}</div>
                      <div style={{ fontSize: '0.75rem', color: '#777', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <IconPin size={11} color="#999" /> {e.destino} · {llena ? 'Sin cupos' : `${disp} libres`}
                      </div>
                    </div>
                    {e.precio !== null && (
                      <span style={{ fontWeight: 800, color: 'var(--verde)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                        ${e.precio.toLocaleString('es-CO')}
                      </span>
                    )}
                  </label>
                )
              })}
            </div>
          </div>
          <div>
            <div className="seccion-titulo" style={{ marginBottom: '6px' }}>Nombre del pasajero</div>
            <input className="input" placeholder="Nombre completo" value={nombre}
              onChange={(e) => { setNombre(e.target.value); setError('') }} />
          </div>
          {embSel && disponibles !== null && disponibles > 0 && (
            <div className="tarjeta" style={{ background: 'var(--azul-suave)', boxShadow: 'none', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: '#666' }}>Destino</span>
                <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <IconPin size={12} color="var(--azul-rio)" /> {embSel.destino}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: '#666' }}>Cupos restantes</span>
                <span style={{ fontWeight: 700, color: 'var(--verde)' }}>{disponibles}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666', fontSize: '0.88rem' }}>Valor</span>
                <span style={{ fontWeight: 900, color: 'var(--verde)', fontSize: '1.2rem' }}>
                  ${(embSel.precio ?? 0).toLocaleString('es-CO')}
                </span>
              </div>
            </div>
          )}
          {error && <div className="msg-error"><IconAlerta size={16} color="var(--rojo)" /> {error}</div>}
          <button type="submit" className="btn btn--primario" style={{ marginTop: '4px', gap: '8px' }}>
            <IconTiquete size={18} color="#fff" /> Vender tiquete
          </button>
        </form>
        <button className="btn btn--secundario" style={{ marginTop: 'auto', gap: '8px' }} onClick={onCerrarSesion}>
          <IconSalir size={18} color="var(--azul-rio)" /> Cerrar sesión
        </button>
      </div>
    </div>
  )
}
