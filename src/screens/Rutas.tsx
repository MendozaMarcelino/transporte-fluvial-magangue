interface Props {
  onCerrarSesion: () => void
}

export default function Rutas({ onCerrarSesion }: Props) {
  return (
    <div className="pantalla">
      <h1 className="pantalla__titulo">Rutas disponibles</h1>
      <p className="pantalla__subtitulo">Rol: Pasajero</p>
      <button className="btn btn--secundario" onClick={onCerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  )
}
