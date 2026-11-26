import { textoEstadoFlota } from '../domain/horarioFlota'

type Props = { tipo: string; fecha?: Date }

// Etiqueta que se muestra solo en las tarjetas de tipo FLOTA
export default function EstadoFlota({ tipo, fecha = new Date() }: Props) {
  if (tipo !== 'FLOTA') return null
  const texto = textoEstadoFlota(fecha)
  return (
    <span
      data-testid="estado-flota"
      style={{
        display: 'inline-block', padding: '2px 10px', borderRadius: 12, fontSize: 13, fontWeight: 600,
        background: texto === 'Zarpó' ? '#FDECEA' : texto === 'En muelle' ? '#E6F4EA' : '#FFF4D6',
        color: texto === 'Zarpó' ? '#C0392B' : texto === 'En muelle' ? '#2E8B57' : '#8A6100',
      }}
    >
      {texto}
    </span>
  )
}
