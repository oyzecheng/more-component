<script setup lang="ts">
import { defineProps, inject } from 'vue'
import { Cascader } from '@arco-design/web-vue'

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
	<a-cascader
		v-model="formData[formItemConfig.model]"
		:options="formItemConfig.options"
		:path-mode="formItemConfig.pathMode"
		:multiple="formItemConfig.multiple"
		:allow-search="formItemConfig.allowSearch"
		:allow-clear="formItemConfig.allowClear"
		:expand-trigger="formItemConfig.expandTrigger"
		:placeholder="formItemConfig.placeholder"
		:max-tag-count="formItemConfig.maxTagCount"
		:loading="formItemConfig.loading"
		:disabled="formItemConfig.disabled"
		:size="formItemConfig.size"
		@change="formItemConfig.onChange"
	/>
</template>