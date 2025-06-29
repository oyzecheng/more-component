import type { HiFormConfigType } from '@/components/HiForm/types/form.ts'
import HiFormConfig from '@/components/HiForm/instance'
import { reactive } from 'vue'

const useHiForm = (formConfigList: HiFormConfigType) => {
  const formInstance = new HiFormConfig(formConfigList)

  return {
    formConfig: reactive(formInstance.getFormConfig()),
    formInstance
  }
}

export default useHiForm