<script setup lang="ts">
import { defineProps, inject, computed } from 'vue'
import { RadioGroup, CheckboxGroup } from '@arco-design/web-vue'

const props = defineProps({
	formItemConfig: {
		type: Object,
		required: true
	}
})
const { formItemConfig } = props

const formData = inject('formData')

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
    :size="formItemConfig.size"
    :disabled="formItemConfig.disabled"
    :multiple="formItemConfig.multiple"
    :placeholder="formItemConfig.placeholder"
    :loading="formItemConfig.loading"
    :allow-clear="formItemConfig.allowClear"
    :allow-search="formItemConfig.allowSearch"
    :allow-create="formItemConfig.allowCreate"
    :options="formItemConfig.options"
    :limit="formItemConfig.limit"
		@change="formItemConfig.onChange"
  />
	<component
		v-else
		:is="renderComponent"
		v-model="formData[formItemConfig.model]"
		:size="formItemConfig.size"
		:disabled="formItemConfig.disabled"
		:options="formItemConfig.options"
		:type="formItemConfig.radioType"
		:direction="formItemConfig.direction"
		:max="formItemConfig.max"
		@change="formItemConfig.onChange"
	/>
</template>