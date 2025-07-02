<script setup lang="ts">
import { defineProps, inject } from 'vue'
import { Rate } from '@arco-design/web-vue'

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
	<a-rate
		v-model="formData[formItemConfig.model]"
		v-bind="formItemConfig"
		@change="formItemConfig.onChange"
	/>
</template>