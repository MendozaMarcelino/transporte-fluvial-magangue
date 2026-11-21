// Formato válido: "#" + exactamente 3 dígitos, distinto de "#000"
const PATRON = /^#[0-9]{3}$/

export function validarCodigoEmbarcacion(codigo: string): boolean {
  return PATRON.test(codigo) && codigo !== '#000'
}
