import type { FormItemBaseType } from "./common"
import type { Cascader } from "@arco-design/web-vue"

export interface FormCascaderType extends FormItemBaseType {
  type: 'cascader'
  pathMode?: boolean
  multiple?: boolean
  options: Cascader['options']
  allowSearch?: boolean
  allowClear?: boolean
  expandTrigger?: 'click' | 'hover'
  placeholder?: string
  maxTagCount?: number
  loading?: boolean
}