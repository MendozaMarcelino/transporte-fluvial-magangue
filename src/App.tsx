// =============================================
// App – maneja sesión y pantalla actual
// =============================================
import { useState } from 'react'
import Bienvenida from './screens/Bienvenida'

type Pantalla = 'bienvenida'

export default function App() {
  const [pantalla, setPantalla] = useState<Pantalla>('bienvenida')

  if (pantalla === 'bienvenida') {
    return <Bienvenida onIngresar={() => setPantalla('bienvenida')} />
  }

  return null
}
