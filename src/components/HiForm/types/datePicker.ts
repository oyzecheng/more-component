import type { FormItemBaseType } from "./common"
import type { DatePicker, RangePicker } from "@arco-design/web-vue"

interface FormDatePickerCommonType extends FormItemBaseType {
	locale?: Record<string, any>
	allowClear?: boolean
	readonly?: boolean
	position?: DatePicker['position']
	placeholder?: string
	disabledDate?: DatePicker['disabledDate']
	disabledTime?: DatePicker['disabledTime']
	valueFormat?: DatePicker['valueFormat']
}

export interface FormDatePickerType extends FormDatePickerCommonType {
	type: 'datePicker'
	dayStartOfWeek?: DatePicker['dayStartOfWeek']
	showTime?: boolean
}

export interface FormMonthPickerType extends FormDatePickerCommonType {
	type: 'monthPicker'
}

export interface FormYearPickerType extends FormDatePickerCommonType {
	type: 'yearPicker'
}

export interface FormQuarterPickerType extends FormDatePickerCommonType {
	type: 'quarterPicker'
}

export interface FormWeekPickerType extends FormDatePickerCommonType {
	type: 'weekPicker'
}

export interface FormRangePickerType extends Omit<FormDatePickerCommonType, 'placeholder'> {
	type: 'rangePicker'
	dayStartOfWeek?: DatePicker['dayStartOfWeek']
	showTime?: boolean
	placeholder?: string[]
	disabledDate?: RangePicker['disabledDate']
	disabledTime?: RangePicker['disabledTime']
	separator?: string
}