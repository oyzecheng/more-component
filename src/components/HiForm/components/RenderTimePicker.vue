<script setup lang="ts">
import { defineProps, inject } from 'vue'
import { TimePicker } from '@arco-design/web-vue'

const props = defineProps({
	formItemConfig: {
		type: Object,
		required: true
	}
})

const { formItemConfig } = props

const formData = inject('formData')
</script>

<template>
	<a-time-picker
		v-model="formData[formItemConfig.model]"
		v-bind="formItemConfig"
		:type="formItemConfig.timePickerType"
		@change="formItemConfig.onChange"
	/>
</template>