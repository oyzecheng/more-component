import type { FormItemBaseType } from "./common"

export interface FormColorPickerType extends FormItemBaseType {
  type: 'colorPicker'
  format?: 'hex' | 'rgb'
  showText?: boolean
  showHistory?: boolean
  showPreset?: boolean
  disabledAlpha?: boolean
  hideTrigger?: boolean
  historyColors?: string[]
  presetColors?: string[]
}