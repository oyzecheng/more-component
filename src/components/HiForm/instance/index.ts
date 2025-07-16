import type { HiFormConfigType } from '@/components/HiForm/types/form.ts'
import HiFormItemConfig from '@/components/HiForm/instance/formItem.ts'
import type { Ref } from 'vue'
import { Form, type FieldRule } from '@arco-design/web-vue'
import { getValidateRule, getValidateTrigger } from '@/components/HiForm/utils/validateRule.ts'
import { uniqueId } from 'lodash-es'

class HiFormConfig {
  private formConfigList: HiFormConfigType = []
  private formRules: Record<string, FieldRule[]> = {}
  private formData: Record<string, any> = {}
  private _formRef: Ref<Form | null> | null = null
  private submitListener: ((formData: Record<string, any>) => void) | null = null
  readonly formId: string

  constructor(formConfigList: HiFormConfigType) {
    this.formConfigList = formConfigList
    this.initFormData()
    this.formId = uniqueId('form-')
  }

  private initFormData() {
    this.formConfigList.forEach(item => {
      this.formData[item.model] = item.defaultValue || undefined
      this.formRules[item.model] = getValidateRule(item)
      item.validateTrigger = item.validateTrigger || getValidateTrigger(item.type)
    })
  }

  _setFormRef(ref: Ref<Form | null>) {
    this._formRef = ref
  }

  getFormConfig() {
    return this.formConfigList
  }

  getFormRules() {
    return this.formRules
  }

  getFormData() {
    return this.formData
  }

  onSubmit(callback: (formData: Record<string, any>) => void) {
    this.submitListener = callback
  }

  callSubmitListener() {
    this.submitListener?.(this.formData)
  }

  validateFormData() {
    return this._formRef?.value?.validate()
  }

  clearValidate(fields: string | string[]) {
    return this._formRef?.value?.clearValidate(fields)
  }

  resetFields(fields: string | string[]) {
    return this._formRef?.value?.resetFields(fields)
  }

  validateField(field: string | string[], callback: () => void) {
    return this._formRef?.value?.validateField(field, callback)
  }

  setFormData(data: Record<string, any>) {
    return this._formRef?.value?.setFields(data)
  }

  getFormItemInstance(model: string) {
    const formConfigItem = this.formConfigList.find(item => item.model === model)
    if (!formConfigItem) {
      throw new Error(`model: ${model} is not exist in formConfigList`)
    } else {
      return new HiFormItemConfig(formConfigItem, this._formRef)
    }
  }
}

export default HiFormConfig
