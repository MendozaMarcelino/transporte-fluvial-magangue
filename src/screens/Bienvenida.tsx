// =============================================
// Pantalla de Bienvenida – Río Magangué
// =============================================

interface Props {
  onIngresar: () => void
}

export default function Bienvenida({ onIngresar }: Props) {
  return (
    <div className="pantalla">
      <p className="bienvenida__emoji">🚢</p>
      <h1 className="pantalla__titulo">Río Magangué</h1>
      <p className="pantalla__subtitulo">Transporte fluvial · Puerto de Magangué</p>
      <button className="btn btn--primario" onClick={onIngresar}>
        Ingresar
      </button>
    </div>
  )
}
