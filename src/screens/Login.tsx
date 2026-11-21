import { useState } from 'react'
import { autenticar, pantallaInicio } from '../domain/auth'
import { USUARIOS } from '../data/datos'
import type { Usuario } from '../domain/tipos'
import type { PantallaInicio } from '../domain/auth'

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
      <p className="bienvenida__emoji">🚢</p>
      <h1 className="pantalla__titulo">Río Magangué</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          className="input"
          type="text"
          placeholder="Usuario"
          value={username}
          autoComplete="username"
          onChange={(e) => { setUsername(e.target.value); setError(false) }}
        />
        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          value={clave}
          autoComplete="current-password"
          onChange={(e) => { setClave(e.target.value); setError(false) }}
        />
        {error && (
          <p className="login__error" role="alert">
            Usuario o contraseña incorrectos
          </p>
        )}
        <button type="submit" className="btn btn--primario">
          Ingresar
        </button>
      </form>
      <details className="login__ayuda">
        <summary>Usuarios de prueba</summary>
        <ul>
          <li><strong>pasajero</strong> / pasajero123</li>
          <li><strong>operador220</strong> / operador123</li>
          <li><strong>taquilla</strong> / taquilla123</li>
          <li><strong>admin</strong> / admin123</li>
        </ul>
      </details>
    </div>
  )
}
