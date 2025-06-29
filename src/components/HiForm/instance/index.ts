import type { HiFormConfigType } from '@/components/HiForm/types/form.ts'
import HiFormItemConfig from '@/components/HiForm/instance/formItem.ts'

class HiFormConfig {
  private formConfigList: HiFormConfigType = []

  constructor(formConfigList: HiFormConfigType) {
    this.formConfigList = formConfigList
  }

  getFormConfig() {
    return this.formConfigList
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