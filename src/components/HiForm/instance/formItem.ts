import type { HiFormConfigItemType } from '@/components/HiForm/types/form.ts'
import type { Ref } from 'vue'
import { Form } from '@arco-design/web-vue'

class HiFormItemConfig {
  private formConfigItem: HiFormConfigItemType
  private _formRef: Ref<Form | null> | null = null

  constructor(formConfigItem: HiFormConfigItemType, formRef: Ref<Form | null> | null) {
    this.formConfigItem = formConfigItem
    this._formRef = formRef
  }

  changeConfig<K extends keyof HiFormConfigItemType>(key: K, value: HiFormConfigItemType[K]) {
    if (['type', 'model'].includes(key)) {
      throw new Error(`${key} is readonly, can't be changed`)
    }
    this.formConfigItem[key] = value
  }

  validate(callback: () => void) {
    return this._formRef?.value?.validateField?.(this.formConfigItem.model, callback)
  }

  resetField() {
    return this._formRef?.value?.resetField?.(this.formConfigItem.model)
  }

  clearValidate() {
    return this._formRef?.value?.clearValidate?.(this.formConfigItem.model)
  }

  scrollToField() {
    return this._formRef?.value?.scrollToField?.(this.formConfigItem.model)
  }
}

export default HiFormItemConfig
