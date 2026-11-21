import { useState } from 'react'
import type { Usuario } from './domain/tipos'
import type { PantallaInicio } from './domain/auth'
import Bienvenida from './screens/Bienvenida'
import Login from './screens/Login'
import Rutas from './screens/Rutas'
import Operador from './screens/Operador'
import Venta from './screens/Venta'
import Panel from './screens/Panel'

type Pantalla = 'bienvenida' | 'login' | PantallaInicio

export default function App() {
  const [pantalla, setPantalla] = useState<Pantalla>('bienvenida')
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  function handleLogin(u: Usuario, destino: PantallaInicio) {
    setUsuario(u)
    setPantalla(destino)
  }

  function handleCerrarSesion() {
    setUsuario(null)
    setPantalla('bienvenida')
  }

  if (pantalla === 'bienvenida') {
    return <Bienvenida onIngresar={() => setPantalla('login')} />
  }

  if (pantalla === 'login') {
    return <Login onLogin={handleLogin} />
  }

  // Pantallas protegidas por rol
  if (pantalla === 'rutas' && usuario?.rol === 'pasajero') {
    return <Rutas onCerrarSesion={handleCerrarSesion} />
  }

  if (pantalla === 'operador' && usuario?.rol === 'operador') {
    return <Operador usuario={usuario} onCerrarSesion={handleCerrarSesion} />
  }

  if (pantalla === 'venta' && usuario?.rol === 'taquilla') {
    return <Venta onCerrarSesion={handleCerrarSesion} />
  }

  if (pantalla === 'panel' && usuario?.rol === 'admin') {
    return <Panel onCerrarSesion={handleCerrarSesion} />
  }

  // Acceso no autorizado → vuelve al inicio
  return <Bienvenida onIngresar={() => setPantalla('login')} />
}
