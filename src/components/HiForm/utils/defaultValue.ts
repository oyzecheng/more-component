import type { HiFormConfigItemType } from '@/components/HiForm/types/form.ts'

export const getFormDataDefaultValue = (type: HiFormConfigItemType['type']) => {
	if (['inputNumber'].includes(type)) {
		return undefined
	}

  return ''
}