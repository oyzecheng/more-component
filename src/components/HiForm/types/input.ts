import type { FormItemBaseType } from '@/components/HiForm/types/common.ts'
import type { ButtonProps } from '@arco-design/web-vue'

export interface FormInputType extends FormItemBaseType{
  type: 'input'
  allowClear?: boolean
  placeholder?: string
  maxLength?: number | { length: number, errorOnly?: boolean }
  showWordLimit?: boolean
  inputAttrs?: object
  prepend?: string
  append?: string
}

export interface FormInputPasswordType extends Omit<FormInputType, 'type'> {
  type: 'inputPassword'
  visibility?: boolean
  invisibleButton?: boolean
}

export interface FormInputSearchType extends Omit<FormInputType, 'type'> {
  type: 'inputSearch'
  searchButton?: boolean
  loading?: boolean
  buttonText?: string
  buttonProps?: ButtonProps
}

export interface FormInputNumberType extends FormItemBaseType {
  type: 'inputNumber'
  min?: number
  max?: number
  step?: number
  precision?: number
  mode?: 'embed' | 'button'
  placeholder?: string
  hideButton?: boolean
  allowClear?: boolean
  readOnly?: boolean
  inputAttrs?: object
}

export interface FormInputTextareaType extends FormItemBaseType {
  type: 'inputTextarea'
  placeholder?: string
  maxLength?: number | { length: number, errorOnly?: boolean }
  showWordLimit?: boolean
  allowClear?: boolean
  autoSize?: boolean | { minRows: number, maxRows: number }
  textareaAttrs?: object
}

export interface FormInputTagType extends FormItemBaseType {
  type: 'inputTag'
  placeholder?: string
  readonly?: boolean
  allowClear?: boolean
  maxTagCount?: number
  uniqueValue?: boolean
}