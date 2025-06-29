import type { FormItemBaseType } from '@/components/HiForm/types/common.ts'

export type FormInputType = {
  allowClear?: boolean
  placeholder?: string
  maxLength?: number | { length: number, errorOnly?: boolean }
  showWordLimit?: boolean
  inputAttrs?: object
  prepend?: string
  append?: string
} & FormItemBaseType