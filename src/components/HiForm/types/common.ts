import type { FormType } from '@/components/HiForm/types/form.ts'

export interface FormItemBaseType {
  label: string
  model: string
  type: FormType
  size?: 'mini' | 'small' | 'medium' | 'large',
  disabled?: boolean
  defaultValue?: any
  onChange?: (value: any, event: any) => void
}

