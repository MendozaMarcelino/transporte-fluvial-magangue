export function validarCalificacion(n: number): boolean {
  return Number.isInteger(n) && n >= 1 && n <= 5
}

export function promedioCalificaciones(lista: number[]): number {
  if (lista.length === 0) return 0
  let suma = 0
  for (const n of lista) suma = suma + n
  return Math.round((suma / lista.length) * 10) / 10
}
