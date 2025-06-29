import type { FormItemBaseType } from '@/components/HiForm/types/common.ts'

export interface FormInputType extends FormItemBaseType{
  allowClear?: boolean
  placeholder?: string
  maxLength?: number | { length: number, errorOnly?: boolean }
  showWordLimit?: boolean
  inputAttrs?: object
  prepend?: string
  append?: string
}