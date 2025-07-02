import type { FormItemBaseType } from "./common"

export interface FormRateType extends FormItemBaseType {
	type: 'rate'
	count?: number
	allowHalf?: boolean
	allowClear?: boolean
    garding?: boolean
    readonly?: boolean
    color?: string
}