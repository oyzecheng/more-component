import useHiForm from '@/components/HiForm/hooks/useHiForm.ts'
import { computed, reactive } from 'vue'
import HiFormConfig from '@/components/HiForm/instance'
import type { HiFormConfigType } from '@/components/HiForm/types/form'

export const testFormConfig = useHiForm([
  { type: 'input', label: 'name', model: 'name', maxLength: 10, placeholder: '输入姓名', allowClear: true, validate: true },
  { type: 'inputPassword', label: 'password', model: 'password', placeholder: '输入密码', allowClear: true },
  { type: 'inputSearch', label: 'search', model: 'search', placeholder: '输入搜索', allowClear: true },
  { type: 'inputNumber', label: 'number', model: 'number', placeholder: '输入数字', allowClear: true },
  { type: 'select', label: 'select', model: 'select', placeholder: '选择', options: [{ label: '1', value: 1 }, { label: '2', value: 2 }] },
  { type: 'radio', label: 'radio', model: 'radio', options: [{ label: '1', value: 1 }, { label: '2', value: 2 }], onChange: (value) => { console.log('radio', value) } },
  { type: 'checkbox', label: 'checkbox', model: 'checkbox', options: [{ label: '1', value: 1 }, { label: '2', value: 2 }] },
  { type: 'inputTextarea', label: 'textarea', model: 'textarea', placeholder: '输入文本', allowClear: true, showWordLimit: true, maxLength: 100, show: (formData) => formData.radio === 1 },
  { type: 'inputTag', label: 'tag', model: 'tag', placeholder: '输入标签', allowClear: true },
  { type: 'cascader', label: 'cascader', model: 'cascader', placeholder: '选择', options: [{ label: '1', value: 1, children: [{ label: '1-1', value: 11 }, { label: '1-2', value: 12 }] }, { label: '2', value: 2, children: [{ label: '2-1', value: 21 }, { label: '2-2', value: 22 }] }] },
  { type: 'colorPicker', label: 'colorPicker', model: 'colorPicker' },
  { type: 'datePicker', label: 'datePicker', model: 'datePicker', allowClear: true },
  { type: 'monthPicker', label: 'monthPicker', model: 'monthPicker', allowClear: true },
  { type: 'yearPicker', label: 'yearPicker', model: 'yearPicker', allowClear: true },
  { type: 'quarterPicker', label: 'quarterPicker', model: 'quarterPicker', allowClear: true },
  { type: 'weekPicker', label: 'weekPicker', model: 'weekPicker', allowClear: true },
  { type: 'rangePicker', label: 'rangePicker', model: 'rangePicker', allowClear: true },
  { type: 'rate', label: 'rate', model: 'rate', allowClear: true, allowHalf: true },
  { type: 'slider', label: 'slider', model: 'slider', showTooltip: true, marks: { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }, max: 10 },
  { type: 'switch', label: 'switch', model: 'switch', switchType: 'circle', checkedValue: 1, uncheckedValue: 0, checkedText: '开', uncheckedText: '关' }
])

export const testFormConfigList: HiFormConfigType = reactive([
  { type: 'input', label: 'name', model: 'name'}
])

export const testInstance = computed(() => {
  return new HiFormConfig(testFormConfigList)
})