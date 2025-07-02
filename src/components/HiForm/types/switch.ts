import type { FormItemBaseType } from "./common"

export interface FormSwitchType extends FormItemBaseType {
	type: 'switch'
	loading?: boolean
	switchType?: 'circle' | 'round' | 'line'
	checkedValue?: string | number | boolean
	uncheckedValue?: string | number | boolean
	checkedColor?: string
	uncheckedColor?: string
	checkedText?: string
	uncheckedText?: string
}