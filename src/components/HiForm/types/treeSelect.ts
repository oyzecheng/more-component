import type { FormItemBaseType } from "./common"
import type { TreeSelect } from "@arco-design/web-vue"

export interface FormTreeSelectType extends FormItemBaseType {
	type: 'treeSelect'
	loading?: boolean
	border?: boolean
	allowSearch?: boolean
	allowClear?: boolean
	placeholder?: string
	maxTagCount?: number
	multiple?: boolean
	data?: TreeSelect['data']
	labelInValue?: boolean
	treeCheckable?: boolean
	treeCheckStrictly?: boolean
}