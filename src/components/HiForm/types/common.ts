import { FormType } from '@/components/HiForm/types/form.ts'

export type FormItemBaseType = {
  label: string
  model: string
  type: FormType
  size?: 'mini' | 'small' | 'medium' | 'large',
  disabled?: boolean
}