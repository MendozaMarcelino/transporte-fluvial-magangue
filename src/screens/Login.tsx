import { useState } from 'react'
import { autenticar, pantallaInicio } from '../domain/auth'
import { USUARIOS } from '../data/datos'
import type { Usuario } from '../domain/tipos'
import type { PantallaInicio } from '../domain/auth'
import { IconBarco, IconAlerta } from '../components/Iconos'

interface Props {
  onLogin: (usuario: Usuario, pantalla: PantallaInicio) => void
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const usuario = autenticar(username, clave, USUARIOS)
    if (usuario) {
      setError(false)
      onLogin(usuario, pantallaInicio(usuario.rol))
    } else {
      setError(true)
    }
  }

  return (
    <div className="pantalla">
      <div className="pantalla__header">
        <span className="pantalla__header-titulo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconBarco size={20} color="#fff" /> Río Magangué
        </span>
      </div>

      <div className="pantalla__body" style={{ justifyContent: 'center' }}>
        <div style={{ marginBottom: '4px' }}>
          <h1 className="pantalla__titulo">Bienvenido</h1>
          <p className="pantalla__subtitulo" style={{ marginTop: '4px' }}>Ingresa tus credenciales para continuar</p>
        </div>

        <div className="login__card">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <label className="login__label">
              <span className="login__label-text">Usuario</span>
              <input className="input" type="text" placeholder="Usuario" value={username}
                autoComplete="username"
                onChange={(e) => { setUsername(e.target.value); setError(false) }} />
            </label>
            <label className="login__label">
              <span className="login__label-text">Contraseña</span>
              <input className="input" type="password" placeholder="Contraseña" value={clave}
                autoComplete="current-password"
                onChange={(e) => { setClave(e.target.value); setError(false) }} />
            </label>

            {error && (
              <p className="login__error" role="alert">
                <IconAlerta size={16} color="var(--rojo)" /> Usuario o contraseña incorrectos
              </p>
            )}

            <button type="submit" className="btn btn--primario" style={{ marginTop: '4px' }}>
              Ingresar
            </button>
          </form>
        </div>

        <details className="login__ayuda">
          <summary>Ver usuarios de prueba</summary>
          <ul>
            <li><strong>pasajero</strong><span style={{ color: '#888' }}>pasajero123 · Pasajero</span></li>
            <li><strong>operador220</strong><span style={{ color: '#888' }}>operador123 · Operador</span></li>
            <li><strong>taquilla</strong><span style={{ color: '#888' }}>taquilla123 · Taquilla</span></li>
            <li><strong>admin</strong><span style={{ color: '#888' }}>admin123 · Admin</span></li>
          </ul>
        </details>
      </div>
    </div>
  )
}
