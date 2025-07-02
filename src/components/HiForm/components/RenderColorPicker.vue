<script setup lang="ts">
import { defineProps, inject } from 'vue'
import { ColorPicker } from '@arco-design/web-vue'

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
	<a-color-picker
		v-model="formData[formItemConfig.model]"
		:format="formItemConfig.format"
		:show-text="formItemConfig.showText"
		:show-history="formItemConfig.showHistory"
		:show-preset="formItemConfig.showPreset"
		:disabled-alpha="formItemConfig.disabledAlpha"
		:hide-trigger="formItemConfig.hideTrigger"
		:history-colors="formItemConfig.historyColors"
		:preset-colors="formItemConfig.presetColors"
		:disabled="formItemConfig.disabled"
		:size="formItemConfig.size"
		@change="formItemConfig.onChange"
	/>
</template>