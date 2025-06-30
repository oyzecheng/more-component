import type { FormInputType } from '@/components/HiForm/types/input.ts'

export type FormType = 'input' 
| 'inputPassword' 
| 'inputSearch' 
| 'inputNumber'

export type HiFormConfigItemType = FormInputType

export type HiFormConfigType = HiFormConfigItemType[]