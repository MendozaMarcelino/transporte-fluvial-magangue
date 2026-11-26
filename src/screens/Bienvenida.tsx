import { IconBarco, IconMapa, IconCupos, IconTiquete } from '../components/Iconos'

interface Props {
  onIngresar: () => void
}

export default function Bienvenida({ onIngresar }: Props) {
  return (
    <div className="pantalla">
      <div className="bienvenida__hero">
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '50%', padding: '20px', display: 'inline-flex' }}>
          <IconBarco size={52} color="#fff" />
        </div>
        <h1 className="bienvenida__titulo">Río Magangué</h1>
        <p className="bienvenida__subtitulo">Transporte fluvial · Puerto de Magangué, Bolívar</p>
        <p className="bienvenida__descripcion">
          Consulta rutas, gestiona cupos y vende tiquetes desde un solo lugar.
        </p>
        <div className="bienvenida__chips">
          <span className="chip" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <IconMapa size={13} color="#fff" /> Rutas
          </span>
          <span className="chip" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <IconCupos size={13} color="#fff" /> Cupos
          </span>
          <span className="chip" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <IconTiquete size={13} color="#fff" /> Tiquetes
          </span>
        </div>
      </div>
      <div className="bienvenida__cuerpo">
        <button className="btn btn--primario" onClick={onIngresar}>
          Ingresar al sistema
        </button>
        <p className="pantalla__subtitulo" style={{ textAlign: 'center', fontSize: '0.8rem' }}>
          Sistema de gestión portuaria · v1.0
        </p>
      </div>
    </div>
  )
}
