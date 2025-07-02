<script setup lang="ts">
import { defineProps, inject, computed } from 'vue'
import { DatePicker, MonthPicker, YearPicker, QuarterPicker, WeekPicker, RangePicker } from '@arco-design/web-vue'

const props = defineProps({
	formItemConfig: {
		type: Object,
		required: true
	}
})
const { formItemConfig } = props

const formData = inject('formData')

const renderComponent = computed(() => {
	switch (formItemConfig.type) {
		case 'datePicker':
			return DatePicker
		case 'monthPicker':
			return MonthPicker
		case 'yearPicker':
			return YearPicker
		case 'quarterPicker':
			return QuarterPicker
		case 'weekPicker':
			return WeekPicker
		case 'rangePicker':
			return RangePicker
		default:
			return DatePicker
	}
})
</script>

<template>
	<component
		:is="renderComponent"
		v-model="formData[formItemConfig.model]"
		v-bind="formItemConfig"
		@change="formItemConfig.onChange"
	/>
</template>