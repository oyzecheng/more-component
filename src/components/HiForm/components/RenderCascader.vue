<script setup lang="ts">
import { defineProps, inject } from 'vue'
import type { HiFormDataType } from '@/components/HiForm/types/form.ts'

const props = defineProps({
	formItemConfig: {
		type: Object,
		required: true
	}
})
const { formItemConfig } = props

const formData = inject<HiFormDataType>('formData', {})
</script>

<template>
	<a-cascader
		v-model="formData[formItemConfig.model]"
		v-bind="formItemConfig"
		@change="formItemConfig.onChange"
	/>
</template>
