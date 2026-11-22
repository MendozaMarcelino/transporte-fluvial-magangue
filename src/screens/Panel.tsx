interface Props {
  onEmbarcaciones: () => void
  onCerrarSesion: () => void
}

export default function Panel({ onEmbarcaciones, onCerrarSesion }: Props) {
  return (
    <div className="pantalla">
      <h1 className="pantalla__titulo">Panel de administración</h1>
      <p className="pantalla__subtitulo">Rol: Admin</p>
      <button className="btn btn--primario" onClick={onEmbarcaciones}>
        Gestionar embarcaciones
      </button>
      <button className="btn btn--secundario" onClick={onCerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  )
}
