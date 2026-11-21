interface Props {
  onCerrarSesion: () => void
}

export default function Venta({ onCerrarSesion }: Props) {
  return (
    <div className="pantalla">
      <h1 className="pantalla__titulo">Venta de tiquetes</h1>
      <p className="pantalla__subtitulo">Rol: Taquilla</p>
      <button className="btn btn--secundario" onClick={onCerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  )
}
