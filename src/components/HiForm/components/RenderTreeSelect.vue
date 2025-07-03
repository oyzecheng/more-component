<script setup lang="ts">
import { defineProps, inject } from 'vue'
import { TreeSelect } from '@arco-design/web-vue'

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
	<a-tree-select
		v-model="formData[formItemConfig.model]"
		v-bind="formItemConfig"
		@change="formItemConfig.onChange"
	/>
</template>