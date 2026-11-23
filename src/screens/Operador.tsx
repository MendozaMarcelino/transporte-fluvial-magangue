import type { Usuario } from '../domain/tipos'

interface Props {
  usuario: Usuario
  onCerrarSesion: () => void
}

export default function Operador({ usuario, onCerrarSesion }: Props) {
  return (
    <div className="pantalla">
      <h1 className="pantalla__titulo">Panel del Operador</h1>
      {usuario.codigoEmbarcacion && (
        <p className="codigo-embarcacion">{usuario.codigoEmbarcacion}</p>
      )}
      <p className="pantalla__subtitulo">Rol: Operador</p>
      <button className="btn btn--secundario" onClick={onCerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  )
}
