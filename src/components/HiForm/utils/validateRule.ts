import type { HiFormConfigItemType } from "../types/form"

export const getValidateTrigger = (type: HiFormConfigItemType['type']): HiFormConfigItemType['validateTrigger'] => {
  if (['inputNumber', 'select'].includes(type)) {
    return ['change', 'blur']
  }
  if (['radio', 'checkbox', 'cascader', 'colorPicker', 'datePicker', 'monthPicker', 'yearPicker', 'quarterPicker', 'weekPicker', 'rangePicker', 'rate', 'slider', 'switch', 'timePicker', 'treeSelect', 'upload'].includes(type)) {
    return ['change']
  }
  return ['blur']
}

export const getValidateRule = (itemConfig: HiFormConfigItemType) => {
  const { validate, label } = itemConfig

  if (typeof validate === 'boolean') {
    return [{ required: validate, message: `${label}不能为空` }]
  }
  if (Array.isArray(validate)) {
    return validate.map(item => ({ message: `${label}不能为空`, ...item }))
  }
  return [{ message: `${label}不能为空`, ...validate }]
}
