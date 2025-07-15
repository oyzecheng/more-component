import { reactive } from 'vue'
import type { HiFormConfigType } from '@/components/HiForm/types/form'

export const RawFormConfigList: HiFormConfigType = reactive([
  { type: 'input', label: '姓名', model: 'name', maxLength: 10, placeholder: '输入姓名', allowClear: true, validate: true },
  { type: 'inputPassword', label: '密码', model: 'password', placeholder: '输入密码', allowClear: true, validate: true },
  { type: 'inputNumber', label: '年龄', model: 'number', placeholder: '输入年龄', allowClear: true },
  { type: 'select', label: '爱好', model: 'select', placeholder: '选择', options: [{ label: '摄影', value: '1' }, { label: '编码', value: '2' }] },
  { type: 'radio', label: '性别', model: 'radio', validate: true, options: [{ label: '男', value: '1' }, { label: '女', value: '2' }], onChange: (value) => { console.log('radio', value) } },
  { type: 'inputTextarea', label: '多行文本', model: 'textarea', placeholder: '动态显示的多行文本', allowClear: true, showWordLimit: true, maxLength: 100, show: (formData) => formData.radio === 1 },
  { type: 'checkbox', label: '复选', model: 'checkbox', options: [{ label: '湘菜', value: '1' }, { label: '粤菜', value: '2' }, { label: '川菜', value: '3' }, { label: '鲁菜', value: '4' }] },
  { type: 'inputTag', label: '标签', model: 'tag', placeholder: '输入标签', allowClear: true },
  { type: 'cascader', label: '地址', model: 'cascader', options: [{ label: '湖南', value: '1', children: [{ label: '长沙', value: '11' }, { label: '株洲', value: '12' }] }, { label: '江西', value: '2', children: [{ label: '南昌', value: '21' }, { label: '萍乡', value: '22' }] }] },
  { type: 'colorPicker', label: '颜色', model: 'colorPicker' },
  { type: 'datePicker', label: '日期', model: 'datePicker', allowClear: true, validate: true },
  // { type: 'monthPicker', label: 'monthPicker', model: 'monthPicker', allowClear: true },
  // { type: 'yearPicker', label: 'yearPicker', model: 'yearPicker', allowClear: true },
  // { type: 'quarterPicker', label: 'quarterPicker', model: 'quarterPicker', allowClear: true },
  // { type: 'weekPicker', label: 'weekPicker', model: 'weekPicker', allowClear: true },
  { type: 'rangePicker', label: '日期区间', model: 'rangePicker', allowClear: true },
  { type: 'rate', label: '评分', model: 'rate', allowClear: true, allowHalf: true, validate: true, tooltip: '评分' },
  // { type: 'slider', label: 'slider', model: 'slider', showTooltip: true, marks: { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }, max: 10 },
  { type: 'switch', label: '开关', model: 'switch', switchType: 'circle', checkedValue: '1', uncheckedValue: '0', checkedText: '开', uncheckedText: '关' },
  // { type: 'timePicker', label: 'timePicker', model: 'timePicker', allowClear: true, timePickerType: 'time', format: 'HH:mm:ss' },
  // { type: 'treeSelect', label: 'treeSelect', model: 'treeSelect', allowClear: true, treeCheckable: true, data: [{ title: '1', key: 1, children: [{ title: '1-1', key: 11 }, { title: '1-2', key: 12 }] }, { title: '2', key: 2, children: [{ title: '2-1', key: 21 }, { title: '2-2', key: 22 }] }] },
  { type: 'upload', label: '上传', model: 'upload', accept: 'image/*', action: '/', listType: 'picture-card', showUploadButton: true, showPreviewButton: true, showRemoveButton: true, showCancelButton: true, showRetryButton: true, showFileList: true, multiple: true, draggable: true, tip: '上传', headers: { 'Authorization': 'Bearer 1234567890' }, data: { name: 'test' }, name: 'test', withCredentials: true, limit: 1}
])
