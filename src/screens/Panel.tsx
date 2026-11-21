interface Props {
  onCerrarSesion: () => void
}

export default function Panel({ onCerrarSesion }: Props) {
  return (
    <div className="pantalla">
      <h1 className="pantalla__titulo">Panel de administración</h1>
      <p className="pantalla__subtitulo">Rol: Admin</p>
      <button className="btn btn--secundario" onClick={onCerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  )
}
