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
import type { FormCascaderType } from '@/components/HiForm/types/cascader.ts'
import type { FormColorPickerType } from '@/components/HiForm/types/colorPicker.ts'
import type {
	FormDatePickerType,
	FormMonthPickerType,
	FormYearPickerType,
	FormQuarterPickerType,
	FormWeekPickerType,
	FormRangePickerType	
} from '@/components/HiForm/types/datePicker.ts'
import type { FormRateType } from '@/components/HiForm/types/rate.ts'
import type { FormSliderType } from '@/components/HiForm/types/slider.ts'
import type { FormSwitchType } from '@/components/HiForm/types/switch.ts'

export type FormType = 'input' 
| 'inputPassword' 
| 'inputSearch' 
| 'inputNumber'
| 'inputTextarea'
| 'inputTag'
| 'select'
| 'radio'
| 'checkbox'
| 'cascader'
| 'colorPicker'
| 'datePicker'
| 'monthPicker'
| 'yearPicker'
| 'quarterPicker'
| 'weekPicker'
| 'rangePicker'
| 'rate'
| 'slider'
| 'switch'

export type HiFormConfigItemType = FormInputType 
| FormInputPasswordType 
| FormInputSearchType 
| FormInputNumberType
| FormInputTextareaType
| FormInputTagType
| FormSelectType
| FormRadioType
| FormCheckboxType
| FormCascaderType
| FormColorPickerType
| FormDatePickerType
| FormMonthPickerType
| FormYearPickerType
| FormQuarterPickerType
| FormWeekPickerType
| FormRangePickerType
| FormRateType
| FormSliderType
| FormSwitchType

export type HiFormConfigType = HiFormConfigItemType[]