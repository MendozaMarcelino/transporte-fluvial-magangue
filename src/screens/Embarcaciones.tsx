import { useState } from 'react'
import type { Embarcacion, TipoEmbarcacion } from '../domain/tipos'
import { registrarEmbarcacion, TIPOS } from '../domain/panel'
import { obtenerEmbarcaciones, guardarEmbarcaciones } from '../data/almacen'
import { IconBarco, IconVolver, IconAlerta, IconCheck } from '../components/Iconos'

interface Props {
  onVolver: () => void
}

const CLASE_CODIGO: Record<TipoEmbarcacion, string> = {
  FLOTA:    '',
  CHALUPA:  'emb-codigo--chalupa',
  CARGUERA: 'emb-codigo--carguera',
}

const VACIO = {
  codigo: '', nombre: '', tipo: 'FLOTA' as TipoEmbarcacion,
  destino: '', capacidad: '', independiente: false,
}

export default function Embarcaciones({ onVolver }: Props) {
  const [lista, setLista] = useState<Embarcacion[]>(obtenerEmbarcaciones)
  const [form, setForm] = useState(VACIO)
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)

  function handleGuardar(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setExito(false)
    const esCarguera = form.tipo === 'CARGUERA'
    const datos: Omit<Embarcacion, 'ocupados'> = {
      codigo:    form.codigo.trim(),
      nombre:    form.nombre.trim(),
      tipo:      form.tipo,
      destino:   form.destino.trim(),
      capacidad: esCarguera ? null : Number(form.capacidad),
      precio:    esCarguera ? null : null,
      operador:  form.independiente ? 'independiente' : 'empresa',
    }
    const resultado = registrarEmbarcacion(datos, lista)
    if (!resultado.ok) { setError(resultado.mensaje); return }
    const nueva = [...lista, resultado.embarcacion]
    guardarEmbarcaciones(nueva)
    setLista(nueva); setForm(VACIO); setExito(true)
  }

  return (
    <div className="pantalla">
      <div className="pantalla__header">
        <span className="pantalla__header-titulo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconBarco size={20} color="#fff" /> Río Magangué
        </span>
        <button className="btn--salir" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={onVolver}>
          <IconVolver size={15} color="#fff" /> Volver
        </button>
      </div>

      <div className="pantalla__body">
        <div>
          <h1 className="pantalla__titulo">Embarcaciones</h1>
          <p className="pantalla__subtitulo" style={{ marginTop: '4px' }}>{lista.length} registradas</p>
        </div>

        <p className="seccion-titulo">Flota actual</p>
        <ul className="emb-lista">
          {lista.map((e) => (
            <li key={e.codigo} className="emb-item">
              <span className={`emb-codigo ${CLASE_CODIGO[e.tipo]}`}>{e.codigo}</span>
              <div className="emb-info">
                <div className="emb-nombre">{e.nombre}</div>
                <div className="emb-meta">{e.tipo} · {e.destino}</div>
                {e.operador === 'independiente' && (
                  <span className="emb-badge" style={{ marginTop: '2px', alignSelf: 'flex-start' }}>Independiente</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="divider" />

        <div className="tarjeta">
          <p className="seccion-titulo" style={{ marginBottom: '2px' }}>Registrar nueva embarcación</p>
          <form onSubmit={handleGuardar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input className="input" placeholder="Código (#NNN)" value={form.codigo}
              onChange={(e) => { setForm({ ...form, codigo: e.target.value }); setError('') }} required />
            <input className="input" placeholder="Nombre" value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
            <select className="input" value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value as TipoEmbarcacion })}>
              {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <input className="input" placeholder="Destino" value={form.destino}
              onChange={(e) => setForm({ ...form, destino: e.target.value })} required />
            {form.tipo !== 'CARGUERA' && (
              <input className="input" type="number" placeholder="Capacidad" min={1}
                value={form.capacidad}
                onChange={(e) => setForm({ ...form, capacidad: e.target.value })} required />
            )}
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.independiente}
                onChange={(e) => setForm({ ...form, independiente: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--azul-rio)', cursor: 'pointer' }} />
              Operador independiente
            </label>
            {error && (
              <p className="login__error" role="alert" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IconAlerta size={15} color="var(--rojo)" /> {error}
              </p>
            )}
            {exito && (
              <p className="msg-exito" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IconCheck size={16} color="var(--verde)" /> Embarcación registrada exitosamente
              </p>
            )}
            <button type="submit" className="btn btn--primario">Guardar embarcación</button>
          </form>
        </div>
      </div>
    </div>
  )
}
