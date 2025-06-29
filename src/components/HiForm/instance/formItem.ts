import type { HiFormConfigItemType } from '@/components/HiForm/types/form.ts'

class HiFormItemConfig {
  private formConfigItem: HiFormConfigItemType

  constructor(formConfigItem: HiFormConfigItemType) {
    this.formConfigItem = formConfigItem
  }

  changeConfig(key: typeof HiFormItemConfig, value: string) {
    this.formConfigItem[key] = value
  }
}

export default HiFormItemConfig