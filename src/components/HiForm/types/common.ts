import type { FormType } from '@/components/HiForm/types/form.ts'
import type { FieldRule } from '@arco-design/web-vue' 

type validateTriggerType = 'change' | 'input' | 'focus' | 'blur'

export interface FormItemBaseType {
  label: string
  model: string
  type: FormType
  size?: 'mini' | 'small' | 'medium' | 'large'
  disabled?: boolean
  defaultValue?: any
  onChange?: (value: any, event: any) => void
  validate?: boolean | FieldRule | FieldRule[]
  show?: boolean | ((formData: Record<string, any>) => boolean)
  validateTrigger?: validateTriggerType | validateTriggerType[]
}

