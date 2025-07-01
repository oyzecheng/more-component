import type {
	FormInputType,
	FormInputPasswordType,
	FormInputSearchType,
	FormInputNumberType
} from '@/components/HiForm/types/input.ts'

export type FormType = 'input' 
| 'inputPassword' 
| 'inputSearch' 
| 'inputNumber'

export type HiFormConfigItemType = FormInputType | FormInputPasswordType | FormInputSearchType | FormInputNumberType

export type HiFormConfigType = HiFormConfigItemType[]