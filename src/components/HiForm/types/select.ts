import type { FormItemBaseType } from '@/components/HiForm/types/common.ts'
import type { SelectProps, RadioGroup, CheckboxGroup } from '@arco-design/web-vue'

export interface FormSelectType extends FormItemBaseType {
  type: 'select'
  multiple?: boolean
  placeholder?: string
  loading?: boolean
  allowClear?: boolean
  allowSearch?: boolean
  allowCreate?: boolean
  options: SelectProps['options']
  limit?: number
}

export interface FormRadioType extends FormItemBaseType {
  type: 'radio'
  radioType?: 'radio' | 'button'
  direction?: 'horizontal' | 'vertical'
  options: RadioGroup['options']
}

export interface FormCheckboxType extends FormItemBaseType {
  type: 'checkbox'
  max?: number
  direction?: 'horizontal' | 'vertical'
  options: CheckboxGroup['options']
}