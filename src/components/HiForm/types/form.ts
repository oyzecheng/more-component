import type {
	FormInputType,
	FormInputPasswordType,
	FormInputSearchType,
	FormInputNumberType,
	FormInputTagType,
	FormInputTextareaType
} from '@/components/HiForm/types/input.ts'
import type {
	FormSelectType,
	FormRadioType,
	FormCheckboxType
} from '@/components/HiForm/types/select.ts'

export type FormType = 'input' 
| 'inputPassword' 
| 'inputSearch' 
| 'inputNumber'
| 'inputTextarea'
| 'inputTag'
| 'select'
| 'radio'
| 'checkbox'

export type HiFormConfigItemType = FormInputType 
| FormInputPasswordType 
| FormInputSearchType 
| FormInputNumberType
| FormInputTextareaType
| FormInputTagType
| FormSelectType
| FormRadioType
| FormCheckboxType

export type HiFormConfigType = HiFormConfigItemType[]