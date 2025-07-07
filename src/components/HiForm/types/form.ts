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
import type { FormTimePickerType } from '@/components/HiForm/types/timePicker.ts'
import type { FormTreeSelectType } from '@/components/HiForm/types/treeSelect.ts'
import type { FormUploadType } from '@/components/HiForm/types/upload.ts'

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
| 'timePicker'
| 'treeSelect'
| 'upload'

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
| FormTimePickerType
| FormTreeSelectType
| FormUploadType

export type HiFormConfigType = HiFormConfigItemType[]

export type HiFormDataType = Record<string, any>
