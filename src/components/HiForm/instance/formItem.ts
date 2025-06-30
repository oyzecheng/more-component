import type { HiFormConfigItemType } from '@/components/HiForm/types/form.ts'

class HiFormItemConfig {
  private formConfigItem: HiFormConfigItemType

  constructor(formConfigItem: HiFormConfigItemType) {
    this.formConfigItem = formConfigItem
  }

  changeConfig<K extends keyof HiFormConfigItemType>(key: K, value: HiFormConfigItemType[K]) {
    if (['type', 'model'].includes(key)) {
      throw new Error(`${key} is readonly, can't be changed`)
    }
    this.formConfigItem[key] = value
  }
}

export default HiFormItemConfig