<script setup lang="ts">
import RenderInput from './RenderInput.vue'
import RenderSelect from './RenderSelect.vue'
import RenderCascader from './RenderCascader.vue'
import RenderColorPicker from './RenderColorPicker.vue'
import RenderDatePicker from './RenderDatePicker.vue'
import RenderRate from './RenderRate.vue'
import RenderSlider from './RenderSlider.vue'
import RenderSwitch from './RenderSwitch.vue'
import RenderTimePicker from './RenderTimePicker.vue'
import RenderTreeSelect from './RenderTreeSelect.vue'
import RenderUpload from './RenderUpload.vue'
import { defineProps, computed } from 'vue'

const props = defineProps({
  formItemConfig: {
    type: Object,
    required: true
  }
})
const { formItemConfig } = props

const renderComponent = computed(() => {
  const inputList = ['input', 'inputPassword', 'inputSearch', 'inputNumber', 'inputTextarea', 'inputTag']
  if (inputList.includes(formItemConfig.type)) {
    return RenderInput
  }
	const selectList = ['select', 'radio', 'checkbox']
	if (selectList.includes(formItemConfig.type)) {
		return RenderSelect
	}
	if (formItemConfig.type === 'cascader') {
		return RenderCascader
	}
	if (formItemConfig.type === 'colorPicker') {
		return RenderColorPicker
	}
	const datePickerList = ['datePicker', 'monthPicker', 'yearPicker', 'quarterPicker', 'weekPicker', 'rangePicker']
	if (datePickerList.includes(formItemConfig.type)) {
		return RenderDatePicker
	}
	if (formItemConfig.type === 'rate') {
		return RenderRate
	}
	if (formItemConfig.type === 'slider') {
		return RenderSlider
	}
	if (formItemConfig.type === 'switch') {
		return RenderSwitch
	}
	if (formItemConfig.type === 'timePicker') {
		return RenderTimePicker
	}
	if (formItemConfig.type === 'treeSelect') {
		return RenderTreeSelect
	}
	if (formItemConfig.type === 'upload') {
		return RenderUpload
	}
  return null
})

</script>

<template>
	<component :is="renderComponent" :formItemConfig="formItemConfig" />
</template>