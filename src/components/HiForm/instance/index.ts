import type { HiFormConfigType } from '@/components/HiForm/types/form.ts'
import HiFormItemConfig from '@/components/HiForm/instance/formItem.ts'

class HiFormConfig {
  private formConfigList: HiFormConfigType = []
  private formData: Record<string, any> = {}

  constructor(formConfigList: HiFormConfigType) {
    this.formConfigList = formConfigList
    this.initFormData()
  }

  private initFormData() {
    this.formConfigList.forEach(item => {
      this.formData[item.model] = item.defaultValue || ''
    })
  }

  getFormConfig() {
    return this.formConfigList
  }

  getFormData() {
    return this.formData
  }

  getFormItemInstance(model: string) {
    const formConfigItem = this.formConfigList.find(item => item.model === model)
    if (!formConfigItem) {
      throw new Error(`model: ${model} is not exist in formConfigList`)
    } else {
      return new HiFormItemConfig(formConfigItem)
    }
  }
}

export default HiFormConfig