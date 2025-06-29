import type { HiFormConfigType } from '@/components/HiForm/types/form.ts'

class HiFormConfig {
  private formConfigList: HiFormConfigType = []

  constructor(formConfigList: HiFormConfigType) {
    this.formConfigList = formConfigList
  }
}

export default HiFormConfig