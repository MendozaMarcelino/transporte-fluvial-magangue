import { describe, it, expect } from 'vitest'
import { validarCodigoEmbarcacion } from '../domain/codigoEmbarcacion'

describe('validarCodigoEmbarcacion()', () => {
  // Válidos
  it('acepta #098', () => expect(validarCodigoEmbarcacion('#098')).toBe(true))
  it('acepta #220', () => expect(validarCodigoEmbarcacion('#220')).toBe(true))
  it('acepta #001', () => expect(validarCodigoEmbarcacion('#001')).toBe(true))

  // Inválidos
  it('rechaza "220" (sin #)',      () => expect(validarCodigoEmbarcacion('220')).toBe(false))
  it('rechaza "#22" (2 dígitos)',   () => expect(validarCodigoEmbarcacion('#22')).toBe(false))
  it('rechaza "#2200" (4 dígitos)', () => expect(validarCodigoEmbarcacion('#2200')).toBe(false))
  it('rechaza "#000" (reservado)',  () => expect(validarCodigoEmbarcacion('#000')).toBe(false))
  it('rechaza "#A20" (letra)',      () => expect(validarCodigoEmbarcacion('#A20')).toBe(false))
  it('rechaza "" (vacío)',          () => expect(validarCodigoEmbarcacion('')).toBe(false))
})

import { tipoPorCodigo } from '../domain/codigoEmbarcacion'

describe('tipoPorCodigo()', () => {
  it('#098 → FLOTA',    () => expect(tipoPorCodigo('#098')).toBe('FLOTA'))
  it('#220 → CHALUPA',  () => expect(tipoPorCodigo('#220')).toBe('CHALUPA'))
  it('#720 → CARGUERA', () => expect(tipoPorCodigo('#720')).toBe('CARGUERA'))
})
