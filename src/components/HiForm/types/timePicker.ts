import type { FormItemBaseType } from "./common"

export interface FormTimePickerType extends FormItemBaseType {
	type: 'timePicker'
	timePickerType?: 'time' | 'timeRange'
	allowClear?: boolean
	readonly?: boolean
	format?: string
	placeholder?: string
	use12Hour?: boolean
	step?: { hour?: number; minute?: number; second?: number;}
	disableHours?: () => number[]
	disableMinutes?: (hour: number) => number[]
	disableSeconds?: (hour: number, minute: number) => number[]
	hideDisabledOptions?: boolean
}