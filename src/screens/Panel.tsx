import { IconBarco, IconGestion, IconSalir } from '../components/Iconos'

interface Props {
  onEmbarcaciones: () => void
  onCerrarSesion: () => void
}

export default function Panel({ onEmbarcaciones, onCerrarSesion }: Props) {
  return (
    <div className="pantalla">
      <div className="pantalla__header">
        <span className="pantalla__header-titulo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconBarco size={20} color="#fff" /> Río Magangué
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <span className="pantalla__header-usuario">admin · Administrador</span>
          <button className="btn--salir" style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onClick={onCerrarSesion}>
            <IconSalir size={13} color="#fff" /> Salir
          </button>
        </div>
      </div>

      <div className="panel-hero">
        <p className="panel-hero__titulo">Panel de administración</p>
        <p className="panel-hero__sub">Gestiona el sistema portuario</p>
      </div>

      <div className="pantalla__body">
        <p className="seccion-titulo">Acciones</p>

        <button className="btn btn--primario" style={{ gap: '10px' }} onClick={onEmbarcaciones}>
          <IconGestion size={20} color="#fff" /> Gestionar embarcaciones
        </button>

        <div className="divider" />

        <button className="btn btn--secundario" style={{ gap: '10px' }} onClick={onCerrarSesion}>
          <IconSalir size={18} color="var(--azul-rio)" /> Cerrar sesión
        </button>
      </div>
    </div>
  )
}
