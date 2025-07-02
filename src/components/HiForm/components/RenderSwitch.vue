<script setup lang="ts">
import { defineProps, inject } from 'vue'
import { Switch } from '@arco-design/web-vue'

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
	<a-switch
		v-model="formData[formItemConfig.model]"
		v-bind="formItemConfig"
		:type="formItemConfig.switchType"
		@change="formItemConfig.onChange"
	/>
</template>