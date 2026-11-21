import { useState } from 'react'
import type { Embarcacion, TipoEmbarcacion } from '../domain/tipos'
import { registrarEmbarcacion, TIPOS } from '../domain/panel'
import { obtenerEmbarcaciones, guardarEmbarcaciones } from '../data/almacen'

interface Props {
  onVolver: () => void
}

const VACIO = {
  codigo: '',
  nombre: '',
  tipo: 'FLOTA' as TipoEmbarcacion,
  destino: '',
  capacidad: '',
  independiente: false,
}

export default function Embarcaciones({ onVolver }: Props) {
  const [lista, setLista] = useState<Embarcacion[]>(obtenerEmbarcaciones)
  const [form, setForm] = useState(VACIO)
  const [error, setError] = useState('')
  const [exito, setExito] = useState(false)

  function handleGuardar(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setExito(false)

    const esCarguera = form.tipo === 'CARGUERA'
    const datos: Omit<Embarcacion, 'ocupados'> = {
      codigo:    form.codigo.trim(),
      nombre:    form.nombre.trim(),
      tipo:      form.tipo,
      destino:   form.destino.trim(),
      capacidad: esCarguera ? null : Number(form.capacidad),
      precio:    esCarguera ? null : null, // precio se gestiona en fases posteriores
      operador:  form.independiente ? 'independiente' : 'empresa',
    }

    const resultado = registrarEmbarcacion(datos, lista)
    if (!resultado.ok) {
      setError(resultado.mensaje)
      return
    }

    const nueva = [...lista, resultado.embarcacion]
    guardarEmbarcaciones(nueva)
    setLista(nueva)
    setForm(VACIO)
    setExito(true)
  }

  return (
    <div className="pantalla">
      <button className="btn btn--secundario" onClick={onVolver}>
        ← Volver al panel
      </button>

      <h1 className="pantalla__titulo">Embarcaciones</h1>

      {/* ── Lista ── */}
      <ul className="emb-lista">
        {lista.map((e) => (
          <li key={e.codigo} className="emb-item">
            <span className="emb-codigo">{e.codigo}</span>
            <span className="emb-nombre">{e.nombre}</span>
            <span className="emb-tipo">{e.tipo}</span>
            {e.operador === 'independiente' && (
              <span className="emb-badge">Independiente</span>
            )}
          </li>
        ))}
      </ul>

      {/* ── Formulario ── */}
      <h2 className="pantalla__subtitulo" style={{ marginTop: '8px' }}>
        Registrar embarcación
      </h2>

      <form onSubmit={handleGuardar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          className="input"
          placeholder="Código (#NNN)"
          value={form.codigo}
          onChange={(e) => { setForm({ ...form, codigo: e.target.value }); setError('') }}
          required
        />
        <input
          className="input"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <select
          className="input"
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value as TipoEmbarcacion })}
        >
          {TIPOS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <input
          className="input"
          placeholder="Destino"
          value={form.destino}
          onChange={(e) => setForm({ ...form, destino: e.target.value })}
          required
        />
        {form.tipo !== 'CARGUERA' && (
          <input
            className="input"
            type="number"
            placeholder="Capacidad"
            min={1}
            value={form.capacidad}
            onChange={(e) => setForm({ ...form, capacidad: e.target.value })}
            required
          />
        )}
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
          <input
            type="checkbox"
            checked={form.independiente}
            onChange={(e) => setForm({ ...form, independiente: e.target.checked })}
          />
          Operador independiente
        </label>

        {error && (
          <p className="login__error" role="alert">{error}</p>
        )}
        {exito && (
          <p style={{ color: 'var(--verde)', fontWeight: 600, textAlign: 'center' }}>
            Embarcación registrada ✓
          </p>
        )}

        <button type="submit" className="btn btn--primario">
          Guardar embarcación
        </button>
      </form>
    </div>
  )
}
