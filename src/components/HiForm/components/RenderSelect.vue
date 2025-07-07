<script setup lang="ts">
import { defineProps, inject, computed } from 'vue'
import { RadioGroup, CheckboxGroup } from '@arco-design/web-vue'
import type { HiFormDataType } from '@/components/HiForm/types/form.ts'

const props = defineProps({
	formItemConfig: {
		type: Object,
		required: true
	}
})
const { formItemConfig } = props

const formData = inject<HiFormDataType>('formData', {})

const renderComponent = computed(() => {
	if (formItemConfig.type === 'radio') {
		return RadioGroup
	}
	if (formItemConfig.type === 'checkbox') {
		return CheckboxGroup
	}
})
</script>

<template>
  <a-select
		v-if="formItemConfig.type === 'select'"
    v-model="formData[formItemConfig.model]"
    vi-bind="formItemConfig"
		@change="formItemConfig.onChange"
  />
	<component
		v-else
		:is="renderComponent"
		v-model="formData[formItemConfig.model]"
		v-bind="formItemConfig"
		:type="formItemConfig.radioType"
		@change="formItemConfig.onChange"
	/>
</template>
